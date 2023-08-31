/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import * as S from './FlightClass.styles';
import { ClassModal } from '../ClassModal/ClassModal';
import { Plane } from '@carbon/react/icons';
import { classMap } from '../Tiles/ClassTile/ClassTile';

type Props = {
  travelClasses: string[];
  setTravelClasses: Dispatch<SetStateAction<string[]>>;
  setTravelClassesString: Dispatch<SetStateAction<string>>;
  preferredClass?: string;
  usePreferences: boolean;
};

const getKeyByValue = (object, value) => {
  const k = Object.keys(object).find(key => object[key] === value);
  if (k) return k;
  else return '';
};

const formatClasses = (arr: string[]) => arr.map(curr => getKeyByValue(classMap, curr)).join(', ');

export const FlightClass = ({
  travelClasses,
  setTravelClasses,
  setTravelClassesString,
  preferredClass,
  usePreferences
}: Props) => {
  const [isClassModalOpen, setIsClassModalOpen] = useState<boolean>(false);
  const [classesString, setClassesString] = useState<string>(formatClasses(travelClasses));

  useEffect(() => setClassesString(formatClasses(travelClasses)), [travelClasses]);
  useEffect(() => setTravelClassesString(classesString), [classesString]);

  const toggleModal = useCallback(() => setIsClassModalOpen(prev => !prev), []);

  const classButtonLabel =
    travelClasses.length !== 0
      ? classesString.length >= 31
        ? classesString.slice(0, 29) + '...'
        : classesString
      : 'Class';

  return (
    <>
      <S.FlightClassWrapper>
        <S.ClassButton
          label={classButtonLabel}
          onClick={toggleModal}
          icon={<Plane size={32} />}
          iconPosition="left"
        />
      </S.FlightClassWrapper>
      <ClassModal
        isOpen={isClassModalOpen}
        title={'Select Class'}
        toggle={toggleModal}
        travelClasses={travelClasses}
        setTravelClasses={setTravelClasses}
        preferredClass={preferredClass}
        usePreferences={usePreferences}
      />
    </>
  );
};
