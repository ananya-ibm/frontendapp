/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { DatePicker as DatePckrInput } from '@carbon/react';

export const FlightDateContainer = styled('div')`
  display: flex;
  margin: 0.8rem 0;
`;

export const FlightDateWrapper = styled('div')`
  width: 100%;
  margin: 0 auto;
`;

export const FlightDateInput = styled(DatePckrInput)`
  & .cds--date-picker {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  & .cds--date-picker-container {
    width: 10.4rem;
  }

  & .cds--date-picker-input__wrapper .cds--date-picker__icon {
    fill: #525252;
  }

  & .cds--date-picker__input {
    width: 10.4rem;
    border: 1px solid #e5e5e5;
    border-radius: 2px;

    &:hover {
      cursor: pointer;
    }
  }

  & .cds--date-picker__input::placeholder {
    color: #525252;
  }
`;

export const FlightSingleDateInput = styled(FlightDateInput)`
  & .cds--date-picker-container {
    flex-grow: 1;
  }

  & .cds--date-picker__input {
    flex-grow: 1;
  }
`;
