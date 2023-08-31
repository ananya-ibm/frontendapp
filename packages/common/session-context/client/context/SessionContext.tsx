/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useMutation, useQuery, gql } from '@apollo/client';
import { useTimeout } from '@exo/frontend-common-hooks';
import React, { useContext, useState } from 'react';
import { sessionStorage } from '../storage/sessionStorage';

export const SessionContext = React.createContext<SessionContextType | undefined>(undefined);

type UserType = 'NONE' | 'GUEST' | 'USER' | string;

declare global {
  interface EXOSession {
    token?: string;
    tokenExpiryTime?: number;
    type?: UserType;
    roles: string[];
    firstName?: string;
    lastName?: string;
    email?: string;
    storeName?: string;
    storeId?: string;
    storeDistance?: string;
    country?: string;
    language?: string;
    username?: string;
    currency?: string;
  }
}

export type SessionContextType = EXOSession & {
  set: (newData: Partial<EXOSession>) => void;
  get: () => Promise<string | undefined>;
  replace: (newData: EXOSession) => Promise<void>;
};

declare global {
  interface Window {
    Cypress?: any;
    sessionContext?: EXOSession;
  }
}

export const useSessionContext = () => {
  const session = useContext(SessionContext);
  console.assert(!!session, 'No session found');
  return session!;
};

const initialState = () => sessionStorage.get();

type AuthGuestResponse = { authGuest: { token: string } };
type MeResponse = {
  me: {
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
  };
};

export const SessionContextProvider = ({
  children,
  state,
  isGuest = false,
  onTokenExpiration = () => {}
}: Props) => {
  const [context, setContext] = useState<EXOSession>(
    state ??
      initialState() ?? {
        roles: []
      }
  );

  const set = (newContext: EXOSession) => {
    setContext(newContext);
    sessionStorage.set(newContext);
  };

  const time = context?.tokenExpiryTime ? context?.tokenExpiryTime - new Date().getTime() : 0;
  useTimeout(() => {
    // TODO: We should add some kind of refresh mechanism here
    onTokenExpiration(context);
    set({ roles: [] });
  }, time);

  const [guesttoken] = useMutation<AuthGuestResponse>(gql`
    mutation Auth {
      authGuest {
        token
      }
    }
  `);

  const { data } = useQuery<MeResponse>(
    gql`
      query Me {
        me {
          id
          email
          firstName
          lastName
          roles
        }
      }
    `,
    {
      onCompleted: () => {
        if (!data) return;

        const newContext = {
          ...context,
          roles: data?.me?.roles ?? [],
          email: data?.me?.email,
          firstName: data?.me?.firstName,
          lastName: data?.me?.lastName
        };
        setContext(newContext);
        sessionStorage.set(newContext);
      },

      // Only fetch if no TYPE or no roles
      skip: !context.type || context.type === 'NONE' || context?.roles?.length > 0
    }
  );

  // Ensure session context is not nested
  const sessionContext = useContext(SessionContext);
  if (sessionContext && !state) {
    return children;
  }

  const acquireGuesttoken = async () => {
    const { token } = (await guesttoken()).data!.authGuest;
    set({ ...context, type: 'GUEST' as UserType, token, roles: ['guest'] });
    return token;
  };

  const value = {
    ...context,

    get: (): Promise<string | undefined> => {
      if (context.token) return Promise.resolve(context.token);
      if (isGuest) return acquireGuesttoken();
      return Promise.resolve(undefined);
    },

    set: (attrs: Partial<EXOSession>) => {
      set({ ...context, ...attrs });
    },

    replace: async (newAttrs?: EXOSession) => {
      const newContext = newAttrs ?? {
        type: 'NONE',
        roles: []
      };

      set(newContext);
    }
  };

  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.Cypress) {
    window.sessionContext = value;
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

type Props = {
  isGuest?: boolean;
  children: any;
  state?: EXOSession;
  onTokenExpiration?: (session: EXOSession) => void;
};
