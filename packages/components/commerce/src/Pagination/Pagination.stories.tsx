/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Pagination } from './Pagination';

export default {
  title: 'Components/Commerce/Pagination',
  component: Pagination
};

const storyProps = {
  backwardText: 'Previous page',
  forwardText: 'Next page',
  itemsPerPageText: 'Items per page:',
  page: 1,
  pageNumberText: 'Page Number',
  totalItems: 123,
  isDisabled: false
};

export const normal = args => <Pagination {...args} />;
normal.args = storyProps;
