/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ArrowLeft, ArrowRight } from '@carbon/react/icons';
import { ConfiguratorDealerPane } from './ConfiguratorDealerPane';

export default {
  title: 'Features/Automotive/Configurator/Smart Components/Product/ConfiguratorDealerPane',
  component: ConfiguratorDealerPane,
  argTypes: {
    beforeIcon: { control: { disable: true } },
    afterIcon: { control: { disable: true } }
  }
};

const storyProps = {
  beforeIcon: <ArrowLeft size={32} />,
  text: 'Go back'
};

const storyProps2 = {
  afterIcon: <ArrowRight size={32} />,
  text: 'Next'
};

export const beforeIcon = args => <ConfiguratorDealerPane {...args} />;
beforeIcon.args = storyProps;

export const afterIcon = args => <ConfiguratorDealerPane {...args} />;
afterIcon.args = storyProps2;
