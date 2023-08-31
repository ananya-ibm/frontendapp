/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Layer } from '@exo/frontend-components-base';
import * as S from './FlightPreferences.styles';

export const FlightPreferences = ({ isToggled, toggle }: Props) => {
  return (
    <>
      <Layer>
        <S.FlightPreferencesContainer>
          <S.Text>Search with your flight preferences</S.Text>
          <S.Toggle
            labelText=""
            defaultToggled
            id="toggle-1"
            labelA=""
            labelB=""
            toggled={isToggled}
            onToggle={toggle}
          />
        </S.FlightPreferencesContainer>
      </Layer>
    </>
  );
};

type Props = {
  toggle: () => void;
  isToggled: boolean;
};
