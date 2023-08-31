/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Row as CarbonRow } from '@carbon/react';

export const Row = ({ children, className }: Props) => {
  return <CarbonRow className={className}>{children}</CarbonRow>;
};

type Props = {
  children: any;
  className?: string;
};
