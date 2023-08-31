/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DisplayFlightsContainer } from '@exo/frontend-features-travel-flights-page-logic';
import { DisplayFlights } from '../../components/DisplayFlights/DisplayFlights';

export const FlightsPage = () => {
  return (
    <>
      <DisplayFlightsContainer
        render={args => <DisplayFlights {...args} />}
        renderLoading={args => <DisplayFlights.Skeleton {...args} />}
      />
    </>
  );
};
