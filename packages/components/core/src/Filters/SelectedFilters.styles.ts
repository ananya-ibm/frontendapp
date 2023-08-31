/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { media } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';

export const Tags = styled('div')`
  margin: -0.5rem 0 1.5rem;
  ${props => media.greaterThan(props, 'large').then(css`
    margin: ${props.theme.spacing.stack.s6} 0 0 0;
  `)}
`;
