/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { AncillaryPage } from './AncillaryPage';

type Props = React.ComponentProps<typeof AncillaryPage>;

export default {
  title: 'Features/Flights page/Pages/FlightsPage',
  component: AncillaryPage
};

export const Default = (args: Props) => <AncillaryPage {...args} />;
Default.args = {
  // TODO: Add dummy data here
} as Props;
