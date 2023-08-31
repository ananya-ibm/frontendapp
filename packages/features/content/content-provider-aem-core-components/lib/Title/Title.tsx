/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/require-default-props, import/no-named-as-default, react/boolean-prop-naming */

import React from 'react';

export const Title = ({ type = 'h1', text }: Props) => {
  return <div>{React.createElement(type, {}, text)}</div>;
};

type Props = {
  text: string;
  linkURL?: string;
  linkDisabled: boolean;
  type?: string;
};
