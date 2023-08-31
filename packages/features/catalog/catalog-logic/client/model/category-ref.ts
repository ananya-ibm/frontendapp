/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export class CategoryRef {
  id?: string;

  slug?: string;

  constructor(args: { id?: string; slug?: string }) {
    this.id = args.id;
    this.slug = args.slug;
  }

  get isSlug() {
    return !!this.slug;
  }

  get isId() {
    return !!this.id;
  }

  get ref() {
    return this.slug ?? this.id;
  }
}

// eslint-disable-next-line no-nested-ternary
export const asCategoryRef = (r: any) => (!r ? undefined : r.ref ? r : new CategoryRef({ id: r }));
