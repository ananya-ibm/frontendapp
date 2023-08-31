/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Tabs } from '@exo/frontend-components-base';
import theme from './TrimPriceBar.theme';

export const TabsWrapper = styled(Tabs)`
  border-radius: 0.313rem;
  display: flex;
  justify-content: flex-end;

  max-width: 99rem;
  position: relative;
  right: 10%;
  top: -6rem;
  z-index: 2;

  & .cds--tabs__nav-item {
    background-color: ${props => theme(props).tabBgColor};
    border-right: 0.125rem solid ${props => theme(props).tabBorderColor};
    border-top: 0.125rem solid ${props => theme(props).tabBorderColor};
    margin-left: 0;
    padding: 0.65rem 0;
    width: max-content;

    &:focus {
      outline: none;
    }

    & .cds--tabs__nav-link,
    .cds--tabs__nav-link:active,
    .cds--tabs__nav-link:focus {
      align-items: center;
      border-bottom: none;
      color: ${props => theme(props).tabHoverBgColor};
      display: flex;
      height: fit-content;
      outline: none;
      padding: 0 ${props => props.theme.spacing.inline.s5};
      width: 100%;

      &:hover {
        border-bottom: none;
      }
    }

    &:first-child {
      border-collapse: separate;
      border-left: 0.125rem solid ${props => theme(props).tabBorderColor};
      border-radius: 0.313rem 0 0 0;
      overflow: hidden;
    }

    &:last-child {
      border-collapse: separate;
      border-radius: 0 0.313rem 0 0;
      overflow: hidden;
    }

    &:hover {
      background-color: ${props => theme(props).tabHoverBgColor};

      & .cds--tabs__nav-link,
      .cds--tabs__nav-link:active,
      .cds--tabs__nav-link:focus,
      .cds--tabs__nav-link:hover {
        border-bottom: none;
      }

      &:hover:not(.cds--tabs__nav-item--disabled) {
        background-color: ${props => theme(props).tabHoverBgColor};
      }
    }
  }

  @media (min-width: 99rem) {
    padding: 0;
  }
`;

export const PriceBar = styled('div')`
  background-color: ${props => theme(props).priceBarBgColor};
  border-radius: 0.25rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2), 0 0 1rem rgba(0, 0, 0, 0.2);
  margin: 0 10%;
  max-width: 99rem;
  position: relative;
  text-align: center;
  top: -6rem;
`;
