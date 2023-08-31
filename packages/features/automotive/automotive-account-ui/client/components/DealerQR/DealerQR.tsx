/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import  QRCode  from 'qrcode.react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import * as S from './DealerQR.styles';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { QREmail } from '@exo/frontend-components-automotive';

type Props = {
  subtitle?: string;
  description?: string;
  buttonText?: string | React.ReactNode;
  onSubmit?: (email?: string) => void;
};

export const DealerQR = ({}: Props) => {
  const {username, token} = useSessionContext();

  const QRDataString = JSON.stringify({
    username,
    token
  });
  return (
    <S.DealerQR>
      <LayoutSpacing size="sm" />
      Want to discuss your potential purchase with a dealership? <div></div>
      We've created for you a unique customer details code which can be used for your online product configuration, financing option and information
      <LayoutSpacing size="sm" />
      <QRCode value={QRDataString || 'test'} />
      <LayoutSpacing size="xs" />
      Enter email address below to recieve the QR code to your inbox:
      <LayoutSpacing size="xs" />
      <QREmail/>
    </S.DealerQR>
  );
};