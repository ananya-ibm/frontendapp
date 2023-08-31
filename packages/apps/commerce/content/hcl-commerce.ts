/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const content: EXOCmsConfig['sample'] = {
  homepage: () => ({
    spots: {
      main: () => ({
        content: [
          {
            component: 'hero',
            props: {
              subtitle: 'Summer 22’',
              title: 'Essential summer styles 2022',
              text: 'New-season, dressed up looks that salute the sun - and everyday escapism. Formal or casual we have got you covered.',
              image: 'https://picsum.photos/1210/1210',
              ctaText: "Shop summer 22'",
              ctaLink: '#',
              variant: 'image-50%',
              color: '#161616'
            }
          },

          {
            component: 'textSection',
            props: {
              subTitle: 'Summer 22’',
              title: 'New arrivals',
              body: 'New-season, dressed up looks that salute the sun - and everyday escapism. Formal or casual we have got you covered.',
              spacing: 'introduction'
            }
          },

          {
            component: 'categoryCarousel',
            props: {
              catId: 'Apparel',
              ctaText: 'View all new arrivals',
              ctaLink: '#'
            }
          },

          {
            component: 'contentTiles',
            props: {
              tiles: [
                {
                  subTitle: 'Women',
                  title: 'Shop all women’s',
                  body: 'Bring velvelt focus into your occasionwear wardrobe. It’s simple and sharply cut into a single-breasted design.',
                  ctaLink: '#',
                  ctaText: 'Shop evening wear',
                  image: 'https://picsum.photos/1200/600'
                },
                {
                  subTitle: 'Men',
                  title: 'Shop all men’s',
                  body: 'The ava collection updates your tailoring collection with the heritage styling alongside modern design detailing.',
                  ctaLink: '#',
                  ctaText: 'Shop collection',
                  image: 'https://picsum.photos/1210/605'
                }
              ]
            }
          },

          {
            component: 'fullWidthTile',
            props: {
              subTitle: 'Men',
              title: "Mens summer 22' is here",
              body: 'New-season, dressed up looks that salute the sun - and everyday escapism.',
              ctaText: 'Shop evening wear',
              ctaTextMobile: 'Shop',
              ctaLink: '#',
              image: 'https://picsum.photos/1200/1200'
            }
          },

          {
            component: 'textSection',
            props: {
              subTitle: 'Summer 22’',
              title: 'Every moment is an occasion',
              body: 'New-season, dressed up looks that salute the sun - and everyday escapism. Formal or casual we have got you covered.',
              buttons: [
                { label: 'Shop men’s', link: '#' },
                { label: 'Shop women’s', link: '#' }
              ]
            }
          },

          {
            component: 'contentTiles',
            props: {
              tiles: [
                {
                  subTitle: 'Tailoring',
                  title: 'Evening wear essentials',
                  body: 'Bring velvelt focus into your occasionwear wardrobe. It’s simple and sharply cut into a single-breasted design.',
                  ctaLink: '#',
                  ctaText: 'Shop evening wear',
                  image: 'https://picsum.photos/1220/610'
                },
                {
                  subTitle: 'Tailoring',
                  title: 'Evening wear essentials',
                  body: 'Bring velvelt focus into your occasionwear wardrobe. It’s simple and sharply cut into a single-breasted design.',
                  ctaLink: '#',
                  ctaText: 'Shop evening wear',
                  image: 'https://picsum.photos/1230/615'
                },
                {
                  subTitle: 'Tailoring',
                  title: 'Evening wear essentials',
                  body: 'Bring velvelt focus into your occasionwear wardrobe. It’s simple and sharply cut into a single-breasted design.',
                  ctaLink: '#',
                  ctaText: 'Shop evening wear',
                  image: 'https://picsum.photos/1240/620'
                }
              ]
            }
          },

          {
            component: 'fullWidthTile',
            props: {
              subTitle: 'Accessories',
              title: 'Women’s necklace’s',
              body: 'The beatrice necklace is a graceful, feminine take on subtle jewellery. It’s crafted from brass in a brushed gold finish with an intricate knot.',
              ctaText: "Shop necklace's",
              ctaTextMobile: 'Shop',
              ctaLink: '#',
              image: 'https://picsum.photos/1100/1100',
              imagePosition: 'right'
            }
          },

          {
            component: 'contentTiles',
            props: {
              tiles: [
                {
                  subTitle: 'Tailoring',
                  title: 'Evening wear essentials',
                  body: 'Bring velvelt focus into your occasionwear wardrobe. It’s simple and sharply cut into a single-breasted design.',
                  ctaLink: '#',
                  ctaText: 'Shop evening wear',
                  image: 'https://picsum.photos/1240/620'
                },
                {
                  subTitle: 'Tailoring',
                  title: 'Day time smart',
                  body: 'The ava collection updates your tailoring collection with the heritage styling alongside modern design detailing.',
                  ctaLink: '#',
                  ctaText: 'Shop collection',
                  image: 'https://picsum.photos/1250/625'
                }
              ]
            }
          }
        ]
      })
    }
  })
};

export default content;
