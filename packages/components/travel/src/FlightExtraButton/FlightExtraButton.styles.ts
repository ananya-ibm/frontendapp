/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Button as CarbonButton } from '@carbon/react';
import theme from './FlightExtraButton.theme';


export const IconLeft = styled('div')`
  height: 1rem;
  margin-bottom: 0.1rem;
  margin-right: ${props => props.theme.spacing.inline.s4};
`;

export const CarbonButtonWrapper = styled(CarbonButton)`
  font-size: ${props => theme(props).fontSize};
  font-weight: ${props => theme(props).fontWeight};
  line-height: 0;
  white-space: nowrap;
  color: black;
  background-color: ${props => props.isActive? 'lightgray':'transparent'};
  border-color: lightgray;
  padding:10px;
    :focus{
        border-color: lightgray;
        box-shadow: none;
    }
    :hover{
        border-color: ${props => props.isActive? 'gray':''};
        background-color: lightgray;
        color: black;
    
    }

  svg {
    max-height: 100%;
  }
`;
