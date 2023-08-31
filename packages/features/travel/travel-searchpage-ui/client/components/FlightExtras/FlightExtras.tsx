/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Layer } from '@exo/frontend-components-base';
import * as S from './FlightExtras.styles';
import { FlightExtraButton } from '@exo/frontend-components-travel';
import { Departure, Hotel, Car, Restaurant, Wifi } from '@carbon/react/icons';

export const FlightExtras = ({}: Props) => {
  return (
    <Layer>
      <S.FlightExtrasContainer>
        <FlightExtraButton label="Flights" icon={<Departure />} isInitiallyActive={true} />
        <FlightExtraButton label="+ Hotel" icon={<Hotel />} />
        <FlightExtraButton label="+ Car" icon={<Car />} />
        <FlightExtraButton label="+ Wifi" icon={<Wifi />} />
        <FlightExtraButton label="+ Restaurant" icon={<Restaurant />} />
      </S.FlightExtrasContainer>
    </Layer>
  );
};

type Props = {
  // onSearch: (q?: string) => void;
};
