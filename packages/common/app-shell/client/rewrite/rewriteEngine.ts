/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { matchPath } from 'react-router';
import {
  FunctionRewriteRule,
  InboundRewriteResult,
  LegacyRewriteRule,
  RewriteRule,
  DirectionalRewriteRule,
  URLType,
  SimpleRewriteRule
} from './types';

export const asURL = (url: URLType | string, base?: URLType): URLType => {
  if ((url as any).pathname) return url as URL;
  if ((url as string).startsWith('http') || base?.href?.startsWith('http')) {
    const u = new URL(url as string, base?.href);
    return {
      pathname: u.pathname,
      hostname: u.hostname,
      href: u.href
    };
  }
  return { pathname: url as string, href: url as string };
};

const applyParameters = (urlTemplate: string, params: Record<string, any>): string => {
  let url = urlTemplate;
  for (const [k, v] of Object.entries(params)) {
    url = url.replace(new RegExp(`(:${k})(/|$)`), `${v}$2`);
  }
  return url;
};

const prefixKeys = (variables: Record<string, any>, prefix: string): Record<string, any> => {
  return Object.fromEntries(Object.entries(variables).map(([k, v]) => [`${prefix}--${k}`, v]));
};

const RULE_BUILDERS: Record<string, (rule: RewriteRule) => FunctionRewriteRule> = {
  function: (r: RewriteRule) => r as FunctionRewriteRule,
  simple: (r: RewriteRule) => {
    const rule = r as SimpleRewriteRule;

    return {
      type: 'function',
      inbound: RULE_BUILDERS.inbound({ type: 'inbound', from: rule.seo, to: rule.exo }).inbound,
      outbound: RULE_BUILDERS.outbound({ type: 'outbound', from: rule.exo, to: rule.seo }).outbound
    };
  },
  inbound: (r: RewriteRule) => {
    const rule = r as DirectionalRewriteRule<any>;
    return {
      type: 'function',
      inbound: (args) => {
        const match = matchPath(args.url.pathname, {
          path: rule.from
        });

        if (!match)
          return {
            rewrittenUrl: args.url,
            variables: {}
          };

        return {
          rewrittenUrl: asURL(applyParameters(rule.to, match.params), args.url),
          variables: match.params
        };
      },
      outbound: ({ url }) => url
    };
  },
  outbound: (r: RewriteRule) => {
    const rule = r as DirectionalRewriteRule<any>;
    return {
      type: 'function',
      inbound: (args) => ({ rewrittenUrl: args.url, variables: {} }),
      outbound: (args) => {
        if (args.url.hostname) return args.url;

        const match = matchPath(args.url.pathname, {
          path: rule.from
        });

        if (!match) return args.url;

        return asURL(
          applyParameters(rule.to, {
            ...args.variables,
            ...prefixKeys(args.variables, 'in'),
            ...match.params
          })
        );
      }
    };
  },
  legacy: (r: RewriteRule) => {
    const rule = r as LegacyRewriteRule;
    return {
      type: 'function',
      inbound: (args) => {
        if (!rule.inbound || !args.browserUrl.pathname.match(new RegExp(rule.when))) {
          return { rewrittenUrl: args.url, variables: {} };
        }

        return {
          rewrittenUrl: asURL(
            args.url.pathname.replace(new RegExp(rule.inbound.match), rule.inbound.rewrite)
          ),
          variables: {}
        };
      },
      outbound: (args) => {
        if (args.url.hostname) return args.url;

        if (!rule.outbound || !args.browserUrl.pathname.match(new RegExp(rule.when))) {
          return args.url;
        }

        return asURL(
          args.url.pathname.replace(new RegExp(rule.outbound.match), rule.outbound.rewrite)
        );
      }
    };
  }
};

export class RewriteEngine {
  rules: FunctionRewriteRule[];
  variables: Record<string, any> = {};

  constructor(rules: RewriteRule[]) {
    this.rules = rules.map((r) => RULE_BUILDERS[r.type](r));
  }

  rewriteInbound(browserUrlOrString: URLType | string): InboundRewriteResult {
    const browserUrl = asURL(browserUrlOrString);
    const urlBeforeRewrite = browserUrl;

    let currentUrl = browserUrl;
    let variables = {};
    for (const r of this.rules) {
      const fromUrl = currentUrl;
      const res = r.inbound({ browserUrl, urlBeforeRewrite, url: currentUrl });
      currentUrl = res.rewrittenUrl;
      variables = { ...variables, ...res.variables };

      if (process.env.NODE_ENV === 'development') {
        if (fromUrl !== currentUrl) {
          console.log(
            `Rewrite inbound (${r.name ?? 'unknown'}): ${fromUrl.href} -> ${currentUrl.href}`
          );
        }
      }
    }

    return {
      rewrittenUrl: currentUrl,
      variables
    };
  }

  rewriteOutbound(
    urlOrString: URLType | string,
    currentUrlOrString: URLType | string,
    browserUrlOrString: URLType | string,
    variables: Record<string, any>
  ): string {
    if (!urlOrString) return urlOrString;
    const browserUrl = asURL(browserUrlOrString);
    const currentUrl = asURL(currentUrlOrString);

    let resultingUrl = asURL(urlOrString);
    const urlBeforeRewrite = resultingUrl;
    for (const r of this.rules) {
      const fromUrl = resultingUrl;
      resultingUrl = r.outbound({ urlBeforeRewrite, browserUrl, currentUrl, url: resultingUrl, variables });

      if (process.env.NODE_ENV === 'development') {
        if (fromUrl !== resultingUrl) {
          console.log(
            `Rewrite outbound (${r.name ?? 'unknown'}): ${fromUrl.href} -> ${resultingUrl.href}`
          );
        }
      }
    }
    return asURL(resultingUrl).href;
  }

  setVariables(variables: Record<string, any>) {
    this.variables = { ...this.variables, ...variables };
  }

  getVariables() {
    return this.variables;
  }
}
