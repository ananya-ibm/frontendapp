/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication';
import { AuthenticationMode } from '../../model/types';

export const LogoutButtonContainer = ({ authenticationMode = 'simple', render }: Props) => {
  const { logout } = useAuthentication();
  const history = useHistory();

  if (authenticationMode === 'simple') {
    return render({
      onLogout: () => {
        logout();
        history.push('/');
      }
    });
  } else {
    return render({
      onLogout: () => {
        logout();
        history.push('/');
      }
    });
  }
};

type Props = {
  authenticationMode?: AuthenticationMode;
  render: (args: LogoutButtonContainerRenderProps) => ReactElement | null;
};

export type LogoutButtonContainerRenderProps = {
  onLogout?: () => Promise<void> | void;
};
