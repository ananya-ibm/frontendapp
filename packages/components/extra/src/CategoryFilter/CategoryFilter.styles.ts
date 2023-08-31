/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './CategoryFilter.theme';

export const CategoryFilter = styled('div')`
  & .heading {
    text-align: left;
  }

  & .subHeading {
    font-weight: 400;
  }
`;

export const CategoryHeading = styled('div')`
  background-color: ${props => theme(props).categoryBackground};
  font-weight: 700;
  padding: ${props => theme(props).padding};
`;

export const Rows = styled('div')`
  background-color: ${props => theme(props).backgroundColor};
  border-bottom: 0.1rem solid ${props => theme(props).borderBottom};
  font-size: ${props => theme(props).fontSize};
  padding: ${props => theme(props).padding};

  &:hover {
    background-color: ${props => theme(props).categoryBackground};
    cursor: pointer;
  }

  &.isActive {
    background-color: ${props => theme(props).categoryBackground};
    font-weight: 700;
  }
`;
