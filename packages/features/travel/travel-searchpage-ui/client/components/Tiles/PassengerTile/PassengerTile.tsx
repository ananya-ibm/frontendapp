/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React, { Dispatch, SetStateAction } from 'react';
import * as S from '../Tiles.styles';
import { NumberInput } from '@carbon/react';

export const PassengerTile = ({ type, age, setValue, value }: Props) => {
  return (
    <S.PassengerTile>
      <S.Info>
        <S.TopInfo>
          <span>{type}</span>
        </S.TopInfo>
        <S.BottomInfo>
          <span>{age}</span>
        </S.BottomInfo>
      </S.Info>

      <S.PassengerNumber>
        <NumberInput
          id="carbon-number"
          max={20}
          min={0}
          size="md"
          value={value}
          onChange={e => setValue(e.imaginaryTarget.value)}
        />
      </S.PassengerNumber>
    </S.PassengerTile>
  );
};

type Props = {
  type: string;
  age: string;
  setValue: Dispatch<SetStateAction<number>>;
  value: number;
};
