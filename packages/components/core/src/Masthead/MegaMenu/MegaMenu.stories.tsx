/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MegaMenu } from './MegaMenu';

export default {
  title: 'Components/Core/Masthead/MegaMenu',
  component: MegaMenu
} as any;

export const normal = (args) => <MegaMenu {...args} />;
normal.args = {
  isVisible: true,
  navItems: [
    {
      title: 'Men',
      text: 'Men',
      url: '#',
      thumbnail: 'https://picsum.photos/id/237/300/200',
      description: 'Men',
      isDelimiter: false,
      children: [
        {
          title: 'Jackets',
          text: 'Jackets',
          url: '#'
        },
        {
          title: 'Shirts',
          text: 'Shirts',
          url: '#'
        },
        {
          title: 'Suits',
          text: 'Suits',
          url: '#'
        },
        {
          title: 'Pants',
          text: 'Pants',
          url: '#'
        },
        {
          title: 'Accessories',
          text: 'Accessories',
          url: '#'
        },
        {
          title: 'Shoes',
          text: 'Shoes',
          url: '#'
        }
      ]
    },
    {
      title: 'Women',
      text: 'Women',
      url: '#',
      type: null,
      thumbnail: 'https://picsum.photos/id/252/300/200',
      description: 'Women',
      isDelimiter: false,
      children: [
        {
          title: 'Dresses',
          text: 'Dresses',
          url: '#'
        },
        {
          title: 'Blouses',
          text: 'Blouses',
          url: '#'
        },
        {
          title: 'Sweaters',
          text: 'Sweaters',
          url: '#'
        },
        {
          title: 'Skirts',
          text: 'Skirts',
          url: '#'
        },
        {
          title: 'Pants',
          text: 'Pants',
          url: '#'
        },
        {
          title: 'Shoes',
          text: 'Shoes',
          url: '#'
        },
        {
          title: 'Handbags',
          text: 'Handbags',
          url: '#'
        },
        {
          title: 'Accessories',
          text: 'Accessories',
          url: '#'
        }
      ]
    },
    {
      title: 'Boys',
      text: 'Boys',
      url: '#',
      type: null,
      thumbnail: 'https://picsum.photos/id/123/300/200',
      description: 'boys',
      isDelimiter: false,
      children: [
        {
          title: 'Pants',
          text: 'Pants',
          url: '#'
        },
        {
          title: 'Tops',
          text: 'Tops',
          url: '#'
        },
        {
          title: 'Shoes',
          text: 'Shoes',
          url: '#'
        }
      ]
    },
    {
      title: 'Girls',
      text: 'Girls',
      url: '#',
      type: null,
      thumbnail: 'https://picsum.photos/id/178/300/200',
      description: 'Girls',
      isDelimiter: false,
      children: [
        {
          title: 'Shoes',
          text: 'Shoes',
          url: '#'
        },
        {
          title: 'Pants',
          text: 'Pants',
          url: '#'
        },
        {
          title: 'Skirts',
          text: 'Skirts',
          url: '#'
        },
        {
          title: 'Tops',
          text: 'Tops',
          url: '#'
        }
      ]
    }
  ]
};

export const few = (args) => <MegaMenu {...args} />;
few.args = {
  isVisible: true,
  navItems: normal.args.navItems.slice(1, 3)
};

export const many = (args) => <MegaMenu {...args} />;
many.args = {
  isVisible: true,
  navItems: [...normal.args.navItems, ...normal.args.navItems]
};
