/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useRedirect } from '@exo/frontend-common-hooks';

export const QRScanner = () => {
  const sessionContext = useSessionContext();
  const accountPath = '/account/account';
  const { redirect } = useRedirect();

  useEffect(() => {
    localStorage.removeItem('sessionContext');
  }, []);

  return (
    <>
      <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={(result, error) => {
          if (!!result) {
            // @ts-ignore
            let formattedData = JSON.parse(String(result));
            sessionContext.set(formattedData);

            if(formattedData) {
              redirect(accountPath);
            }
          }

          if (!!error) {
            console.info(error);
          }
        }}
      />
    </>
  );
};

export default QRScanner;
