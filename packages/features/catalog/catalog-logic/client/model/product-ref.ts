/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export class ProductRef {
  id?: string;

  partnumber?: string;

  slug?: string;

  constructor(args: { id?: string; partnumber?: string; slug?: string }) {
    this.id = args.id;
    this.partnumber = args.partnumber;
    this.slug = args.slug;
  }

  get isPartnumber() {
    return !!this.partnumber;
  }

  get isSlug() {
    return !!this.slug;
  }

  get isId() {
    return !!this.id;
  }

  get ref() {
    return this.slug ?? this.partnumber ?? this.id;
  }
}

export const asProductRef = (r: any): ProductRef =>
  // eslint-disable-next-line no-nested-ternary
  !r ? undefined : r.ref ? r : new ProductRef({ partnumber: r });
