/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './DetailsGrid.theme';

export const DetailsGrid = styled('ul')`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  list-style: none;
  width: 100%;
`;

export const Detail = styled('li')`
  color: ${props => theme(props).detailColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Title = styled('h4')`
  color: ${props => theme(props).titleColor};
`;
