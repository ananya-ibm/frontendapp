/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './ProductCard.theme';
import { transparentize } from 'color2k';

export const Title = styled('h3')`
  color: ${props => theme(props).textColor};
  font: ${props => theme(props).title__font};
  letterSpacing: ${props => theme(props).title__letterSpacing};
  margin-bottom: ${props => theme(props).textMarginBottom};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Media = styled('div')`
  position: relative;
  aspect-ratio: ${props => theme(props).media__aspectRatio};
  background: ${props => theme(props).media__background};
  justify-content: center;
  overflow: hidden;
  border: 1px solid #dedede;
  width: 100%;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const Button = styled('div')`
  margin-top: 0.5rem;
`;

export const Bag = styled('div')`
  background: ${props => theme(props).iconBackground};
  border-radius: 1.5rem;
  color: ${props => theme(props).iconColor};
  display: flex;
  height: ${props => theme(props).iconHeight};
  justify-content: center;
  opacity: 0;
  padding: 0.5rem;
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  transition: opacity 100ms ease-in-out;
  width: ${props => theme(props).iconWidth};
`;

export const ProductCard = styled('div')`
  background-color: ${props => theme(props).background};
  position: relative;
  box-shadow: ${props => theme(props).boxShadow};

  & > .productcard-link:hover {
    ${Media}:after {
      content: '';
      position: absolute;
      inset: 0;
      background-color: ${props => transparentize(props.theme.colors.link.hover, 0.8)};
      mix-blend-mode: multiply;
    }
    ${Title} {
      color: ${props => props.theme.colors.link.hover};
    }
  }

  & > .productcard-link {
    color: ${props => props.theme.colors.text.primary};

    display: grid;
    grid-template-rows: min-content 1fr;

    cursor: pointer;
    height: 100%;
    text-decoration: none;
    width: 100%;

    padding: 1rem 0.0625rem;
    ${props => media.greaterThan(props, 'small').then(css`
      padding:0;
    `)}

    &:hover,
    &:focus,
    &:focus-within {
      ${Bag} {
        opacity: 1;
      }
    }
  }
`;

export const Content = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 0;

  ${props => media.greaterThan(props, 'small').then(css`
    padding: ${props.theme.spacing.stack.s4} 0 0 0;
  `)}
`;

export const Body = styled('div')`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
`;

export const Description = styled('p')`
  color: ${props => theme(props).textColor};
  margin-bottom: ${props => theme(props).textMarginBottom};
  overflow: hidden;
`;

export const Price = styled('div')`
  color: ${props => theme(props).priceColor};
  font: ${props => theme(props).priceFont};
  margin: 0.5rem 0;

  > span > div { margin-left: 0.5rem; display: inline; }
  > span > div:first-of-type { margin-left: 0; }
`;

export const MonthlyPrice = styled.p`
  color: ${props => theme(props).textColor};
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  margin: 0.75rem 0 0;
`;

export const Subscription = styled('p')`
`;

export const Rating = styled('div')`
`;

export const AvailabilitySection = styled('div')`
  margin: ${props => theme(props).availabilityMargin};
  margin-top: auto;
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
