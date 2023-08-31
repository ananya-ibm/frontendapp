/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useState, useCallback, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useProduct } from '../../hooks/useProduct';
import { evaluateSelectionCriteria, Selection } from './SelectionCriteriaHelper';
import { Product } from '../../model/types';
import { ProductRef } from '../../model/product-ref';

export const SelectionCriteriaContainer = ({
  productId,
  skuId,
  onChange,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const [activeSelection, setActiveSelection] = useState({});
  const { loading, data, error } = useProduct<SelectionCriteriaResponse>(
    { productId },
    SelectionCriteriaContainer.fragment
  );

  // Load selection criteria from "URL"
  useEffect(() => {
    if (productId && skuId && data) {
      const sku = data?.product?.children?.find(
        c => c.partnumber === skuId.ref || c.slug === skuId.ref
      );
      const selection = data?.product?.selection?.find(s => s.id === sku?.id);
      setActiveSelection(
        Object.fromEntries(selection?.criteria?.map(s => [s.criteriaId, s.value.id]) ?? [])
      );
    }
  }, [productId, skuId, data]);

  const onChangeCallback = useCallback(
    ({ criteria, item }) => {
      if (!data) return;

      const { skus, activeSelection: newActiveSelection } = evaluateSelectionCriteria(
        { ...activeSelection, [criteria]: item.selectedItem.id },
        data.product.selection,
        { [criteria]: item.selectedItem.id }
      );
      setActiveSelection(newActiveSelection);

      if (skus.length === 1) {
        const sku = data?.product?.children?.find(c => c.id === skus[0]);
        onChange({ product: data.product, sku });
      } else {
        onChange({ product: data.product });
      }
    },
    [loading, activeSelection]
  );

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  const selection = evaluateSelectionCriteria(activeSelection, data.product.selection ?? []);

  return render({ selection, activeSelection, onChange: onChangeCallback });
};

type SelectionCriteriaResponse = Pick<Product, 'id' | 'partnumber' | 'slug'> & {
  type: string;
  children?: Pick<Product, 'id' | 'partnumber' | 'slug'>[];
  selection: Selection[];
};

SelectionCriteriaContainer.fragment = gql`
  fragment SelectionCriteriaContainer on PrdItem {
    id
    partnumber
    slug
    type
    children {
      id
      partnumber
      slug
    }
    selection {
      id
      criteria {
        criteriaId
        sequence
        name
        value {
          id
          value
          sequence
        }
      }
    }
  }
`;

type Props = SmartComponentProps<{
  productId: ProductRef;
  skuId?: ProductRef;
  onChange: (props: {
    product: Pick<Product, 'id' | 'partnumber' | 'slug'>;
    sku?: Pick<Product, 'id' | 'partnumber' | 'slug'>;
  }) => void;
  render: (props: SelectionCriteriaContainerRenderProps) => JSX.Element;
}>;

export type SelectionCriteriaContainerRenderProps = {
  selection: { criteria: ReturnType<typeof evaluateSelectionCriteria>['criteria'] };
  activeSelection: Record<string, string>;

  // TODO: This selectedItem stuff is a bit ugly
  onChange: (props: { criteria: string; item: { selectedItem?: { id: string } } }) => void;
};
