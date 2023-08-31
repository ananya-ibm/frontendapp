/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useAppShellContext } from '@exo/frontend-common-app-shell';
import { useEffect } from 'react';

const SCRIPT_ID = 'cai-webchat';

export const SapConversationalAssistanceLoader = () => {
  const appShellContext = useAppShellContext();

  if (!appShellContext.featureConfig.sapConversationalAssitant) {
    throw new Error('Missing configuration for sapConversationalAssitant');
  }

  const {
    token,
    channelId,
    apiRoot,
    scriptSrc
  } = appShellContext.featureConfig.sapConversationalAssitant;

  useEffect(() => {
    const scripts = document.head.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i += 1) {
      const s = scripts.item(i)!;
      if (s.id === SCRIPT_ID) return;
    }

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.setAttribute('token', token);
    script.setAttribute('channelId', channelId);
    script.setAttribute('apiRoot', apiRoot);
    script.id = SCRIPT_ID;

    document.head.appendChild(script);
  });

  return null;
};
