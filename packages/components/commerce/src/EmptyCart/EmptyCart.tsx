/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Button } from '@exo/frontend-components-base';
import { useHistory } from 'react-router-dom';
import { useIntl } from '@exo/frontend-common-i18n';
import * as S from './EmptyCart.styles';

export const EmptyCart = 
({
  secondaryUrl,
  secondaryText,
  primaryUrl,
  primaryText,
  ...other
}: Props) => {
  const history = useHistory();
  const intl = useIntl('features.cart.cart-ui.pages.CartPage');

  return (
    <S.EmptyCart {...other}>
      <S.Title>{intl.msg('Title', 'Your cart is currently empty')}</S.Title>
      <S.ButtonGroup>
        {secondaryText && (
          <Button
            variant="secondary"
            onClick={() => history.push(secondaryUrl!)}
            label={secondaryText}
          />
        )}
        <Button onClick={() => history.push(primaryUrl)} label={primaryText} />
      </S.ButtonGroup>
    </S.EmptyCart>
  );
};

type Props = {
  secondaryUrl?: string;
  secondaryText?: string;
  primaryUrl: string;
  primaryText: string | React.ReactNode;
};
