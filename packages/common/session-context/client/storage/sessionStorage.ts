/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { isBefore } from 'date-fns';
import { storage } from './storage';

const SESSION_CONTEXT_KEY = 'sessionContext';

const ttlInSecs = 24 * 60 * 60;

const now = () => new Date();

export const sessionStorage = {
  get: (): EXOSession | undefined => {
    const s = storage.getItem(SESSION_CONTEXT_KEY);
    if (!s) return undefined;

    const entry = JSON.parse(s);
    if (!entry) return undefined;

    // TODO: We should remove this
    if (entry.expire && isBefore(new Date(entry.expire), now())) {
      localStorage.removeItem(SESSION_CONTEXT_KEY);
      return undefined;
    }

    return entry as EXOSession;
  },

  set: (session: EXOSession) => {
    const ttlSession = {
      ...session,
      expire: now().getTime() + ttlInSecs * 1000
    };
    storage.setItem(SESSION_CONTEXT_KEY, JSON.stringify(ttlSession));
  }
};
