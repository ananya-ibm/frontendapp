/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved
US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';

export const ProductSummary = styled('div')`
`;

export const ProductName = styled.h1`
  margin: ${props => props.theme.spacing.stack.s4} 0;
`;

export const Partnumber = styled('div')`
  color: ${props => props.theme.colors.text.secondary};
  ${props => responsiveFontBlock(props.theme.typography.body.short.L)};
`;

export const ShortDescription = styled('div')`
  display: none;
  ${props => media.greaterThan(props, 'medium').then(css`
    display: block;
    ${responsiveFontBlock(props.theme.typography.body.short.L)};
    margin: ${props.theme.spacing.stack.s4} 0;
  `)}
`;
