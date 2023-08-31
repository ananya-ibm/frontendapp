/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { responsiveFontBlock, ifProp } from '@exo/frontend-common-style-utils';
import theme from './Tile.theme';

export const Media = styled('div')<{ isActive?: boolean }>`
  flex: 0 0 6.75rem;
  height: 6.75rem;
  position: relative;
  transition: box-shadow 100ms ease-in-out;

  &:hover {
    box-shadow: 0.125rem 0.125rem 1rem ${props => theme(props).hoverShadow},
      -0.125rem -0.125rem 0.5rem ${props => theme(props).hoverShadow};
  }

  ${props => ifProp(props, 'isActive').then(css`
    box-shadow: 0.125rem 0.125rem 1rem ${theme(props).hoverShadow},
      -0.125rem -0.125rem 0.5rem ${theme(props).hoverShadow};

    & svg {
      position: absolute;
      right: -0.5rem;
      top: -0.5rem;
    }
  `)}
`;

export const Image = styled('div')<{ image?: string }>`
  background: url(${props => props.image}) no-repeat top center;
  background-size: contain;
  height: 100%;
  width: 100%;
`;

export const Content = styled('div')`
  flex: 0 0 50%;
  padding-left: 0.75rem;
`;

export const Description = styled('p')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  margin: 0.75rem 0 0;
`;

export const Price = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M, { weight: 700 })};
`;

export const Title = styled('h3')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
`;

export const Tile = styled('div')<{ isSmall?: boolean }>`
  color: ${props => theme(props).color};
  display: flex;
  width: 100%;

  ${props => ifProp(props, 'isSmall').then(css`
    flex-direction: column;
    max-width: 3.75rem;

    ${Media} {
      flex: 0 0 auto;
      height: 3.75rem;
    }

    ${Content} {
      margin: 1rem 0 0;
      padding-left: 0;
    }

    ${Title},
    ${Price},
    ${Description} {
      ${responsiveFontBlock(props.theme.typography.body.short.M, { size: '65%' })};
    }
  `)}
`;
