/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

export const AllStores = styled('div')`
  &&& {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 8rem 0;
    ${props => media.greaterThan(props, 'medium').then(css`
      margin-top: 5rem;
    `)}
  }
`;

export const Grid = styled('div')`
  &&& {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  }
`;
