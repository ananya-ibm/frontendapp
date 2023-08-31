/* eslint-disable no-unused-vars */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import Joyride, { Step } from 'react-joyride';
import { Tooltip } from '../Tooltip/Tooltip';

export const Tutorial = ({ steps, isEnabled }: Props) => {
  return (
    <Joyride run={isEnabled} steps={steps} tooltipComponent={Tooltip} disableScrolling={true} />
  );
};

type Props = {
  isEnabled?: boolean;
  steps: Step[];
};
