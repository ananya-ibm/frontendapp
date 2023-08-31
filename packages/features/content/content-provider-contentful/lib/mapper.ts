/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { CmsConfiguration } from '@exo/frontend-content-api-types';
import { Entry, EntryCollection } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export const mapRequest = (spec: Record<string, string>, configuration: CmsConfiguration) => {
  const pageType = configuration.contentful?.pageTypes.find(pt => pt.matchFn(spec));
  if (!pageType) return undefined;

  return {
    content_type: pageType.contentTypeId,
    ...pageType.queryFn(spec)
  };
};

const defaultPropFn = (a: any) => {
  const dest = {};
  for (const [name, field] of Object.entries(a.fields)) {
    if (typeof field === 'object') {
      const f: any = field;
      if (f.nodeType === 'document') {
        dest[name] = documentToHtmlString(f);
      } else {
        dest[name] = f.fields.file.url;
      }
    } else {
      dest[name] = field;
    }
  }
  return dest;
};

const mapContent = (content: Entry<any>, configuration: CmsConfiguration) => {
  const component = configuration.components.find(
    c =>
      c.name === content.sys.contentType.sys.id ||
      c.contentful?.contentTypeId === content.sys.contentType.sys.id
  );

  if (component) {
    const propFn = component.contentful?.propFn ?? defaultPropFn;

    const d = propFn(content);
    // eslint-disable-next-line no-underscore-dangle
    d._component = component.component;
    return d;
  }

  const dest = {};
  for (const [name, field] of Object.entries(content.fields)) {
    if (field) {
      // @ts-ignore
      if (typeof field === 'object' && field.sys?.type === 'Entry') {
        dest[name] = mapContent(field as Entry<any>, configuration);
      } else if (Array.isArray(field) && field[0].sys?.type === 'Entry') {
        dest[name] = field.map(f => mapContent(f as Entry<any>, configuration));
      }
    }
  }
  return dest;
};

export const mapResponse = (entries: EntryCollection<unknown>, configuration: CmsConfiguration) => {
  if (entries.total === 0) return undefined;

  const item = entries.items[0];
  return mapContent(item, configuration);
};
