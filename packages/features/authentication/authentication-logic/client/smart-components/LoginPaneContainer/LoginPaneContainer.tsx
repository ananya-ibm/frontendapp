/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ReactElement } from 'react';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useCallbackAndCaptureError } from '@exo/frontend-common-utils';
import { useAuthentication } from '../../hooks/useAuthentication';

export const LoginPaneContainer = ({ render, onLoggedIn }: Props) => {
  const session = useSessionContext();
  const authentication = useAuthentication();

  const [loginFn, { error }] = useCallbackAndCaptureError(
    (errorHandler) => async (username: string, password: string) => {
      try {
        await authentication.authenticate(username, password);
        onLoggedIn();
      } catch (e) {
        errorHandler.stopPropagation(e);
        errorHandler.setError(`Unknown username / password`);
      }
    },
    []
  );

  const logoutFn = authentication.logout;

  return render({
    isLoggedIn: session?.type === 'USER',
    loggedInAs: session?.username,
    onLogin: loginFn,
    onLogout: logoutFn,
    error: error?.toString() ?? undefined
  });
};

type Props = {
  onLoggedIn: () => void;
  render: (args: LoginPaneContainerRenderProps) => ReactElement | null;
};

export type LoginPaneContainerRenderProps = {
  isLoggedIn: boolean;
  loggedInAs?: string;
  error?: string;
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
};
