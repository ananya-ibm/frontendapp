/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './ApplePayButton.styles';

declare global {
  interface Window {
    ApplePaySession?: any;
  }
}

export const ApplePayButton = () => {
  const ApplePaySession = window?.ApplePaySession;

  return ApplePaySession?.canMakePayments() ? (
    <S.ApplePayButton>
      <div className="apple-pay-button apple-pay-button-black" />
    </S.ApplePayButton>
  ) : (
    <div />
  );
};
