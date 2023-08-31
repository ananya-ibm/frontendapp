/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { useEffect, useState } from 'react';

export const useRedirect = () => {
  const [redirect, setRedirect] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!redirect) return;
    window.location.href = redirect!;
  }, [redirect]);

  return {
    isRedirecting: !!redirect,
    redirect: setRedirect
  };
};
