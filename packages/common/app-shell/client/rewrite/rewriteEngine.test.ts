/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { asURL, RewriteEngine } from './rewriteEngine';

describe('rewriteEngine', () => {
  describe('rule: inbound', () => {
    test('no match leaves URL as is', () => {
      const re = new RewriteEngine([
        { type: 'inbound', from: '/search', to: '/catalog/search'}
      ]);
      expect(re.rewriteInbound('/homepage')).toStrictEqual({
        rewrittenUrl: asURL('/homepage'),
        variables: {}
      });
      expect(re.rewriteInbound('http://localhost/homepage')).toStrictEqual({
        rewrittenUrl: asURL('http://localhost/homepage'),
        variables: {}
      });
    });

    test('rewrite simple URL', () => {
      const re = new RewriteEngine([
        { type: 'inbound', from: '/search', to: '/catalog/search'}
      ]);
      expect(re.rewriteInbound('/search')).toStrictEqual({
        rewrittenUrl: asURL('/catalog/search'),
        variables: {}
      }); 
      expect(re.rewriteInbound('http://localhost/search')).toStrictEqual({
        rewrittenUrl: asURL('http://localhost/catalog/search'),
        variables: {}
      });
    });

    test('extracts variables from URL', () => {
      const re = new RewriteEngine([
        { type: 'inbound', from: '/products/:productId', to: '/catalog/products/:productId/details'}
      ]);
      expect(re.rewriteInbound('/products/red-shirt')).toStrictEqual({
        rewrittenUrl: asURL('/catalog/products/red-shirt/details'),
        variables: { productId: 'red-shirt' }
      });
      expect(re.rewriteInbound('http://localhost/products/red-shirt')).toStrictEqual({
        rewrittenUrl: asURL('http://localhost/catalog/products/red-shirt/details'),
        variables: { productId: 'red-shirt' }
      });
    });
  });

  describe('rule: outbound', () => {
    test('no match leaves URL as is', () => {
      const re = new RewriteEngine([
        { type: 'outbound', from: '/catalog/search', to: '/search'}
      ]);
      expect(re.rewriteOutbound('/homepage', '/catalog/products/red-shirt/details', '/products/red-shirt', {}))
        .toStrictEqual('/homepage');
        
      expect(re.rewriteOutbound('http://localhost/homepage', 'http://localhost/catalog/products/red-shirt/details', 'http://localhost/products/red-shirt', {}))
        .toStrictEqual('http://localhost/homepage');
    });

    test('rewrite simple URL', () => {
      const re = new RewriteEngine([
        { type: 'outbound', from: '/catalog/search', to: '/search'}
      ]);
      expect(re.rewriteOutbound('/catalog/search', '/catalog/products/red-shirt/details', '/products/red-shirt', {}))
        .toStrictEqual('/search');
    });

    test('dont rewrite if fully qualified', () => {
      const re = new RewriteEngine([
        { type: 'outbound', from: '/catalog/search', to: '/search'}
      ]);
      expect(re.rewriteOutbound('http://localhost/catalog/search', 'http://localhost/catalog/products/red-shirt/details', 'http://localhost/products/red-shirt', {}))
        .toStrictEqual('http://localhost/catalog/search');
    })

    test('extracts variables from URL', () => {
      const re = new RewriteEngine([
        { type: 'outbound', from: '/catalog/products/:productId/details', to: '/products/:productId'}
      ]);
      expect(re.rewriteOutbound('/catalog/products/red-shirt/details', '/catalog/search', '/search', {}))
        .toStrictEqual('/products/red-shirt');
    });

    test('can rewrite based on variables', () => {
      const re = new RewriteEngine([
        { type: 'outbound', from: '/catalog/products/:productId/details', to: '/:in--locale/products/:productId'}
      ]);
      expect(re.rewriteOutbound('/catalog/products/red-shirt/details', '/catalog/search', '/search', { locale: 'en'}))
        .toStrictEqual('/en/products/red-shirt');
    });
  });

  describe('rule: legacy', () => {
    describe('aem rewrites', () => {
      const re = new RewriteEngine([
        {
          type: 'legacy',
          when: `^/carbon-ssr/(.*)\\.html$`,
          inbound: {
            match: `^/carbon-ssr/(.*)\\.html$`,
            rewrite: '/$1'
          },
          outbound: {
            match: '^(.*(?!\\.html$))$',
            rewrite: `/carbon-ssr$1.html`
          }
        },
        {
          type: 'legacy',
          when: '^/conf/[^/]+/settings/wcm/templates/.*html$',
          inbound: {
            match: '^/conf/(.*).html$',
            rewrite: '/content/templates/$1'
          }
        }
      ]);

      test('leaves simple URLs as is', () => {
        expect(re.rewriteInbound('/catalog/search'))
          .toStrictEqual({ rewrittenUrl: asURL('/catalog/search'), variables: {} })
      });
  
      test('remove AEM prefix for inbound', () => {
        expect(re.rewriteInbound('/carbon-ssr/catalog/search.html'))
          .toStrictEqual({ rewrittenUrl: asURL('/catalog/search'), variables: {} })
        expect(re.rewriteInbound('/conf/carbon-ssr/settings/wcm/templates/myTemplate.html'))
          .toStrictEqual({ rewrittenUrl: asURL('/content/templates/carbon-ssr/settings/wcm/templates/myTemplate'), variables: {} })
      });

      test('adds AEM prefix for outbound', () => {
        expect(re.rewriteOutbound('/catalog/search', '/content/homepage', '/carbon-ssr/content/homepage.html', {}))
          .toStrictEqual('/carbon-ssr/catalog/search.html')
      });
    })
  });

  describe('rule: simple', () => {
    test('no match leaves URL as is', () => {
      const re = new RewriteEngine([
        { type: 'simple', seo: '/search', exo: '/catalog/search'}
      ]);
      expect(re.rewriteInbound('/homepage')).toStrictEqual({
        rewrittenUrl: asURL('/homepage'),
        variables: {}
      });
      expect(re.rewriteOutbound('/profile', '/homepage', '/homepage', {})).toStrictEqual('/profile');
    });

    test('rewrite simple URL', () => {
      const re = new RewriteEngine([
        { type: 'simple', seo: '/search', exo: '/catalog/search'}
      ]);
      expect(re.rewriteInbound('/search')).toStrictEqual({
        rewrittenUrl: asURL('/catalog/search'),
        variables: {}
      });
      expect(re.rewriteOutbound('/catalog/search', '/homepage', '/homepage', {})).toStrictEqual('/search');
    });

    test('extracts variables from URL', () => {
      const re = new RewriteEngine([
        { type: 'simple', seo: '/products/:productId', exo: '/catalog/products/:productId'}
      ]);
      expect(re.rewriteInbound('/products/red-shirt')).toStrictEqual({
        rewrittenUrl: asURL('/catalog/products/red-shirt'),
        variables: {
          productId: 'red-shirt'
        }
      });
      expect(re.rewriteOutbound('/catalog/products/red-shirt', '/homepage', '/homepage', {
        productId: 'red-shirt'
      })).toStrictEqual('/products/red-shirt');
    });
  });

  describe('use-case: locale in url', () => {
    test('locale in url', () => {
      const defaultLocale = 'en';
      const re = new RewriteEngine([
        {
          type: 'function',
          inbound: (args) => {
            const m = args.url.pathname.match(new RegExp('/([a-z][a-z])/(.*)'));
            if (!m) {
              return {
                rewrittenUrl: asURL(args.url),
                variables: {
                  locale: defaultLocale
                }
              }
            }

            return {
              rewrittenUrl: asURL(`/${m[2]}`),
              variables: {
                locale: m[1]
              }
            }
          },
          outbound: (args) => {
            if (args.url.hostname) return args.url;

            if (args.variables.locale === defaultLocale) return args.url;
            return asURL(`/${args.variables.locale}${args.url.pathname}`);
          }
        }
      ])

      expect(re.rewriteInbound('/sv/catalog')).toStrictEqual({
        rewrittenUrl: asURL('/catalog'),
        variables: { locale: 'sv' }
      });
      expect(re.rewriteInbound('/catalog')).toStrictEqual({
        rewrittenUrl: asURL('/catalog'),
        variables: { locale: 'en' }
      });

      expect(re.rewriteOutbound('/catalog', '/homepage', '/sv/homepage', { locale: 'sv' }))
        .toStrictEqual('/sv/catalog');
      expect(re.rewriteOutbound('/catalog', '/homepage', '/homepage', { locale: 'en' }))
        .toStrictEqual('/catalog');
    })  
  })
});
