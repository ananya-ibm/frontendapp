/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { Store } from '@carbon/react/icons';
import * as S from './MarketplaceIcon.styles';

export const MarketplaceIcon = () => {
  return (
    <S.MarketplaceIcon aria-label="Stores" to="/account-stores/overview">
      <Store size={32} />
    </S.MarketplaceIcon>
  );
};
