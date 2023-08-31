/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import { loadable } from './loadable';

export const cmsConfig: ApplicationConfig['featureConfig']['content'] = {
  components: [
    ...(process.env.PROVIDERS_CONTENT_PROVIDER?.includes('provider-aem')
      ? [
          {
            name: 'cmsSpot',
            component: loadable(() => import('@exo/frontend-content-provider-aem'), {
              resolveComponent: loaded => loaded.CmsSpotComponent,
              type: 'component'
            }),
            aem: {
              minimumProps: [],
              name: 'components/structure/cmsSpot'
            }
          },
          {
            name: 'text',
            component: loadable(
              () => import('@exo/frontend-content-provider-aem-core-components'),
              {
                resolveComponent: loaded => loaded.Text,
                type: 'component'
              },
            ),
            aem: {
              minimumProps: ['text'],
              name: 'components/core/text',
              emptyLabel: 'Uninitialized Text'
            }
          },
          {
            name: 'image',
            component: loadable(
              () => import('@exo/frontend-content-provider-aem-core-components'),
              {
                resolveComponent: loaded => loaded.Image,
                type: 'component'
              }
            ),
            aem: {
              minimumProps: ['src'],
              name: 'components/core/image',
              emptyLabel: 'Uninitialized image'
            }
          },
          {
            name: 'title',
            component: loadable(
              () => import('@exo/frontend-content-provider-aem-core-components'),
              {
                resolveComponent: loaded => loaded.Title,
                type: 'component'
              }
            ),
            aem: {
              minimumProps: ['text'],
              name: 'components/core/title',
              emptyLabel: 'Uninitialized title'
            }
          },
          {
            name: 'tabs',
            component: loadable(
              () => import('@exo/frontend-content-provider-aem-core-components'),
              {
                resolveComponent: loaded => loaded.Tabs,
                type: 'component'
              }
            ),
            aem: {
              minimumProps: [],
              name: 'components/core/tabs'
            }
          },
          {
            name: 'teaser',
            component: loadable(
              () => import('@exo/frontend-content-provider-aem-core-components'),
              {
                resolveComponent: loaded => loaded.Teaser,
                type: 'component'
              }
            ),
            aem: {
              minimumProps: ['title'],
              name: 'components/core/teaser',
              emptyLabel: 'Uninitialized teaser'
            }
          },
          {
            name: 'separator',
            component: loadable(
              () => import('@exo/frontend-content-provider-aem-core-components'),
              {
                resolveComponent: loaded => loaded.Separator,
                type: 'component'
              }
            ),
            aem: {
              minimumProps: [],
              name: 'components/core/separator'
            }
          },
          {
            name: 'formContainer',
            component: loadable(
              () => import('@exo/frontend-content-provider-aem-core-components'),
              {
                resolveComponent: loaded => loaded.FormContainer,
                type: 'component'
              }
            ),
            aem: {
              minimumProps: [],
              name: 'components/form/container'
            }
          },
          {
            name: 'formButton',
            component: loadable(
              () => import('@exo/frontend-content-provider-aem-core-components'),
              {
                resolveComponent: loaded => loaded.FormButton,
                type: 'component'
              }
            ),
            aem: {
              minimumProps: [],
              name: 'components/form/button'
            }
          },
          {
            name: 'formHidden',
            component: loadable(
              () => import('@exo/frontend-content-provider-aem-core-components'),
              {
                resolveComponent: loaded => loaded.FormHidden,
                type: 'component'
              }
            ),
            aem: {
              minimumProps: [],
              name: 'components/form/hidden'
            }
          },
          {
            name: 'formOptions',
            component: loadable(
              () => import('@exo/frontend-content-provider-aem-core-components'),
              {
                resolveComponent: loaded => loaded.FormOptions,
                type: 'component'
              }
            ),
            aem: {
              minimumProps: [],
              name: 'components/form/options'
            }
          },
          {
            name: 'formText',
            component: loadable(
              () => import('@exo/frontend-content-provider-aem-core-components'),
              {
                resolveComponent: loaded => loaded.FormText,
                type: 'component'
              }
            ),
            aem: {
              minimumProps: [],
              name: 'components/form/text'
            }
          }
        ]
      : []),
    {
      name: 'video',
      component: loadable(() => import('@exo/frontend-components-content'), {
        resolveComponent: loaded => loaded.Video,
        type: 'component'
      }),
      aem: {
        minimumProps: ['videoURL'],
        name: 'components/content/video',
        emptyLabel: 'Uninitialized Video'
      }
    },
    {
      name: 'hero',
      component: loadable(() => import('@exo/frontend-components-content'), {
        resolveComponent: loaded => loaded.Hero,
        type: 'component'
      }),
      aem: {
        minimumProps: ['image', 'subtitle', 'title', 'text', 'ctaText'],
        name: 'components/content/hero',
        emptyLabel: 'Uninitialized Hero'
      },
      contentful: {
        contentTypeId: 'componentHero'
      }
    },
    {
      name: 'textSection',
      component: loadable(() => import('@exo/frontend-components-content'), {
        resolveComponent: loaded => loaded.TextSection,
        type: 'component'
      })
      // TODO: Add aem and contentful config here
    },
    {
      name: 'contentTiles',
      component: loadable(() => import('@exo/frontend-components-content'), {
        resolveComponent: loaded => loaded.ContentTiles,
        type: 'component'
      })
      // TODO: Add aem and contentful config here
    },
    {
      name: 'fullWidthTile',
      component: loadable(() => import('@exo/frontend-components-content'), {
        resolveComponent: loaded => loaded.FullWidthTile,
        type: 'component'
      })
      // TODO: Add aem and contentful config here
    },
    {
      name: 'heroCarousel',
      component: loadable(() => import('@exo/frontend-components-content'), {
        resolveComponent: loaded => loaded.HeroCarousel,
        type: 'component'
      }),
      aem: {
        minimumProps: ['items'],
        name: 'components/content/heroCarousel',
        emptyLabel: 'Uninitialized Hero Carousel'
      }
    },
    {
      name: 'contentCard',
      component: loadable(() => import('@exo/frontend-components-content'), {
        resolveComponent: loaded => loaded.ContentCard,
        type: 'component'
      }),
      aem: {
        minimumProps: ['title', 'img'],
        name: 'components/content/contentCard',
        emptyLabel: 'Uninitialized Content Card'
      }
    },
    {
      name: 'horizontalContentCard',
      component: loadable(() => import('@exo/frontend-components-content'), {
        resolveComponent: loaded => loaded.HorizontalContentCard,
        type: 'component'
      }),
      aem: {
        minimumProps: ['title', 'img'],
        name: 'components/content/horizontalContentCard',
        emptyLabel: 'Uninitialized Horizontal Content Card'
      }
    },
    {
      name: 'featuredItem',
      component: loadable(() => import('@exo/frontend-components-content'), {
        resolveComponent: loaded => loaded.FeaturedItem,
        type: 'component'
      }),
      aem: {
        minimumProps: ['title', 'text', 'image'],
        name: 'components/content/featuredItem',
        emptyLabel: 'Uninitialized Featured Item'
      }
    },
    {
      name: 'departmentSelector',
      component: loadable(() => import('@exo/frontend-components-content'), {
        resolveComponent: loaded => loaded.DepartmentSelector,
        type: 'component'
      }),
      aem: {
        minimumProps: ['departments'],
        name: 'components/content/departmentSelector',
        emptyLabel: 'Uninitialized Department Selector'
      },
      contentful: {
        contentTypeId: 'componentDepartmentSelector'
      }
    },
    {
      name: 'videoWithText',
      component: loadable(() => import('@exo/frontend-components-content'), {
        resolveComponent: loaded => loaded.VideoWithText,
        type: 'component'
      }),
      aem: {
        minimumProps: ['videoURL', 'title', 'text'],
        name: 'components/content/videoWithText',
        emptyLabel: 'Uninitialized Video with Text'
      }
    },
    {
      name: 'imageGrid',
      component: loadable(() => import('@exo/frontend-components-content'), {
        resolveComponent: loaded => loaded.ImageGrid,
        type: 'component'
      }),
      aem: {
        minimumProps: ['images'],
        name: 'components/content/imageGrid',
        emptyLabel: 'Uninitialized Image Grid'
      }
    }
  ],
  ...(process.env.PROVIDERS_CONTENT_PROVIDER === 'packages/features/content/content-provider-aem/lib/index.ts'
    ? { 
      aem: {
        path: process.env.AEM_ROOT_PATH!,
        siteName: process.env.AEM_APP!,
        apiHost: process.env.AEM_HOST,
        gridCss: 'https://adobe-marketing-cloud.github.io/aem-responsivegrid/css/aem-grid-12.css',
        loadingDepth: 2
      } 
    }
    : {}),
  ...(process.env.PROVIDERS_CONTENT_PROVIDER === 'packages/features/content/content-provider-brxm/lib/index.ts'
    ? {
      brxm: {
        debug: process.env.NODE_ENV === 'development',
        endpoint: process.env.BR_HOST,
        httpClient: require('axios'),
        endpointQueryParameter: 'endpoint'
      }
    }
    : {}),
  ...(process.env.PROVIDERS_CONTENT_PROVIDER === 'packages/features/content/content-provider-contentful/lib/index.ts'
   ? { 
    contentful: {
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
      space: process.env.CONTENTFUL_SPACE!,
      pageTypes: [
        {
          contentTypeId: 'pageCategory',
          matchFn: (spec) => spec.type === 'category', 
          queryFn: (spec) => ({ 'fields.categoryId': spec.categoryId })
        },
        {
          contentTypeId: 'pageContentPage',
          matchFn: (spec) => spec.type === 'content', 
          queryFn: (spec) => ({ 'fields.slug': spec.path })
        },
        {
          contentTypeId: 'pageContentPageWithSpots',
          matchFn: (spec) => spec.type === 'contentWithSpots', 
          queryFn: (spec) => ({ 'fields.slug': spec.path })
        }
      ]
    }
  }
  : {})
};

export const rewriteConfig: ApplicationConfig['rewrite'] = process.env.PROVIDERS_CONTENT_PROVIDER?.includes(
  'provider-aem'
)
  ? [
      {
        type: 'legacy',
        when: `^${process.env.AEM_ROOT_PATH}/(.*)\\.html$`,
        inbound: {
          match: `^${process.env.AEM_ROOT_PATH}/(.*)\\.html$`,
          rewrite: '/$1'
        },
        outbound: {
          match: '^(.*(?!\\.html$))$',
          rewrite: `${process.env.AEM_ROOT_PATH}$1.html`
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
    ]
  : [ ];
