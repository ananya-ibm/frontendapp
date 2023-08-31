/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import { Button } from '@exo/frontend-components-base';
import theme from './StoreAvailabilityFinder.theme';

export const StoreAvailabilityFinder = styled('div')`
  & .cds--modal {
    background-color: transparent;
  }

  & .cds--modal-container {
    padding: 1rem;

    & .cds--btn {
      align-items: center;
      display: inline-flex;
      justify-content: center;
      line-height: 1.1;
      margin: 0 1rem 1rem;
      outline: none;
      padding: 0.75rem 1.75rem;
      text-transform: uppercase;
      transition: 160ms all ${props => theme(props).easing};
      user-select: none;
    }
  }

  & .cds--modal-content {
    max-height: 25rem;
    overflow: auto;
  }

  & .cds--modal-footer {
    display: flex;
    height: auto;
    justify-content: space-between;
  }
`;

export const Entry = styled('div')`
  align-items: flex-start;
  display: flex;
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  justify-content: space-between;
  margin: ${props => props.theme.spacing.stack.s6} ${props => props.theme.spacing.inline.s6}
    ${props => props.theme.spacing.stack.s6} 0;
  padding: 0 1rem;
`;

export const StoreInfo = styled('div')`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

export const Distance = styled('div')`
  color: ${props => props.theme.colors.text.tertiary};
  ${props => responsiveFontBlock(props.theme.typography.body.short.S)};
  margin-left: 2.2rem;
`;

/* eslint-disable no-nested-ternary */
export const Status = styled.span<{ type?: string }>`
  color: ${props =>
    props.type === 'available' ? 'green' : props.type === 'future' ? 'orange' : 'red'};
  text-align: right;
`;

export const AvailabilityButton = styled(Button)`
`;

export const StoreInput = styled('div')`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;
