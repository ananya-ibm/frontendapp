/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { DevMenu } from '@exo/frontend-features-dev-toolbar-ui';
import styled, { keyframes } from 'styled-components';

const breatheAnimation = keyframes`
  0%   {transform: scale(.8);}

  80% {transform: scale(1.5);}

  100% {transform: scale(1);}
`;

export const Resources = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
  margin-left: 0.3rem;
  margin-right: 0.5rem;
`;

export const Resource = styled.div`
  position: relative;
`;

export const Count = styled.div`
  animation-duration: 0.4s;

  animation-name: ${breatheAnimation};
  background-color: green;
  border-radius: 100%;
  color: white;
  font-size: 70%;
  min-width: 0.8rem;
  padding: 0.1rem;
  position: absolute;
  right: -0.7rem;
  text-align: center;
  top: -0.4rem;
`;

export const Table = styled('table')`
  margin-left: 1rem;

  /* stylelint-disable selector-max-type */
  & td,
  & th {
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    text-align: right;
  }

  & td:first-of-type,
  & th:first-of-type {
    padding-left: 0;
    text-align: left;
  }

  & th {
    font-weight: bold;
  }
`;

export const FullDevMenu = styled(DevMenu)`
  left: 0;
  transform: none;
  width: 100%;
`;
