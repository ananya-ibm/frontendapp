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

export const DepartmentSelector = styled('div')`
  display: flex;
  flex-direction: column;
  ${props =>
    media.greaterThan(props, 'medium').then(css`
      flex-direction: row;
      height: 30rem;
    `)}
`;

export const Department = styled(ReactLink)<{ bgImg: string }>`
  align-items: center;
  background-image: ${props => `url(${props.bgImg})`};
  background-position: center;
  background-size: cover;
  display: block;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;

  & .department-title {
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    color: ${props => props.theme.colors.inverse.base.fg};
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &:hover,
  &:focus {
    & .department-title {
      opacity: 1;
    }
  }
`;
