/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './OrderDetails.theme';
import { ImageTile } from '../ImageTile/ImageTile';

export const OrderDetails = styled('div')`
  padding: ${props => theme(props).padding};

  & .color {
    padding-left: 0;
    padding-right: 0;
  }

  & .orderNumber {
    padding-left: ${props => theme(props).margin};
  }

  & .description {
    margin-top: ${props => theme(props).marginSmall};
  }

  & .priceTotal {
    padding-top: ${props => theme(props).marginExtraLarge};
  }

  & .priceRow {
    padding-left: ${props => theme(props).marginExtraLarge};
  }
`;

export const Heading = styled('h3')`
  font-weight: 700;
`;

export const SubHeading = styled('h4')`
  font-weight: 700;
`;

export const Field = styled('div')`
  margin-top: ${props => theme(props).marginMedium};
`;

export const BoldText = styled('div')`
  font-weight: 700;
`;

export const OrderHeader = styled('div')`
  background-color: ${props => props.theme.colors.backgrounds.panels.primary.base};
  border: 0.1rem solid ${props => props.theme.colors.backgrounds.panels.primary.base};
  border-bottom: 0.1rem solid ${props => theme(props).border};
  margin-top: ${props => theme(props).marginMedium};
  padding: ${props => theme(props).marginLarge} ${props => theme(props).marginMedium};
`;

export const Text = styled('div')`
  font-size: 0.8rem;
  line-height: 1.4;
`;

export const OrderBody = styled('div')`
  border: 0.1rem solid ${props => theme(props).border};
  border-top: none;
  padding: ${props => theme(props).marginMedium};
`;

export const Thumbnail = styled(ImageTile)`
  max-width: 100%;
`;
