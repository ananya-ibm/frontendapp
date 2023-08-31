/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';

export const CustomFormField = styled('div')`
`;

export const Field = styled.div<{ hasError?: boolean }>`
  position: relative;
  ${props => props.hasError ? css`
    &&::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      outline: 2px solid var(--cds-support-error, #da1e28);
      outline-offset: -2px;
    }
  ` : ''}
`;

export const Label = styled.div.attrs(() => ({ className: 'cds--label' }))``;

export const Help = styled.div.attrs(() => ({ className: 'cds--form__helper-text' }))``;

export const Error = styled.div.attrs(() => ({ className: 'cds--form-requirement' }))`
  color: var(--cds-text-error, #da1e28);
  display: block;
  max-height: none;
`;
