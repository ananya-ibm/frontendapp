/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { QRScannerPage } from './QRScannerPage';
import App from '../../../../automotive-dealer-homepage-ui/client/App';

export default {
  title: 'Features/Automotive/DealerHomePage/Pages/QRScanner',
  component: QRScannerPage,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = args => (
  <ContainerWrapper type="auto" app={App}>
    <QRScannerPage {...args} />
  </ContainerWrapper>
);
Default.args = {};
