/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved
US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/require-default-props, import/no-named-as-default */

import { TextBlock } from '@exo/frontend-components-base';
import React from 'react';

export const Text = ({ text }: Props) => {
  return (
    <TextBlock>
      <div className="cw" data-rte-editelement dangerouslySetInnerHTML={{ __html: text }} />
    </TextBlock>
  );
};

type Props = {
  text: string;
};
