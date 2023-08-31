/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { Dispatch, SetStateAction, useState } from 'react';
import { DatePickerInput } from '@carbon/react';
import { Layer } from '@exo/frontend-components-base';
import * as S from './FlightDate.styles';

// The input for this function has the same format as the value of DatePickerInput
const formatDate = (date: string | null) => {
  if (date) {
    return new Date(date).toISOString();
  } else return "";
};

export const FlightDate = ({ isOneWay, setDateReturn, setDateDeparture, dateDeparture, dateReturn }: Props) => {
  const [dateDepartureLocal, setDateDepartureLocal] = useState<string>(formatDate(dateDeparture));
  const [dateReturnLocal, setDateReturnLocal] = useState<string>(formatDate(dateReturn));
  return (
    <Layer>
      <S.FlightDateWrapper>
        <S.FlightDateContainer>
          {isOneWay ? (
            <S.FlightSingleDateInput
              datePickerType="single"
              size="md"
              onChange={(date: string[]) => setDateDeparture(formatDate(date[0]))} 
              minDate={(Date.now())}
            >
              <DatePickerInput
                id="date-picker-single"
                labelText="Pick a departure date"
                placeholder="mm/dd/yyyy"
                size="md"
                value={dateDepartureLocal}
              />
            </S.FlightSingleDateInput >
          ) : (
            <S.FlightDateInput
              datePickerType="range"
              size="md"
              onChange={(date: string[]) => {
                if(date[0]) setDateDepartureLocal(formatDate(date[0]));
                if(date[1]) setDateReturnLocal(formatDate(date[1]));
                setDateDeparture(formatDate(date[0]));
                setDateReturn(formatDate(date[1]));
              }}
              minDate={(Date.now())}
            >
              <DatePickerInput
                id="date-picker-input-id-start"
                labelText="Date to leave"
                placeholder="mm/dd/yyyy"
                size="md"
                value={dateDepartureLocal}
              />
              <DatePickerInput
                id="date-picker-input-id-finish"
                labelText="Date to return"
                placeholder="mm/dd/yyyy"
                size="md"
                value={dateReturnLocal}
              />
            </S.FlightDateInput>
          )}
        </S.FlightDateContainer>
      </S.FlightDateWrapper>
    </Layer>
  );
};

type Props = {
  isOneWay: boolean;
  setDateDeparture: Dispatch<SetStateAction<any>>;
  setDateReturn: Dispatch<SetStateAction<any>>;
  dateDeparture: string | null;
  dateReturn: string | null;
};