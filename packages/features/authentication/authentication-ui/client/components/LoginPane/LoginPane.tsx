/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { Row, Column, Button } from '@exo/frontend-components-base';
import { ArrowRight, CaretRight } from '@carbon/react/icons';
import { LoginForm } from '@exo/frontend-components-forms';
import { LoginPaneContainerRenderProps } from '@exo/frontend-features-authentication-logic';
import { useIntl } from '@exo/frontend-common-i18n';
import * as S from './LoginPane.styles';

// eslint-disable-next-line react/prop-types
export const LoginPane = ({ isLoggedIn, onLogin, onLogout, onRegister, error }: Props) => {
  const intl = useIntl('features.authentication.authentication-ui.components.LoginPane');

  if (isLoggedIn) {
    return (
      <S.LoginPanePresentation>
        <S.Field>
          <Button onClick={onLogout} label={intl.msg('logout', 'Log out')} />
        </S.Field>
      </S.LoginPanePresentation>
    );
  }

  return (
    <S.LoginPanePresentation>
      <Row>
        {/* TODO: We should fix this className */}
        <Column className="col1" sm={'100%'} md={'50%'}>
          <S.Field>
            <h4>{intl.msg('title', 'Do you already have an account?')}</h4>
          </S.Field>

          <LoginForm
            error={error}
            intlPrefix="features.authentication.authentication-ui.components.LoginPane.form"
            onSubmit={({ username, password }) => onLogin(username, password)}
          >
            <S.LinkField>
              <Button
                label={intl.msg('form.forgotPassword', 'Forgot your password')}
                variant="link"
                icon={<ArrowRight size={16} />}
                onClick={() => {}}
              />
            </S.LinkField>
          </LoginForm>
        </Column>

        <Column className="col2" sm={'100%'} md={'50%'}>
          <S.Field>
            <h4>Create an account?</h4>
          </S.Field>
          <S.RegisterTitle>You need to create an account to proceed to checkout</S.RegisterTitle>
          <S.TextField>
            <CaretRight size={32} />
            <S.Text> You&apos;ll be able to see your order and its status.</S.Text>
          </S.TextField>
          <S.TextField>
            <CaretRight size={32} />
            <S.Text> You&apos;ll have access to your order history.</S.Text>
          </S.TextField>
          <S.ButtonField>
            <CaretRight size={32} />
            <S.Text> You&apos;ll be able to see your saved configurations.</S.Text>
          </S.ButtonField>
          {onRegister && (
            <S.Field>
              <Button
                variant="secondary"
                data-testid="profile-LoginPresentation-register-button"
                onClick={onRegister}
                label="Register"
              />
            </S.Field>
          )}
        </Column>
      </Row>
    </S.LoginPanePresentation>
  );
};

type Props = LoginPaneContainerRenderProps & { onRegister: () => void };
