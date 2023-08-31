/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Notifications = styled('div')`
  align-items: flex-end;
  display: flex;
  flex-direction: column;

  & .notification-entry {
    animation: ${props => props.theme.motion.entry.fast};
    margin-bottom: 0;
    position: relative;
  }
`;

export const Notification = styled('div')<{ fadeDelay: number }>`
`;
