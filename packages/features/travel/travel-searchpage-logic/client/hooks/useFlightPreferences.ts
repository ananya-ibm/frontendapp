/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useLazyQuery, gql } from '@apollo/client';
import { handleApolloError } from '@exo/frontend-common-apollo';
import { useSessionContext } from '@exo/frontend-common-session-context';

const GetUserPreferencesQuery = gql`
  query GetUserPreferences($email: String!) {
    userPreferences(email: $email) {
      userId
      # userPersonalData {
      #   firstName
      #   lastName
      #   avatar
      #   birthdate
      # }
      # userContactData {
      #   email
      #   mobile
      #   mailingAddress
      # }
      # userRank {
      #   churnRisk
      #   customerPriority
      # }
      preference {
        preferenceKey
        preferenceValue
      }
      # lastUpdatedAt
    }
  }
`;

const parsePreferences = (preferences: Preferences) => {
  const newPreferences: any = {};
  preferences.userPreferences[0].preference.forEach((p: Preference) => {
    newPreferences[p.preferenceKey] = p.preferenceValue;
  });
  return newPreferences;
};

export const useFlightPreferences = () => {
  const session = useSessionContext();
  const [getFlightPreferences, { called, loading, data, error }] = useLazyQuery(
    GetUserPreferencesQuery,
    {
      // eslint-disable-next-line no-console
      onError: e => console.log('getFlightPreferences Error!', e),
      onCompleted: preferences => {
        if (!session.flightPreferences) // avoids infinite page re-rendering
          session.set({ ...session, flightPreferences: parsePreferences(preferences) });
      }
    }
  );

  handleApolloError(__filename, error);

  return { getFlightPreferences, loading, data, called, error };
};

type Preference = {
  preferenceKey: string;
  preferenceValue: string;
};
type Preferences = {
  userPreferences: {
    preference: Preference[];
  }[];
};
