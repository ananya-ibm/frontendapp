/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const OrderHistoryPage = styled('div')`
  & .orders-button {
    background: ${props => props.theme.colors.backgrounds.panels.secondary.base};
    border: 0.0625rem solid ${props => props.theme.colors.brand.brand1.base};
    color: ${props => props.theme.colors.brand.brand1.base};
    margin: 1rem;
  }

  & .orders-button:hover {
    background: ${props => props.theme.colors.backgrounds.panels.primary.base};
  }
`;

export const Content = styled('div')`
  flex: 2 1;
  margin: 1rem;
`;

export const Order = styled('div')`
  border: 0.0625rem solid ${props => props.theme.colors.delimiters.lowContrast};
  margin-bottom: ${props => props.theme.spacing.stack.s6};
`;

export const OrderInfo = styled('div')`
  align-items: center;
  background: ${props => props.theme.colors.backgrounds.panels.secondary.base};
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.inset.L};
`;

export const OrderHeader = styled('div')`
  align-items: center;
  background-color: ${props => props.theme.colors.backgrounds.panels.primary.base};
  display: inline-flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.inset.L};
  width: 100%;
`;

export const OrderInfoField = styled('div')`
  align-items: left;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
`;

export const OrderHeaderField = styled('div')`
  align-items: center;
  display: inline-flex;
  padding: ${props => props.theme.spacing.inset.S};
`;

export const Media = styled('div')`
  align-items: center;
  display: flex;
  height: 18rem;
  justify-content: center;
  padding: 2.5rem;
  width: 18rem;

  /* stylelint-disable-next-line */
  & img {
    max-height: 15rem;
    max-width: 16.25rem;
  }
`;

export const Title = styled('h3')`
  font-weight: 700;
  text-align: left;
`;

export const LeftButton = styled('div')`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;