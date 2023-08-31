/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const TradeInConfirmation = styled('div')`
  font-weight: 700;
`;

export const Title = styled('div')`
  font-size: ${props => props.theme.spacing.inline.s5};
`;

export const Text = styled('span')`
  display: inline-block;
  font-weight: 400;
  padding: ${props => props.theme.spacing.inline.s6} 0.2rem 0 0;
`;

export const LinkButton = styled('div')`
  padding: ${props => props.theme.spacing.inline.s6} 0;
`;

export const ValuationSection = styled('div')`
  border-top: 0.0625rem solid ${props => props.theme.colors.delimiters.primary};
  display: flex;
`;

export const CurrentValuation = styled('div')`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  font-size: ${props => props.theme.spacing.inline.s5};
  font-weight: 400;
  margin-left: auto;
  padding-top: ${props => props.theme.spacing.stack.s6};
`;

export const Cost = styled('div')`
  font-size: ${props => props.theme.spacing.inline.s6};
  font-weight: 700;
  padding: ${props => props.theme.spacing.inline.s5} 0;
`;

export const ButtonGroup = styled('div')`
  display: flex;
  padding-top: ${props => props.theme.spacing.stack.s6};
`;

export const ConfirmationButton = styled('div')`
  margin-left: auto;
`;
