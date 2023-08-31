/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContentTiles } from './ContentTiles';

type Props = React.ComponentProps<typeof ContentTiles>;

export default {
  title: 'Components/Content/ContentTiles',
  component: ContentTiles
};

export const Default = (args: Props) => <ContentTiles {...args} />;
Default.args = {
  tiles: [
    {
      subTitle: "Tailoring",
      title: "Evening wear essentials",
      body: "Bring velvelt focus into your occasionwear wardrobe. It’s simple and sharply cut into a single-breasted design.",
      ctaLink: "#",
      ctaText: "Shop evening wear",
      image: "https://picsum.photos/1220/610"
    },
    {
      subTitle: "Tailoring",
      title: "Evening wear essentials",
      body: "Bring velvelt focus into your occasionwear wardrobe. It’s simple and sharply cut into a single-breasted design.",
      ctaLink: "#",
      ctaText: "Shop evening wear",
      image: "https://picsum.photos/1230/615"
    },
    {
      subTitle: "Tailoring",
      title: "Evening wear essentials",
      body: "Bring velvelt focus into your occasionwear wardrobe. It’s simple and sharply cut into a single-breasted design.",
      ctaLink: "#",
      ctaText: "Shop evening wear",
      image: "https://picsum.photos/1240/620"
    }
  ]
} as Props;
