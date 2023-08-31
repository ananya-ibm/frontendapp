/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ifProp } from '@exo/frontend-common-style-utils';
import theme from './CategoryCard.theme';

export const CategoryCard = styled('div')<{ isImageRight?: boolean }>`
  align-items: center;
  background-color: ${props => theme(props).background};
  justify-content: center;
  ${props => ifProp(props, 'isImageRight').then(css`
    & .col1 {
      order: 2;
    }

    & .col2 {
      order: 1;
    }
  `)}
  padding-bottom: 1rem;
  text-align: center;

  &:hover {
    box-shadow: 0.125rem 0.125rem 1rem ${props => theme(props).hoverShadow},
      -0.125rem -0.125rem 1rem ${props => theme(props).hoverShadow};
  }

  & .category-image {
    display: flex;
    flex-direction: row;
  }
`;

export const Media = styled('div')`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 2.5rem;

  & .imgSize {
    max-height: 20rem;
    max-width: 26.25rem;
  }
`;

export const Content = styled('div')`
  font-size: 1rem;
  line-height: 1.5rem;
  margin-top: 2rem;
`;

export const ContentPanel = styled('div')`
  margin: 2rem 1rem 1rem 2rem;
  text-align: left;
`;

export const Title = styled('h3')`
  font-weight: 700;
  text-align: left;

  &:after {
    background: ${props => theme(props).primaryColor};
    content: '';
    display: block;
    height: 0.1rem;
    margin-top: 0.5rem;
    width: 10rem;
  }
`;

export const Amount = styled('p')`
  font-weight: 700;
  margin-top: 2rem;
`;

export const Buttons = styled('div')`
  margin-top: 2rem;
`;

export const Button1Padding = styled('div')`
  padding-left: 0rem;
`;

export const Button2Padding = styled('div')`
  padding-right: 0rem;
`;
