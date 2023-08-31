/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as S from '../Tiles.styles';

type Props = {
  flightClass: string;
  travelClasses: string[];
  setTravelClasses: Dispatch<SetStateAction<string[]>>;
  isStarred?: boolean;
};

// This is where the class options are defined. They have the following format: 'class name to display': 'class query value'
export const classMap = {
  Economy: 'ECONOMY',
  'Premium Economy': 'PREMIUM_ECONOMY',
  Business: 'BUSINESS',
  'First Class': 'FIRST'
};

export const ClassTile = ({ flightClass, travelClasses, setTravelClasses, isStarred }: Props) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (isSelected) {
      setTravelClasses(current => [...current, classMap[flightClass]]);
    }

    for (let i = 0; i < travelClasses.length; i++) {
      if (travelClasses[i] === classMap[flightClass]) {
        travelClasses.splice(i, 1);
      }
    }
  }, [isSelected]);

  return (
    <S.ClassTile selected={isSelected} onClick={() => setIsSelected(prev => !prev)} value="">
      <S.Info>
        <S.ClassTopInfo>
          <S.StarIcon isvisible={isStarred ? 1 : 0} />
          <span>{flightClass}</span>
        </S.ClassTopInfo>
      </S.Info>
    </S.ClassTile>
  );
};
