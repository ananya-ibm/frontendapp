/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';

export const Overlay = styled('div')<{ editMode?: boolean }>`
  ${props =>
    props.editMode
      ? css`
          outline: 0.188rem solid red;
          outline-offset: 0.5rem;
          padding-top: 1rem;
          position: relative;
        `
      : ''}
`;

export const OverlayLabel = styled('div')<{ editMode?: boolean }>`
  ${props =>
    props.editMode
      ? css`
          background-color: red;
          color: white;
          font-size: 75%;
          left: -0.5rem;
          padding: 0.25rem;
          position: absolute;
          top: -0.5rem;
        `
      : css`
          display: none;
        `}
`;
