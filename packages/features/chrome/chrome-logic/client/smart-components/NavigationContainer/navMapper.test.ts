/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { mapNavItem } from './navMapper';

describe('navMapper', () => {
  test('it maps basic props', () => {
    const d = {
      title: 'Title',
      type: 'Type',
      thumbnail: 'Thumbnail',
      description: 'Description',
      __typename: 'NavContentNode',
      link: {
        __typename: 'NavUrlLink',
        url: 'some_url',
        label: 'Label'
      }
    };
    expect(mapNavItem(d).title).toBe('Title');
    expect(mapNavItem(d).type).toBe('Type');
    expect(mapNavItem(d).thumbnail).toBe('Thumbnail');
    expect(mapNavItem(d).description).toBe('Description');
    expect(mapNavItem(d).text).toBe('Label');
    expect(mapNavItem(d).isDelimiter).toBe(false);
  });

  test('it maps children', () => {
    const d = {
      __typename: 'NavContentNode',
      link: {
        __typename: 'NavCategoryLink',
        category: {
          id: 5,
          identifier: 'Apparel'
        }
      },
      children: [
        {
          __typename: 'NavContentNode',
          link: {
            __typename: 'NavUrlLink',
            url: 'some_url',
            label: 'Some label'
          }
        },
        {
          __typename: 'NavDelimiterNode'
        },
        {
          __typename: 'NavContentNode',
          link: {
            __typename: 'NavCategoryLink',
            category: {
              id: 6,
              identifier: 'Women'
            }
          }
        }
      ]
    };
    expect(mapNavItem(d as any).children.length).toBe(2);
    expect(mapNavItem(d as any).children[0].url).toBe('some_url');
    expect(mapNavItem(d as any).children[1].url).toBe('/catalog/category/Apparel_5/Women_6');
  });

  test('it maps category links', () => {
    const d = {
      __typename: 'NavContentNode',
      link: {
        __typename: 'NavCategoryLink',
        category: {
          id: 5,
          identifier: 'Apparel'
        }
      }
    };
    expect(mapNavItem(d as any).url).toBe('/catalog/category/Apparel_5');
  });

  test('it maps url links', () => {
    const d = {
      __typename: 'NavContentNode',
      link: {
        __typename: 'NavUrlLink',
        url: 'some_url'
      }
    };
    expect(mapNavItem(d as any).url).toBe('some_url');
  });
});
