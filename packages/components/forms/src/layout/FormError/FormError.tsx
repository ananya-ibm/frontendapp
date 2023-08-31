/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Notification } from '@exo/frontend-components-base';

export const FormError = ({ type = 'error', titleText, children }: Props) => {
  return <Notification title={titleText ?? ''} isClosable={false} subtitle={children} type={type} display="inline" />;
};

type Props = {
  children: any;
  type?: 'error' | 'warning';
  titleText: string;
};
