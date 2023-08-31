/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { User } from '@carbon/react/icons';
import { useIntl } from '@exo/frontend-common-i18n';
import * as S from './ProfileLink.styles';
  
export const ProfileLink = ({ userName, link }: Props) => {
const intl=useIntl('features.chrome.chrome-ui.smart-components.Header'); 
  return (
    <S.ProfileLink to={link}>
      <S.Icon>
        <User size={32} className="icon" />
      </S.Icon>
     <S.Name>{userName || intl.msg('profilelink.signin', 'Sign In')}</S.Name>
    </S.ProfileLink>
  );
};

type Props = {
  userName?: string;
  link: string;
};