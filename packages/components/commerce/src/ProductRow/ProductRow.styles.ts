/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './ProductRow.theme';

export const Media = styled('div')`
  align-items: flex-start;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  margin: 0.2rem;
  overflow: hidden;
  padding: 0.5rem;
  width: 10rem;

  & .image {
    max-height: ${props => theme(props).imgMaxHeight};
    max-width: ${props => theme(props).imgMaxWidth};
    width: auto;
  }
`;

export const ProductRow = styled('div')`
  position: relative;

  & > .productrow-link {
    align-items: center;
    border-top: 0.1rem solid ${props => props.theme.colors.delimiters.primary};
    color: ${props => props.theme.colors.text.primary};
    cursor: pointer;
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow: hidden;
    padding: 1rem 0.0625rem;
    position: relative;
    text-decoration: none;
    transition: ${props => theme(props).transition};
    width: 100%;

    ${props => media.greaterThan(props, 'small').then(css`
      padding:0;
    `)}

    &:hover,
    &:focus,
    &:focus-within {
      box-shadow: ${props => theme(props).boxShadowHover};
    }
  }
`;

export const Content = styled('div')`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 1rem;

  ${props => media.greaterThan(props, 'small').then(css`
    padding: ${props.theme.spacing.inset.M};
  `)}
`;

export const Body = styled('div')`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
`;

export const Title = styled('h3')`
  color: ${props => theme(props).textColor};
  ${props => responsiveFontBlock(props.theme.typography.heading.heading5, { weight: 700 })};
  margin-bottom: ${props => theme(props).textMarginBottom};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Description = styled('p')`
  -webkit-box-orient: vertical;
  color: ${props => theme(props).textColor};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  margin-bottom: ${props => theme(props).textMarginBottom};
  overflow: hidden;
`;

export const Price = styled('p')`
  color: ${props => theme(props).priceColor};
  font: ${props => theme(props).priceFont};
  margin: ${props => theme(props).borderRadius};
`;

export const MonthlyPrice = styled('div')`
  color: ${props => theme(props).textColor};
  ${props => responsiveFontBlock(props.theme.typography.body.short.M, { size: '1rem' })};
  margin: 0.75rem 0 0;
`;

export const Subscription = styled('p')`
  margin: ${props => theme(props).borderRadius};
`;

export const AvailabilitySection = styled('div')`
  margin: ${props => theme(props).availabilityMargin};
`;

const titleCase = a => a[0].toUpperCase() + a.slice(1).toLowerCase();

export const AvailabilityEntry = styled('div')<{ status?: string }>`
  ${props => {
    const indicator = theme(props)[`availabilityStatusIndicator${titleCase(props.status)}`];
    const color = theme(props)[`availabilityStatusColor${titleCase(props.status)}`];
    if (indicator) {
      return `
        &:before {
          content: '${indicator}';
          margin-right: 1em;
          color: ${color};
        }
      `;
    }
    return '';
  }}
  color: ${props => theme(props)[`availabilityStatusColor${titleCase(props.status)}`]};
`;
