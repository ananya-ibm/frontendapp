/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

// eslint-disable-next-line node/no-restricted-import
import styled from 'styled-components';

export const SkeletonLine = styled.div<{ inverted?: boolean }>`
  width: 5.5em;
  border-radius: 5px;

  &::before {
    content: '\\00a0';
  }

  animation: pulse 1.2s ease-in-out infinite;
  background: ${props =>
    props.inverted
      ? 'linear-gradient(-90deg, #e0e0e0 0%, #e8e8e8 50%, #e0e0e0 100%)'
      : 'linear-gradient(-90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%)'};

  background-size: 400% 400%;
  display: inline-block;
  height: 100%;

  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }

    100% {
      background-position: -135% 0%;
    }
  }
`;
