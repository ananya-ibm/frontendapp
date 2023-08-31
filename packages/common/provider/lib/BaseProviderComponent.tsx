/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-underscore-dangle */

import { useContext } from 'react';

export function BaseProviderComponent<P>(
  props: P & { children?: any; _name: string; _context: React.Context<any> }
) {
  const providerContext = useContext(props._context);

  if (!providerContext) {
    return <>{props.children}</>;
  }

  const Implementation = providerContext.components[props._name];

  if (!Implementation) {
    return <>{props.children}</>;
  }

  return <Implementation {...props}>{props.children}</Implementation>;
}
