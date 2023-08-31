/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { PassengerTile } from '../Tiles/PassengerTile/PassengerTile';
import * as S from './PassengerModal.styles';

type Props = {
  isOpen: boolean;
  title: string;
  toggle: () => void;
  setPassengers: {
    adults: Dispatch<SetStateAction<number>>;
    children: Dispatch<SetStateAction<number>>;
    youngAdults: Dispatch<SetStateAction<number>>;
    infants: Dispatch<SetStateAction<number>>;
    submit: () => void;
  };
  passengers: {
    adults: number;
    children: number;
    youngAdults: number;
    infants: number;
  };
};

export const PassengerModal = ({ isOpen, title, toggle, setPassengers, passengers }: Props) => {

  return (
    <S.StyledModal
      isOpen={isOpen}
      onClose={toggle}
      isScrollable={true}
      buttons={[
        {
          onClick: () => {
            setPassengers.submit();
            toggle();
          },
          label: 'Submit',
          disabled: false
        },
        { onClick: toggle, label: 'Cancel', disabled: false }
      ]}
    >
      <S.ModalContent>
        <S.Title>{title}</S.Title>
        <PassengerTile setValue={setPassengers.adults} type={'Adult'} age={'16+ years'} value={passengers.adults} />
        <PassengerTile
          setValue={setPassengers.youngAdults}
          type={'Young adults'}
          age={'12 - 15 years'}
          value={passengers.youngAdults}
        />
        <PassengerTile setValue={setPassengers.children} type={'Children'} age={'2 - 11 years'} value={passengers.children} />
        <PassengerTile setValue={setPassengers.infants} type={'Infants'} age={'Under 2 years'} value={passengers.infants} />
      </S.ModalContent>
    </S.StyledModal>
  );
};
