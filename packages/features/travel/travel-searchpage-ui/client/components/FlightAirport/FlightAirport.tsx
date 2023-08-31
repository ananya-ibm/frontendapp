/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

import { Layer } from '@exo/frontend-components-base';
import * as S from './FlightAirport.styles';
import { AirportModal, Airport } from '../AirportModal/AirportModal';

export const FlightAirport = React.memo(
  ({
    from,
    setFrom,
    to,
    setTo,
    usePreferences
  }: Props) => {
    const [isFromModalOpen, setIsFromModalOpen] = useState<boolean>(false);
    const [isToModalOpen, setIsToModalOpen] = useState<boolean>(false);

    const toggleModal = useCallback((action: 'open' | 'close', modal: 'from' | 'to') => {
      switch (modal) {
        case 'from':
          setIsFromModalOpen(action === 'open' ? true : false);
          break;
        case 'to':
          setIsToModalOpen(action === 'open' ? true : false);
          break;
      }
    }, []);

    const switchAirports = () => {
      const [fromTemp, toTemp] = [from, to];
      setFrom(toTemp);
      setTo(fromTemp);
    };

    const fromLabel = useMemo(
      () =>
        from.name && from.location
          ? `From: ${from.name}, ${from.location}`.length >= 35
            ? `From: ${from.name}, ${from.location}`.slice(0, 38) + '...'
            : `From: ${from.name}, ${from.location}`
          : 'From:',
      [from]
    );
    const toLabel = useMemo(
      () =>
        to.name && to.location
          ? `To: ${to.name}, ${to.location}`.length >= 37
            ? `To: ${to.name}, ${to.location}`.slice(0, 40) + '...'
            : `To: ${to.name}, ${to.location}`
          : 'To:',
      [to]
    );

    return (
      <>
        <Layer>
          <S.FlightAirportContainer>
            <S.AirportsPicker>
              <S.UpperFlightButton label={fromLabel} onClick={() => toggleModal('open', 'from')} />
              <S.LowerFlightButton label={toLabel} onClick={() => toggleModal('open', 'to')} />
              <S.SwitchIconButton onClick={switchAirports}>
                <S.SwitchIcon />
              </S.SwitchIconButton>
            </S.AirportsPicker>
          </S.FlightAirportContainer>
        </Layer>

       {isFromModalOpen && <AirportModal
          isOpen={isFromModalOpen}
          title={'From where?'}
          closeModal={() => toggleModal('close', 'from')}
          setAirport={setFrom}
          usePreferences={usePreferences}
          placeholder={'Enter city of departure'}
        />}

       {isToModalOpen && <AirportModal
          isOpen={isToModalOpen}
          title={'To where?'}
          closeModal={() => toggleModal('close', 'to')}
          setAirport={setTo}
          usePreferences={usePreferences}
          placeholder={'Enter city of arrival'}
        />}
      </>
    );
  }
);

type Props = {
  from: Airport;
  setFrom: Dispatch<SetStateAction<Airport>>;
  to: Airport;
  setTo: Dispatch<SetStateAction<Airport>>;
  usePreferences: boolean;
};