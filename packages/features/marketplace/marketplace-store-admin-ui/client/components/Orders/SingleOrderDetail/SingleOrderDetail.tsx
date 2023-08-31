/* eslint-disable react/jsx-props-no-spreading */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { OrderDetails } from '@exo/frontend-components-commerce';
import { ArrowLeft } from '@carbon/react/icons';
import { Button } from '@exo/frontend-components-base';
import * as S from './SingleOrderDetail.styles';

export const SingleOrderDetail = ({ orderData, onBackClick }) => {
  return (
    <S.SingleOrderDetail>
      <Button icon={<ArrowLeft size={32} />} onClick={onBackClick} />
      <OrderDetails {...orderData} />
    </S.SingleOrderDetail>
  );
};
