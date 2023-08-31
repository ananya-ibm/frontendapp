/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Row = styled('div')`
  align-items: flex-end;
  display: flex;
`;

export const DropdownWrapper = styled.div`
  margin-right: ${props => props.theme.spacing.inline.s2};

  /* stylelint-disable-next-line selector-max-type */
  .cds--list-box__menu {
    width: 300%;
  }
`;
