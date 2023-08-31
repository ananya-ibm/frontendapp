/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ReviewSummary } from './ReviewSummary';

export default {
  title: 'Components/Commerce/ReviewSummary',
  component: ReviewSummary
};

type Props = React.ComponentProps<typeof ReviewSummary>;

export const Default = args => <ReviewSummary {...args} />;
Default.args = {
  reviewCount: {
    1: 12,
    2: 45,
    3: 78,
    4: 23,
    5: 90
  }
} as Props;
