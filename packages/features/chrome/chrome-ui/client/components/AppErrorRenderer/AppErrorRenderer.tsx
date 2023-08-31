/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useNotificationContext } from '@exo/frontend-common-notification';
import React from 'react';

export const AppErrorRenderer = ({ error, resetErrorBoundary }: Props) => {
  const notificationContext = useNotificationContext();
  notificationContext?.clearErrors();

  return (
    <div id="errorMessage" style={{ padding: '1rem', backgroundColor: 'white', color: 'black' }}>
      <p style={{ marginBottom: '0.5rem' }}>
        Unfortunately an error occured. Please raise a github issue if this occurs frequently
      </p>
      <p style={{ marginBottom: '0.5rem' }}>{error.message}</p>

      {process.env.NODE_ENV === 'development' && (
        <>
          <pre style={{ padding: '0.5rem', backgroundColor: '#eeeeee', fontSize: '90%', marginBottom: '1rem', fontFamily: 'monospace' }}>
            {error.stack}
          </pre>

          <pre style={{ padding: '0.5rem', backgroundColor: '#eeeeee', fontSize: '90%', marginBottom: '1rem', fontFamily: 'monospace' }}>
            {JSON.stringify(error, undefined, '  ')}
          </pre>

          <button style={{ padding: '0.25rem 0.5rem' }} onClick={resetErrorBoundary} type="button">
            Try again
          </button>

          <button style={{ padding: '0.25rem 0.5rem', marginLeft: '0.25rem' }} onClick={() => {
            var copyText = document.getElementById("errorMessage");
            // @ts-ignore
            navigator.clipboard.writeText(copyText.innerText);
          }} type="button">
            Copy error message
          </button>
        </>
      )}

    </div>
  );
};

type Props = {
  error: any;
  resetErrorBoundary: () => void;
};
