/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-underscore-dangle */

import { NavContentNode } from '../../hooks/useNavigation';

const sanitizeIdentifier = (str: string) => str?.replace(/[\W]/g, '-');

export const mapNavItem = (c: NavContentNode, useSlugs = false, parentUrl = ''): NavItem => {
  const dest: NavItem = {
    title: c.title,
    text: c.link.label,
    url: '#',
    type: c.type,
    thumbnail: c.thumbnail,
    description: c.description,
    isDelimiter: false,
    children: []
  };

  if (c.link.__typename === 'NavUrlLink') {
    dest.url = c.link.url;
  } else if (c.link.__typename === 'NavCategoryLink') {
    const suffix = useSlugs
      ? c.link.category!.slug
      : `${sanitizeIdentifier(c.link.category!.identifier)}_${c.link.category!.id}`;

    // TODO: We should make this part configurable somehow
    if (parentUrl.startsWith('/catalog/category')) {
      dest.url = `${parentUrl}/${suffix}`;
    } else {
      dest.url = `/catalog/category/${suffix}`;
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn(`Unsupported link type ${c.link.__typename}`);
  }

  dest.children = (c.children ?? [])
    .filter(ch => ch.__typename === 'NavContentNode')
    .map(ch => mapNavItem(ch, useSlugs, dest.url));

  return dest;
};

export type NavItem = {
  title: string;
  text: string;
  url: string;
  type?: string;
  thumbnail?: string;
  description?: string;
  isDelimiter: boolean;
  children: NavItem[];
};
