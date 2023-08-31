/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import styled from 'styled-components';

export const ReviewList = styled('ul')`
  display: flex;
  flex-direction: column;
  row-gap: ${props => props.theme.spacing.stack.s6};
`;

export const Review = styled('li')`
  border-bottom: 0.125rem solid ${props => props.theme.colors.delimiters.lowContrast};
  display: grid;
  grid-template-areas:
    'avatar name'
    'avatar stars'
    'avatar review';
  grid-template-columns: 4rem 1fr;

  padding-bottom: ${props => props.theme.spacing.stack.s6};

  &:last-child {
    border-bottom-width: 0;
  }
`;

export const Avatar = styled('div')<{ src?: string }>`
  background-color: ${props => props.theme.colors.backgrounds.panels.tertiary.base};
  ${props => (props.src ? `background-image: url(${props.src})` : '')};
  background-position: center;
  background-size: cover;
  border: 0.125rem solid ${props => props.theme.colors.backgrounds.panels.tertiary.base};
  border-radius: 100%;
  grid-area: avatar;
  height: 3rem;
  width: 3rem;
`;

export const Name = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading5)};
  grid-area: name;
  margin-bottom: ${props => props.theme.spacing.stack.s3};
`;

export const Stars = styled('div')`
  grid-area: stars;
  margin-bottom: ${props => props.theme.spacing.stack.s3};
`;

export const ReviewText = styled('div')`
  color: ${props => props.theme.colors.text.secondary};
  grid-area: review;
`;

export const Location = styled('div')`
  color: ${props => props.theme.colors.text.tertiary};
  display: inline;
  font-weight: 400;
`;
