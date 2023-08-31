/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { subDays, subHours } from 'date-fns';
import { SmartComponentProps } from '@exo/frontend-common-utils';

const messages = [
  {
    id: '3',
    title: 'Finance Request Documentation Update No.3',
    from: 'Finance department',
    timestamp: subHours(new Date('1995-12-17T03:24:00'), 1).toISOString(),
    isUnread: true
  },
  {
    id: '2',
    title: 'Finance Request Documentation Update No.2',
    from: 'Finance department',
    timestamp: subDays(new Date('1995-12-19T03:27:00'), 1).toISOString(),
    isUnread: false
  },
  {
    id: '1',
    title: 'Finance Request Documentation Update No.1',
    from: 'Finance department',
    timestamp: subDays(new Date('1995-12-27T05:24:00'), 3).toISOString(),
    isUnread: false
  }
];

export const MessagesContainer = ({ render }: Props) => {
  const messageTypes = ['Unread Messages', 'Viewed Messages'];

  return render({
    messageTypes,
    messages
  });
};

export type MessagesContainerRenderProps = {
  messages: {
    id?: string;
    title?: string;
    from?: string;
    timestamp: string;
    isUnread?: boolean;
  }[];
  messageTypes: string[];
};

type Props = SmartComponentProps<{
  render: (props: MessagesContainerRenderProps) => JSX.Element;
}>;
