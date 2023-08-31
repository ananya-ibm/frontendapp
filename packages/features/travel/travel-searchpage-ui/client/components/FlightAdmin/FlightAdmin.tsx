/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Layer } from '@exo/frontend-components-base';
import * as S from './FlightAdmin.styles';
import { AdminTile } from '../Tiles/AdminTile/AdminTile';

export const FlightAdmin = ({}: Props) => {
  return (
    <Layer>
      <S.FlightAdminWrapper>
        <AdminTile text={'Manage your bookings'} />
        <AdminTile text={'Check in'} />
        <AdminTile text={'Manage your flight preferences'} />
      </S.FlightAdminWrapper>
    </Layer>
  );
};

type Props = {
  // onSearch: (q?: string) => void;
};
