/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Button } from '@carbon/react';
import theme from './FlightSortButton.theme';


export const IconLeft = styled('div')`
  height: 1rem;
  margin-bottom: 0.1rem;
  margin-right: ${props => props.theme.spacing.inline.s4};
`;

export const FlightSortButton = styled(Button)`
  font-size: ${props => theme(props).fontSize};
  font-weight: ${props => theme(props).fontWeight};
  white-space: nowrap;
  color: black;
  background-color: ${props => props.isActive? '#E5E5E5':'white'};
  border-color: #E5E5E5;
  padding: 0.7rem;
  border-radius: 2px;
    :focus {
        border-color: #E5E5E5;
        box-shadow: none;
    }
    :hover {
        border-color: ${props => props.isActive? 'gray':''};
        background-color: #E5E5E5;
        color: black;
    }

  svg {
    max-height: 100%;
  }
`;
