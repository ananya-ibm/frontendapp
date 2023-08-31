/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { InlineNotification, ToastNotification, ActionableNotification } from '@carbon/react';

export const Notification = ({
  id,
  title,
  subtitle,
  description,
  type,
  display,
  onClose,
  isClosable=true,
  className,
  actionButtonLabel,
  onActionButtonClick
}: Props) => {
  if (display === 'floating') {
    return (
      <ToastNotification
        id={id}
        title={title}
        subtitle={subtitle}
        caption={description}
        onCloseButtonClick={onClose}
        kind={type}
        className={className}
        hideCloseButton={!isClosable}
      />
    );
  } else if (display === 'action') {
    return (
      <ActionableNotification
        id={id}
        title={title}
        subtitle={subtitle}
        caption={description}
        onCloseButtonClick={onClose}
        inline={false}
        kind={type}
        className={className}
        hideCloseButton={!isClosable}
        actionButtonLabel={actionButtonLabel}
        onActionButtonClick={onActionButtonClick}
      />
    );
  } else {
    return (
      <InlineNotification
        id={id}
        title={title}
        subtitle={subtitle}
        onCloseButtonClick={onClose}
        kind={type ?? 'info'}
        className={className}
        hideCloseButton={!isClosable}
      />
    );
  }
};

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  type?: 'error' | 'warning' | 'info' | 'success';
  display?: 'inline' | 'floating' | 'action';
  isClosable?: boolean;
  onClose?: () => void;
  className?: string;
  onActionButtonClick?: () => void;
  actionButtonLabel?: string;
};
