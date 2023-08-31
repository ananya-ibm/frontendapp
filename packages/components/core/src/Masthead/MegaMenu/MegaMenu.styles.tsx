/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import { Link as ReactLink } from '@exo/frontend-common-link';
import theme from './MegaMenu.theme';

export const MegaMenu = styled('div')<{ visible?: boolean; top?: string }>`
  background-color: ${(props) => props.theme.colors.backgrounds.panels.primary.base};
  display: ${(props) => (props.visible ? 'block' : 'none')};
  left: 0;
  position: absolute;
  top: ${(props) => props.top ?? theme(props).top};
  width: 100%;
  z-index: 10;

  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      display: none;
    `)}
`;

export const SubCategory = styled('div')``;

export const SubSubCategoryList = styled('ul')`
  margin: 0 0 1rem 0;
`;

export const Thumbnail = styled('img')`
  background-color: white;
  border: 0.1rem solid #dedede;
  margin-bottom: 1rem;
  max-width: 100%;
`;

export const Content = styled('div')<{ count: number }>`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 25%);
  padding: 2rem;

  > ${SubCategory}:nth-child(1) {
    grid-row: 1 / 100;
  }
  > ${SubCategory}:nth-child(2) {
    grid-row: 1 / 100;
  }
  > ${SubCategory}:nth-child(3) {
    grid-row: 1 / 100;
  }
  ${(props) =>
    props.count === 4
      ? css`
          > ${SubCategory}:nth-child(4) {
            grid-row: 1 / 100;
          }
        `
      : css`
          > ${SubCategory}:nth-child(n + 4) {
            margin-bottom: 0.5rem;
            ${SubSubCategoryList}, ${Thumbnail} {
              display: none;
            }
          }
        `};
`;

export const SubSubCategoryListEntry = styled('li')`
  margin: 0.25rem 0;
`;

export const Title = styled('div')`
  font-weight: bold;
`;

export const SubCategoryLink = styled(ReactLink)`
  color: ${(props) => theme(props).linkColor};

  :hover {
    text-decoration: underline;
  }
`;
export const SubSubCategoryLink = styled(ReactLink)`
  color: ${(props) => theme(props).linkColor};

  :hover {
    text-decoration: underline;
  }
`;
