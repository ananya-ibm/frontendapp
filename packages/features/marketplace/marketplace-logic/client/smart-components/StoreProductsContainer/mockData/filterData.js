/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const filterData = {
  id: '1',
  products: {
    facets: [
      {
        name: 'Category',
        multiSelect: true,
        entries: [
          {
            label: 'Women',
            count: 153,
            code: '__c_3',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Men',
            count: 97,
            code: '__c_2',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Girls',
            count: 49,
            code: '__c_5',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Boys',
            count: 34,
            code: '__c_4',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          }
        ],
        __typename: 'CmmFacet'
      },
      {
        name: 'Brand',
        multiSelect: true,
        entries: [
          {
            label: 'Albini',
            count: 55,
            code: 'mfName_ntk_cs%3A%22Albini%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Hermitage Collection',
            count: 55,
            code: 'mfName_ntk_cs%3A%22Hermitage+Collection%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Gusso',
            count: 50,
            code: 'mfName_ntk_cs%3A%22Gusso%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Luigi Valenti',
            count: 45,
            code: 'mfName_ntk_cs%3A%22Luigi+Valenti%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Versatil',
            count: 45,
            code: 'mfName_ntk_cs%3A%22Versatil%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Borsati',
            count: 30,
            code: 'mfName_ntk_cs%3A%22Borsati%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Mayflower',
            count: 11,
            code: 'mfName_ntk_cs%3A%22Mayflower%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Leo',
            count: 7,
            code: 'mfName_ntk_cs%3A%22Leo%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Baril',
            count: 6,
            code: 'mfName_ntk_cs%3A%22Baril%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Cassetti',
            count: 6,
            code: 'mfName_ntk_cs%3A%22Cassetti%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Emery',
            count: 6,
            code: 'mfName_ntk_cs%3A%22Emery%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Meso',
            count: 6,
            code: 'mfName_ntk_cs%3A%22Meso%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Synergy',
            count: 5,
            code: 'mfName_ntk_cs%3A%22Synergy%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Coolers',
            count: 2,
            code: 'mfName_ntk_cs%3A%22Coolers%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Hermitage',
            count: 2,
            code: 'mfName_ntk_cs%3A%22Hermitage%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Cassetti, Borsati',
            count: 1,
            code: 'mfName_ntk_cs%3A%22Cassetti%2C+Borsati%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          },
          {
            label: 'Hermitage Collection, Borsati',
            count: 1,
            code: 'mfName_ntk_cs%3A%22Hermitage+Collection%2C+Borsati%22',
            state: 'unselected',
            type: 'select',
            __typename: 'CmmFacetEntry'
          }
        ],
        __typename: 'CmmFacet'
      }
    ],
    edges: [
      {
        node: {
          id: '12361',
          price: {
            list: {
              currency: 'GBP',
              __typename: 'CmmMoney'
            },
            __typename: 'PrdPrice'
          },
          __typename: 'PrdItem'
        },
        __typename: 'PrdResultEdge'
      },
      {
        node: {
          id: '12242',
          price: {
            list: {
              currency: 'GBP',
              __typename: 'CmmMoney'
            },
            __typename: 'PrdPrice'
          },
          __typename: 'PrdItem'
        },
        __typename: 'PrdResultEdge'
      },
      {
        node: {
          id: '12274',
          price: {
            list: {
              currency: 'GBP',
              __typename: 'CmmMoney'
            },
            __typename: 'PrdPrice'
          },
          __typename: 'PrdItem'
        },
        __typename: 'PrdResultEdge'
      },
      {
        node: {
          id: '12307',
          price: {
            list: {
              currency: 'GBP',
              __typename: 'CmmMoney'
            },
            __typename: 'PrdPrice'
          },
          __typename: 'PrdItem'
        },
        __typename: 'PrdResultEdge'
      },
      {
        node: {
          id: '12390',
          price: {
            list: {
              currency: 'GBP',
              __typename: 'CmmMoney'
            },
            __typename: 'PrdPrice'
          },
          __typename: 'PrdItem'
        },
        __typename: 'PrdResultEdge'
      },
      {
        node: {
          id: '10001',
          price: {
            list: {
              currency: 'GBP',
              __typename: 'CmmMoney'
            },
            __typename: 'PrdPrice'
          },
          __typename: 'PrdItem'
        },
        __typename: 'PrdResultEdge'
      },
      {
        node: {
          id: '10002',
          price: {
            list: {
              currency: 'GBP',
              __typename: 'CmmMoney'
            },
            __typename: 'PrdPrice'
          },
          __typename: 'PrdItem'
        },
        __typename: 'PrdResultEdge'
      },
      {
        node: {
          id: '10003',
          price: {
            list: {
              currency: 'GBP',
              __typename: 'CmmMoney'
            },
            __typename: 'PrdPrice'
          },
          __typename: 'PrdItem'
        },
        __typename: 'PrdResultEdge'
      },
      {
        node: {
          id: '10004',
          price: {
            list: {
              currency: 'GBP',
              __typename: 'CmmMoney'
            },
            __typename: 'PrdPrice'
          },
          __typename: 'PrdItem'
        },
        __typename: 'PrdResultEdge'
      },
      {
        node: {
          id: '10005',
          price: {
            list: {
              currency: 'GBP',
              __typename: 'CmmMoney'
            },
            __typename: 'PrdPrice'
          },
          __typename: 'PrdItem'
        },
        __typename: 'PrdResultEdge'
      },
      {
        node: {
          id: '10006',
          price: {
            list: {
              currency: 'GBP',
              __typename: 'CmmMoney'
            },
            __typename: 'PrdPrice'
          },
          __typename: 'PrdItem'
        },
        __typename: 'PrdResultEdge'
      },
      {
        node: {
          id: '10007',
          price: {
            list: {
              currency: 'GBP',
              __typename: 'CmmMoney'
            },
            __typename: 'PrdPrice'
          },
          __typename: 'PrdItem'
        },
        __typename: 'PrdResultEdge'
      }
    ],
    __typename: 'PrdResultConnection'
  },
  __typename: 'CatCategory'
};

export default filterData;
