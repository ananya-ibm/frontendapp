/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Image = styled.img`
  height: 100%;
  max-width: 90%;
`;

export const Media = styled('div')`
  aspect-ratio: 1 / 1;
  border: solid 0.0625rem ${props => props.theme.colors.delimiters.lowContrast};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  overflow: hidden;
`;
