/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SidePanel } from '../../SidePanel/SidePanel';
import * as S from './NavMobile.styles';

export const NavMobile = (props: Props) => {
  return (
    <SidePanel
      onClose={props.onClose}
      hasOverlay
      isClosable={false}
      isOpen={props.isOpen === undefined ? true : props.isOpen}
      size="s"
      title={''}
    >
      <S.Nav>
        <S.PrimaryActions>{props.actions}</S.PrimaryActions>
      </S.Nav>
    </SidePanel>
  );
};

type Props = {
  actions?: React.ReactElement;
  secondaryActions?: React.ReactElement;
  logo?: React.ReactElement;
  isOpen?: boolean;
  onClose?: () => void;
};
