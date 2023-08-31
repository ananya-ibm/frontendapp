/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Button, Card, CardSection, CardTitle, Dropdown } from '@exo/frontend-components-base';
import { DotMark } from '@carbon/react/icons';
import { format, formatDistance, isToday } from 'date-fns';
import { MessagesContainerRenderProps } from '@exo/frontend-features-automotive-account-logic';
import { LayoutSpacing } from '@exo/frontend-components-core';
import * as S from './Messages.styles';

const MessageItem = ({ message: { isUnread, title, from, timestamp } }: Props) => {
  const msgDate = new Date(timestamp);
  return (
    <>
      <S.MessageItem>
        <S.NewSymbol>{isUnread && <DotMark size={16} />}</S.NewSymbol>
        <div>
          <div className="highlighted-row">{title}</div>
          <div className="sender">From {from}</div>
        </div>
        <div>
          <div className="date">
            {isToday(msgDate)
              ? format(msgDate, 'hh:mm a')
              : `${formatDistance(msgDate, new Date(2021, 9, 24))} ago`}
          </div>
          <div>
            <Button variant="link" label="View message" onClick={() => {}} />
          </div>
        </div>
      </S.MessageItem>
    </>
  );
};

type Props = {
  message: {
    id?: string;
    title?: string;
    from?: string;
    timestamp: string;
    isUnread?: boolean;
  };
};

// TODO: C11 Add layer
export const Messages = ({ messages, messageTypes }: MessagesContainerRenderProps) => {
  return (
    <S.Messages>
      <Card>
        <CardTitle>Messages(communications)</CardTitle>
        <CardSection>
          <Dropdown id="messages" labelText="All Messages" items={messageTypes} />
          <LayoutSpacing size="xs" />
          {messages.map(message => (
            <MessageItem key={message.id} message={message} />
          ))}
        </CardSection>
      </Card>
    </S.Messages>
  );
};
