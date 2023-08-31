/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SmartComponentProps } from '@exo/frontend-common-utils';
import { useSessionContext } from '@exo/frontend-common-session-context';
import React, { useEffect } from 'react';
import { NotificationType, useNotificationContext } from '@exo/frontend-common-notification';

declare global {
  interface Window {
    // TODO: See TODO later in file - we should really remove this
    user?: any;
  }
}

const ChromeContainerInner = function<C>({ render, config, cmsConfig }: Props<C>) {
  const { getNotifications, removeNotification } = useNotificationContext()!;
  const session = useSessionContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.user = {
        email: session?.email,
        fName: session?.firstName,
        lName: session?.lastName,
        isCSR: false // Not currently possible to detect this, so assuming everyone is a customer
      };
    }
    document.dispatchEvent(new Event('added-user-to-window'));
  }, [session?.email, session?.firstName, session?.lastName]);

  return render({
    config,
    notifications: getNotifications(),
    styleLinks: cmsConfig?.scripts?.map(s => s.uri) ?? [],
    onRemoveNotification: removeNotification
  });
};

export const ChromeContainer = function<C>({ render, config, cmsConfig }: Props<C>) {
  return <ChromeContainerInner render={render} config={config} cmsConfig={cmsConfig} />;
};

type Props<C> = SmartComponentProps<{
  config: C;
  cmsConfig?: any;
  render: (props: ChromeContainerRenderProps<C>) => JSX.Element;
}>;

export type ChromeContainerRenderProps<C> = {
  notifications?: NotificationType[];
  config: C;
  styleLinks: string[];
  onRemoveNotification: (id: string) => void;
};
