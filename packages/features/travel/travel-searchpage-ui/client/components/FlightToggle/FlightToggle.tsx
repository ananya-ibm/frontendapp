/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Layer } from '@exo/frontend-components-base';
import * as S from './FlightToggle.styles';
import { Dispatch, SetStateAction } from 'react';

export const FlightToggle = ({ isOneWayToggled, setIsOneWayToggled }: Props) => {
  return (
    <>
      <Layer>
        <S.FlightToggleWrapper>
          <S.Text>Are you looking for a one-way flight?</S.Text>
          <S.Toggle
            toggled={isOneWayToggled}
            id="toggle-oneway"
            labelA="No"
            labelB="Yes"
            labelText=""
            onToggle={() => {
              setIsOneWayToggled(prev => !prev);
            }}
          />
        </S.FlightToggleWrapper>
      </Layer>
    </>
  );
};

type Props = {
  isOneWayToggled: boolean;
  setIsOneWayToggled: Dispatch<SetStateAction<boolean>>;
};
