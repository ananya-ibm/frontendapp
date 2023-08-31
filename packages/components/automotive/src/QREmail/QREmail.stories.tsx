/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { QREmail } from './QREmail';

export default {
  title: 'Components/Core/QREmail',
  component: QREmail
};

export const normal = args => <QREmail {...args} />;
normal.args = {};
