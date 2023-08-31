/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LoginForm } from '@exo/frontend-components-forms';
import { LoginPaneContainerRenderProps } from '@exo/frontend-features-authentication-logic';
import * as S from './LoginPanel.styles';

export const LoginPanel = ({ onLogin, error }: LoginPaneContainerRenderProps) => {
  return (
    <S.Panel>
      <S.PanelTop>
        <S.PanelTitle>Log in</S.PanelTitle>
      </S.PanelTop>
      <S.PanelContent>
        <LoginForm
          error={error}
          intlPrefix="features.authentication.authentication-ui.components.LoginPane.form"
          onSubmit={({ username, password }) => onLogin(username, password)}
        />
      </S.PanelContent>
    </S.Panel>
  );
};
