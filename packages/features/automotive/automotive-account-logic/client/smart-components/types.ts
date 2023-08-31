/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export type Money = {
  value: string | number;
  currency: string;
};

export type Order = {
  id: string;
  grandTotal: Money;
  placedDate: string;
  updateDate: string;
  status: string;
  statusCode: string;
  lineItems: {
    id: string;
    linePrice: Money;
    partnumber: string;
    quantity: number;
    item: {
      name: string;
      thumbnail?: string;
    };
  }[];
};

export type Configuration = {
  id: string;
  baseProduct: {
    id: string;
    description?: string;
    longDescription?: string;
    thumbnail?: string;
    price: {
      list: Money;
    };
  };
  optionCategories: {
    optionClassifications: {
      options: {
        selected: boolean;
        product: {
          id: string;
          price: {
            list: Money;
          };
        };
      }[];
    }[];
  }[];
};
