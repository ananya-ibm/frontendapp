/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { PathUtils } from '@adobe/aem-spa-page-model-manager';
import { useLayoutEffect, useState } from 'react';

declare global {
  interface Window {
    Granite?: {
      author?: {
        MessageChannel?: any;
      };
    };
  }
}

const isInEditMode = () => PathUtils.isBrowser() && !!window?.Granite?.author?.MessageChannel;

export const useAuthorPanelSwitch = (path: string) => {
  const [indexFromAuthorPanel, setIndexFromAuthorPanel] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (!isInEditMode()) return;

    const callback = (message: any) => {
      if (message.data?.id !== path || message.data?.operation !== 'navigate') return;

      const index = message.data.index as number;
      setIndexFromAuthorPanel(index);
    };

    const messageChannel = new window.Granite!.author!.MessageChannel!('cqauthor', window);
    messageChannel.subscribeRequestMessage('cmp.panelcontainer', callback);

    // eslint-disable-next-line consistent-return
    return () => {
      messageChannel.unsubscribeRequestMessage('cmp.panelcontainer', callback);
    };
  }, []);

  if (!isInEditMode()) return undefined;

  return indexFromAuthorPanel;
};
