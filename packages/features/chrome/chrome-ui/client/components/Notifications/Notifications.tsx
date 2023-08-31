/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { NotificationType } from '@exo/frontend-common-notification';
import { Notification } from '@exo/frontend-components-base';
import * as S from './Notifications.styles';
import { useErrorHandler } from 'react-error-boundary';

export const Notifications = ({ notifications = [], onRemove }: Props) => {
  const handleError = useErrorHandler();
  const fadeDelay = 5000;
  const fadeOutItems = notifications.filter(i => i.close !== 'manual');

  setTimeout(() => fadeOutItems.map(i => onRemove(i.id)), fadeDelay);

  return (
    <S.Notifications className="notifications">
      {notifications &&
        notifications.map(notification => (
          <S.Notification
            key={notification.id}
            fadeDelay={fadeDelay}
            className="notification"
          >
            <Notification
              id={notification.id}
              display={notification.action ? 'action' : notification.kind === 'error' ? 'floating' : 'inline'}
              type={notification.kind || 'info'}
              title={notification.title}
              subtitle={notification.subtitle}
              description={notification.description}
              actionButtonLabel={notification.action}
              onActionButtonClick={notification.onActionButtonClick ?? (() => handleError(notification.exception))}
              className="notification-entry"
            />
          </S.Notification>
        ))}
    </S.Notifications>
  );
};

type Props = {
  notifications?: NotificationType[];
  onRemove: (id: string) => void;
};
