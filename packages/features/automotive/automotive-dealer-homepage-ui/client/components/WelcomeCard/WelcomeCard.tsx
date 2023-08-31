/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { WelcomeCard as Card } from '@exo/frontend-components-automotive';
import { getClientImagePath } from '@exo/frontend-common-utils';
import { useHistory } from 'react-router-dom';

export const WelcomeCard = () => {
  let history = useHistory();
  const useQrScanner = () => {
    let path = '/qrscanner/qrscanner';
    history.push(path);
  };

  const imgPath = '/static/images/homepage/';

  const data = {
    title: 'Welcome',
    image: getClientImagePath(`${imgPath}car.jpg`),
    description:
      "Hello and welcome to the dealer view app. In just a few simple steps you can learn more about your customer and the vehicles they've configured and saved online. All you need to do is scan the QR code which can be found in the dealer view section of your customer's online account. Try it now by clicking the scan QR code button.",
    buttonText: 'Click to scan QR code',
    bottomText: 'Customer does not have a QR code?',
    clickAction: useQrScanner
  };

  return <Card data={data} />;
};
