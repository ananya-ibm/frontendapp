/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { media } from '@exo/frontend-common-style-utils';
import { Column } from '@exo/frontend-components-base';
import styled, { css } from 'styled-components';

export const ConfirmationPageHead = styled('div')`
  display: flex;
  gap: 0.25rem;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const AddressColumn = styled(Column)`
  min-width: 15rem;
  margin-bottom: 1rem;
`;

export const ColumnHideOnMobile = styled(Column)`
  display: none;
  ${props => media.greaterThan(props, 'medium').then(css`
    display: block;
  `)}
`;

export const ShowOnMobile = styled.span`
  display: inline;
  ${props => media.greaterThan(props, 'medium').then(css`
    display: none;
  `)}
`;

export const OrderID = styled.p`
  margin-bottom: 2rem;
  b { font-weight: 600; }
`;

export const Subtitle = styled.p`
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const Thumbnail = styled.img`
  width: 2rem;
  height: 2rem;
  border: 1px solid #dedede;
`;

export const UnitPrice = styled.p`
  text-align: right;
  color: ${props => props.theme.colors.text.secondary};
`;

export const Caption = styled.p``;
export const Name = styled.p``;
export const Partnumber = styled.p``;

export const TitleAndThumbnail = styled.div`
  display: flex;
  gap: 1rem;
`;