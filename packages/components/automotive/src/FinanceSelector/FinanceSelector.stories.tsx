/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FinanceSelector } from './FinanceSelector';

export default {
  title: 'Components/Automotive/FinanceSelector',
  component: FinanceSelector
};

const storyProps = {
  tabs: [
    { label: 'PCP', id: 'pcp', content: <div>this is PCP content</div> },
    { label: 'Cash', id: 'cash', content: <div>this is Cash content</div> }
  ],
  onTabClick: () => {},
  tabId: 'cash'
};

export const normal = args => <FinanceSelector {...args} />;
normal.args = storyProps;
