/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Card, CardSection } from '@exo/frontend-components-base';
import { Link } from '@exo/frontend-common-link';

export const BnkAccounts = styled('div')`
  background-color: ${props => props.theme.colors.backgrounds.panels.primary.base};
  padding-bottom: 1rem;
  padding-top: 1rem;
`;

export const BankingAccountItemLink = styled(Link)`
  color: ${props => props.theme.colors.text.primary}
`;

export const BankingAccountItem = styled(Card)`
  background-color: ${props => props.theme.colors.backgrounds.panels.secondary.base};
  display: flex;
  margin: 1rem 2rem 1rem 2rem;
`;

export const BankingAccountNumber = styled(CardSection)`
  font-size: 0.9rem;
  padding-top: 0.4rem;
  width: 20rem;
`;

export const BankingAccountBalance = styled('div')`
  font-size: 1.2rem;
  margin-top: 1rem;
  position: fixed;
  right: 5rem;
  text-align: right;
`;
