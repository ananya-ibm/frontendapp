/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useRef } from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { Favorite } from '@carbon/react/icons';
import { Button, TextInput } from '@exo/frontend-components-base';
import { ProductAddToCartContainerRenderProps } from '@exo/frontend-features-catalog-logic';
import * as S from './AddToCart.styles';

export const AddToCart = ({
  isEnabled,
  onAddToCart,
  onAddToFavorites,
  className
}: ProductAddToCartContainerRenderProps & { className?: string }) => {
  const qty = useRef<HTMLInputElement>(null);
  const intl = useIntl('features.catalog.catalog-ui.components.AddToCart');
  return (
    <S.Wrapper className={className}>
      <S.AddToCart>
        <S.NumberInput>
          <TextInput id="quantity" min={1} type="number" ref={qty} value={1} />
        </S.NumberInput>
        <S.Button>
          <Button
            disabled={!isEnabled}
            size="field"
            onClick={() => onAddToCart(Number(qty.current?.value))}
            label={intl.msg('button.addtocart', 'Add to cart')}
          />
          {onAddToFavorites && (
            <Button
              disabled={!isEnabled}
              variant="secondary"
              size="field"
              onClick={() => onAddToFavorites!(Number(qty.current?.value))}
              icon={<Favorite size={16} />}
            />
          )}
        </S.Button>
      </S.AddToCart>
    </S.Wrapper>
  );
};

AddToCart.Skeleton = () => <div>Loading...</div>;

