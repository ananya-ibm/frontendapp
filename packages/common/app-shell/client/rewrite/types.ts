/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export type URLType = {
  hostname?: string;
  href: string;
  pathname: string;
};

export type InboundRewriteResult<T = Record<string, any>> = {
  rewrittenUrl: URLType;
  variables: T;
};


export type FunctionRewriteRule<T = Record<string, any>> = {
  type: 'function';
  name?: string;
  inbound: (args: { urlBeforeRewrite: URLType; browserUrl: URLType; url: URLType }) => InboundRewriteResult<T>;
  outbound: (args: { urlBeforeRewrite: URLType; browserUrl: URLType; url: URLType; currentUrl: URLType; variables: T }) => URLType;
}

export type SimpleRewriteRule = {
  type: 'simple';
  name?: string;
  seo: string;
  exo: string;
}

export type DirectionalRewriteRule<T> = {
  type: T;
  name?: string;
  from: string;
  to: string;
};

export type LegacyRewriteRule = {
  type: 'legacy';
  name?: string;
  when: string;
  inbound?: {
    match: string;
    rewrite: string;
  };
  outbound?: {
    match: string;
    rewrite: string;
  };
};

export type RewriteRule = FunctionRewriteRule 
  | DirectionalRewriteRule<'inbound'> 
  | DirectionalRewriteRule<'outbound'> 
  | SimpleRewriteRule 
  | LegacyRewriteRule;
