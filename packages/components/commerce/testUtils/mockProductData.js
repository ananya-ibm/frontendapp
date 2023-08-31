/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export const mockProductData = {
  product: {
    id: '572461',
    partnumber: '572461',
    name: 'GR-80TP Extension Battery Grip/Tripod',
    longDescription: 'GR-80TP Extension Battery Grip/Tripod for EOS Rebel G.',
    description: 'GR-80TP Extension Battery Grip/Tripod',
    fullImage: 'https://images.unsplash.com/photo-1534949119444-a092348af7dc',
    type: 'bundleProduct',
    video: {
      videoID: '1',
      title: 'Product overview video',
      color: 'black',
      videoURL: 'https://youtu.be/J727tCXTggk',
      accentText: 'Video',
      buttonText: 'Watch more'
    },
    thumbnail: {
      source: 'https://images.unsplash.com/photo-1534949119444-a092348af7dc',
      height: '300px'
    },
    price: {
      list: {
        value: '48.65',
        __typename: 'CmmMoney'
      },
      __typename: 'PrdPrice'
    },
    children: null,
    __typename: 'PrdItem',
    attributes: [
      {
        id: '1',
        title: 'Category 1',
        content: [
          {
            id: 'aa',
            title: 'Subtitle aa',
            body: 'Lorem ipsum'
          },
          {
            id: 'bb',
            title: 'Subtitle bb',
            body: 'Lorem ipsum'
          },
          {
            id: 'cc',
            title: 'Subtitle cc',
            body: 'Lorem ipsum'
          },
          {
            id: 'dd',
            title: 'Subtitle dd',
            body: 'Lorem ipsum'
          }
        ]
      },
      {
        id: '2',
        title: 'Category 2',
        content: [
          {
            id: 'a',
            title: 'Subtitle',
            body: 'Lorem ipsum'
          },
          {
            id: 'b',
            title: 'Subtitle',
            body: 'Lorem ipsum'
          },
          {
            id: 'c',
            title: 'Subtitle',
            body: 'Lorem ipsum'
          },
          {
            id: 'd',
            title: 'Subtitle',
            body: 'Lorem ipsum'
          }
        ]
      },
      {
        id: '3',
        title: 'Category 3',
        content: [
          {
            id: 'z',
            title: 'Subtitle',
            body: 'Lorem ipsum'
          },
          {
            id: 'y',
            title: 'Subtitle',
            body: 'Lorem ipsum'
          }
        ]
      }
    ]
  },
  categoriesTop: [
    {
      id: 'configurations',
      name: null,
      __typename: 'CatCategory'
    },
    {
      id: '1',
      name: 'Open Catalogue',
      __typename: 'CatCategory'
    },
    {
      id: 'B2C_Color',
      name: 'Color',
      __typename: 'CatCategory'
    },
    {
      id: 'brands',
      name: 'Brands',
      __typename: 'CatCategory'
    }
  ],
  me: {
    carts: null,
    __typename: 'CusMe'
  }
};
