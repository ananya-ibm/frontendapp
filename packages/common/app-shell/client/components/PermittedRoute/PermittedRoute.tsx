/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React, { ComponentType } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { isPermitted } from '../../permissions/isPermitted';

const NotAllowed = () => <div>Not allowed...</div>;

// TODO: Make the NotAllowed component configurable
export const PermittedRoute = ({ perform, path, component, render }: Props) => {
  const session = useSessionContext();
  const { roles } = session;

  if (render) {
    return isPermitted(perform, roles) ? (
      <Route path={path} render={render} />
    ) : (
      <Route path={path} component={NotAllowed} />
    );
  } else {
    return isPermitted(perform, roles) ? (
      <Route path={path} component={component} />
    ) : (
      <Route path={path} component={NotAllowed} />
    );
  }
};

type Props = {
  perform: string;
  path: string;
  component?: ComponentType;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
};
