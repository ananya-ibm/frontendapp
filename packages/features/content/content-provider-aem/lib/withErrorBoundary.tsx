/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading, react/forbid-foreign-prop-types */
/* eslint-disable react/prop-types, react/prefer-stateless-function */

import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AemComponentErrorHandler } from './AemComponentErrorHandler';

export const withErrorBoundary = (name, BaseComponent) => {
  return class extends React.Component {
    render() {
      return (
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <AemComponentErrorHandler error={error} componentName={name} />
          )}
        >
          <BaseComponent {...this.props} />
        </ErrorBoundary>
      );
    }
  };
};
