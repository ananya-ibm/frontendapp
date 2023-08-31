/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

//import { useState } from 'react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { classMap, ClassTile } from '../Tiles/ClassTile/ClassTile';
import * as S from './ClassModal.styles';

type Props = {
  isOpen: boolean;
  title: string;
  toggle: () => void;
  travelClasses: string[];
  setTravelClasses: Dispatch<SetStateAction<string[]>>;
  preferredClass?: string;
  usePreferences: boolean;
};

export const ClassModal = ({
  isOpen,
  title,
  toggle,
  travelClasses,
  setTravelClasses,
  preferredClass,
  usePreferences
}: Props) => {
  const [tiles, setTiles] = useState<JSX.Element[]>();

  useEffect(() => {
    const map: JSX.Element[] = [];
    for (const className in classMap) {
      if (Object.prototype.hasOwnProperty.call(classMap, className)) {
        map.push(
          <ClassTile
            key={`searchpage-classModal-${className}`}
            flightClass={className}
            travelClasses={travelClasses}
            setTravelClasses={setTravelClasses}
            isStarred={usePreferences && preferredClass === classMap[className]}
          />
        );
      }
    }
    setTiles(map);
  }, [travelClasses, usePreferences]);

  return (
    <S.StyledModal
      isOpen={isOpen}
      onClose={toggle}
      isScrollable={true}
      buttons={[
        { onClick: toggle, label: 'Submit', disabled: false },
        { onClick: toggle, label: 'Cancel', disabled: false }
      ]}
    >
      <S.ModalContent>
        <S.Title>{title}</S.Title>
        {tiles}
      </S.ModalContent>
    </S.StyledModal>
  );
};
