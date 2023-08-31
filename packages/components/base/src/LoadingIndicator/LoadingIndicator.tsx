/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Loading, InlineLoading } from '@carbon/react';

export const LoadingIndicator = ({ label, type = 'fullscreen', className }: Props) => {
  if (type === 'fullscreen') {
    return <Loading withOverlay className={className} />;
  } else {
    return <InlineLoading description={label} className={className} />;
  }
};

type Props = {
  type?: 'fullscreen' | 'inline';
  label?: string;
  className?: string;
};
