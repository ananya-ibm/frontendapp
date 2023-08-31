/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SelectionList } from './SelectionList';

export default {
  title: 'Components/Core/SelectionList',
  component: SelectionList
};

export const Default = (args) => (
  <SelectionList {...args}>
    <SelectionList.Entry id="a">Lorem</SelectionList.Entry>
    <SelectionList.Entry id="b" defaultSelected>
      Ipsum
    </SelectionList.Entry>
    <SelectionList.Entry id="c">Dolor</SelectionList.Entry>
  </SelectionList>
);
Default.args = {};
