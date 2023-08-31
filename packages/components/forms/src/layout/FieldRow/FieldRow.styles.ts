/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './FieldRow.theme';
import * as FieldS from '../Field/Field.styles';

export const FieldRow = styled('div')`
  display: flex;
  margin-bottom: ${props => theme(props).margin};

  & > .field-wrapper {                
    flex-basis: 100%;
    margin-left: ${props => theme(props).margin};
  }

  & > .field-wrapper:first-child {    
    margin-left: 0;
  }

  ${FieldS.Field} {
    margin-bottom: 0;
  }

  ${props => media.lessThan(props, 'medium').then(css`
    flex-direction: column;

    & > .field-wrapper {
      margin-left: 0;
      margin-top: ${theme(props).margin};
    }

    & > .field-wrapper:first-child {
      margin-top: 0;
    }
  `)}
`;
