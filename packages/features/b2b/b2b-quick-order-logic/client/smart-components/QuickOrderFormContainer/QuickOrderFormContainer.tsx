/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useCartModification } from '@exo/frontend-features-cart-logic';
import { SmartComponentProps } from '@exo/frontend-common-utils';

export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: String!) {
    product(partnumber: $id) {
      id
      partnumber
      name
      description
      thumbnail
      price {
        list {
          currency
          value
        }
        offer {
          currency
          value
        }
      }
    }
  }
`;
export const QuickOrderFormContainer = ({ render }: Props) => {
  const [foundProducts, setProducts] = useState<any[]>([]);
  const { add } = useCartModification();

  const [getProduct, { error, loading }] = useLazyQuery(GET_PRODUCT, {
    onCompleted: (data: any) => {
      if (data && data.product) {
        setProducts([data.product, ...foundProducts]);
      }
    }
  });

  const onReset = () => {
    setProducts([]);
  };

  const onAddToCart = async () => {
    const lineItems = foundProducts.map(product => {
      return { partnumber: product.id, quantity: Number(1) };
    });
    await add(lineItems).then(({ data }) => {
      if (data.cartAdd?.id.length > 0) {
        setProducts([]);
      }
    });
  };

  const onProductSearch = async id => {
    getProduct({
      variables: { id }
    });
  };

  const onRemoveItem = id => {
    let updated = [...foundProducts];
    const removeIndex = foundProducts.map(item => item.id).indexOf(id);
    updated = updated.splice(removeIndex, 1);
    setProducts(updated[0].id === id ? [] : updated);
  };

  return render({
    onRemoveItem,
    onProductSearch,
    onAddToCart,
    onReset,
    error,
    loading,
    foundProducts
  });
};

type Props = SmartComponentProps<{
  render: (props: QuickOrderFormRenderProps) => React.ReactElement;
}>;

export type QuickOrderFormRenderProps = {
  onProductSearch: (id: string) => Promise<void>;
  onRemoveItem: (id: string) => void;
  onAddToCart: () => Promise<void>;
  onReset: () => void;

  // TODO: Type this
  foundProducts: any[];
  error: any;
  loading: boolean;
};
