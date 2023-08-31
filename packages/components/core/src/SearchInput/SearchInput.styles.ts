/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

import theme from './SearchInput.theme';

export const SearchInput = styled('div')<{ visibleSearch?: boolean }>`
  display: none;

  ${props => media.greaterThan(props, 'small').then(css`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    position: relative;
    width: ${props.visibleSearch ? '25rem' : '3rem'};

    & .cds--search {
      transition: width 0.5s, padding 0.7s;
      visibility: ${props.visibleSearch ? 'visible' : 'hidden'};;
      width: ${props.visibleSearch ? '25rem' : '0'};

      & .cds--search-input {
        padding: ${props.visibleSearch ? '0 2.5rem' : 0};
      }
    }

    & .icon {
      color: ${theme(props).iconColor};
      fill: currentColor;
    }
  `)}
`;
