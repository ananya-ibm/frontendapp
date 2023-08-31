/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export type Category = {
  name: string;
  id: string;
  title: string;
  image: string;
  subcategories: {
    id: string;
    title: string;
    name: string;
    isSingleSelect?: boolean;
    //      thumbnail: subcategory.view,
    thumbnail: undefined;
    products: {
      id: string;
      isSelected: boolean;
      isAvailable: boolean;
      name: string;
      thumbnail: string;
      price: { value: string; currency: string };
    }[];
  }[];
};
