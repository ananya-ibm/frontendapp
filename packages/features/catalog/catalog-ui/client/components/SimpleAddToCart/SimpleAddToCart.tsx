/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { Button } from '@exo/frontend-components-base';
import { ProductAddToCartContainerRenderProps } from '@exo/frontend-features-catalog-logic';
import * as S from './SimpleAddToCart.styles';
import { ShoppingBag } from '@carbon/react/icons';

export const SimpleAddToCart = ({
  isEnabled,
  onAddToCart,
  className
}: ProductAddToCartContainerRenderProps & { className?: string }) => {
  const intl = useIntl('features.catalog.catalog-ui.components.AddToCart');
  return (
    <S.Button className={className}>
      <Button
        disabled={!isEnabled}
        size="field"
        onClick={() => onAddToCart(Number(1))}
        label={intl.msg('button.addtocart', 'Add to cart')}
        icon={<ShoppingBag size="20" />}
      />
    </S.Button>
  );
};

SimpleAddToCart.Skeleton = () => <div>Loading...</div>;

