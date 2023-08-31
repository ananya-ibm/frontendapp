/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { AcknowledgeModal } from './AcknowledgeModal';

export default {
  title: 'Components/Automotive/AcknowledgeModal',
  component: AcknowledgeModal
};

const storyProps = {
  title: 'Landspeeder X34',
  monthlyPrice: {
    currency: 'GBP',
    value: '20000',
    prefix: 'From ',
    rate: ' per month'
  },
  modalHeading: null,
  open: true,
  okBtnClick: () => {},
  okBtnText: 'Ok',
  onRequestCloseClick: () => {},
  onClick: () => {}
};

export const normal = args => (
  <AcknowledgeModal {...args}>
    <p>Modal content</p>
  </AcknowledgeModal>
);
normal.args = storyProps;
