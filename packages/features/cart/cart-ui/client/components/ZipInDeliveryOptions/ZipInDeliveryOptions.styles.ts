/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const DeliveryOptionsComponent = styled('form')`
  width: 100%;
`;

export const DeliveryOptionsHeader = styled('div')`
  margin-bottom: 1rem;
`;

export const OptionsList = styled('div')`
`;

export const Title = styled.p`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const SubTitle = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.labels.label)};
  color: ${props => props.theme.colors.text.secondary};
  margin-top: 1rem;
`;

export const Entry = styled('div')`
  display: flex;
  margin-top: 0.25rem;
`;

export const EntryName = styled('div')`
`;

export const EntryRate = styled('div')`
  font-size: 90%;
  margin-left: auto;
`;

export const EntryStatus = styled('div')`
  font-size: 90%;
  margin-left: auto;
`;
