/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import * as S from './FlightPassenger.styles';
import { PassengerModal } from '../PassengerModal/PassengerModal';
import { UserMultiple } from '@carbon/react/icons';

export const FlightPassenger = ({ setPassengers, passengers }: Props) => {
  const [isPassengerModalOpen, setIsPassengerModalOpen] = useState<boolean>(false);
  const [adults, setAdults] = useState<number>(0);
  const [youngAdults, setYoungAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  const toggleModal = useCallback(() => setIsPassengerModalOpen(prev => !prev), []);

  const submitPassengers = useCallback(() => {
    setPassengers(+adults + +youngAdults + +infants + +children);
  }, [adults, youngAdults, infants, children]);

  return (
    <>
      <S.FlightPassengerWrapper>
        <S.PassengerButton
          label={passengers ? passengers : "Passengers"}
          onClick={toggleModal}
          icon={<UserMultiple size={32} />}
          iconPosition="left"
        />
      </S.FlightPassengerWrapper>
      <PassengerModal
        isOpen={isPassengerModalOpen}
        title={'Add Passenger'}
        toggle={toggleModal}
        setPassengers={{
          adults: setAdults,
          children: setChildren,
          youngAdults: setYoungAdults,
          infants: setInfants,
          submit: submitPassengers
        }}
        passengers={{
          adults,
          children,
          youngAdults,
          infants
        }}
      />
    </>
  );
};

type Props = {
  // onSearch: (q?: string) => void;
  setPassengers: Dispatch<SetStateAction<number>>;
  passengers: number;
};
