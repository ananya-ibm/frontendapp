/* eslint-disable no-unused-vars */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-restricted-globals */
import React, { useEffect, ComponentType } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useAppShellContext } from '../../context/AppShellContext';
import { getConfigForPath } from '../../utils/applicationConfigHelper';

type Location = ReturnType<typeof useLocation>;

const ExternalAppRedirect = ({ url }: { url: string }) => {
  const { pathname } = useLocation();
  const dest = url + pathname;
  useEffect(() => {
    window.location.href = dest;
  });
  return <div />;
};

const MissingWrapper = ({
  missing: Missing
}: {
  missing?: ComponentType<{ location: Location }>;
}) => {
  const location = useLocation();
  return Missing ? <Missing location={location} /> : null;
};

export const useOriginalLocation = (): any => {
  return (useLocation() as any).originalLocation;
};

export const AppShellSwitch = ({
  children,
  prefix,
  activeBundle,
  otherBundles,
  missing: Missing
}: Props) => {
  const loc = useLocation();

  const applicationContext = useAppShellContext();
  const applications = getConfigForPath(applicationContext, activeBundle, otherBundles);

  // prefix must only have one / and it must be the first character
  if (prefix && prefix?.split('').filter(c => c === '/').length !== 1) {
    throw new Error(`prefix prop only supports top-level prefix, ${prefix}`);
  }

  const redirects = Object.entries(applications.redirects);
  const modulesInApp = Object.entries(applications.modulesInApp)
    .filter(([_, module]) => typeof module !== 'string')
    .filter(([path, _]) => !prefix || !path.startsWith(prefix));
  const externalModules = Object.entries(applications.externalModules);

  const newLocation = { originalLocation: loc, ...loc };

  let p = newLocation.pathname;

  const res = applicationContext.rewriteEngine.rewriteInbound(newLocation.pathname);
  p = res.rewrittenUrl.pathname;
  applicationContext.rewriteEngine.setVariables(res.variables);

  newLocation.pathname = p;

  return (
    <Switch location={newLocation}>
      {/* Redirects - exact path */}
      {redirects.map(([path, redirect]) => (
        <Route key={path} exact path={path}>
          <Redirect to={redirect} />
        </Route>
      ))}

      {/* Modules within app */}
      {modulesInApp.map(([path, Module]) => {
        return (
          <Route key={path} path={path} exact={path === '/'}>
            <Module config={applicationContext} />
          </Route>
        );
      })}

      {children}

      {/* External modules */}
      {externalModules.map(([path, module]) => (
        <Route key={path} path={path}>
          <ExternalAppRedirect url={module as string} />
        </Route>
      ))}

      <Route>
        <MissingWrapper missing={Missing!} />
      </Route>
    </Switch>
  );
};

type Props = {
  children: any;
  missing?: ComponentType<{ location: Location }>;
  prefix?: string;
  activeBundle?: string;
  otherBundles?: string[];
};
