/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SmartComponentProps } from '@exo/frontend-common-utils';

import filterData from './mockData/filterData';
import productData from './mockData/productData';

// TODO: We should harmonize this with the way the regular catalog provides this data
export const StoreProductsContainer = ({ render }: Props) => {
  return render({
    products: productData,
    filters: filterData
  });
};

type Props = SmartComponentProps<{
  id: string;
  facets?: string[];
  render: (props: StoreProductsContainerRenderProps) => JSX.Element;
}>;

export type StoreProductsContainerRenderProps = {
  products: any;
  filters: any;
};
