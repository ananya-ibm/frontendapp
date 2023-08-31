/*
 Licensed Materials - Property of IBM
 694906H
 (c) Copyright IBM Corp.  2020 All Rights Reserved

 US Government Users Restricted Rights - Use, duplication or disclosure restricted
 by GSA ADP Schedule Contract with IBM Corp.
 */

import { gql, useMutation } from '@apollo/client';

export const useOIDC = () => {
  const [authRequestAuthorizationUrl] = useMutation(gql`
    mutation RequestAuthorizationUrl($callbackUri: String, $flow: AutAuthenticationFlowType) {
      authRequestAuthorizationUrl(callbackUri: $callbackUri, flow: $flow)
    }
  `);
  const [authCallback] = useMutation(gql`
    mutation Callback(
      $code: String
      $state: String
      $accessToken: String
      $idToken: String
      $idClaims: [AutIdClaim]
    ) {
      authCallback(
        code: $code
        state: $state
        accessToken: $accessToken
        idToken: $idToken
        idClaims: $idClaims
      ) {
        token
        wasSuccessful
        errorMessage
      }
    }
  `);

  return {
    requestAuthorizationUrl: (callbackUri, flow) => {
      return authRequestAuthorizationUrl({
        variables: { callbackUri, flow }
      });
    },

    callback: (code, state, accessToken?, idToken?, idClaims?) => {
      return authCallback({
        variables: { code, state, accessToken, idToken, idClaims }
      });
    }
  };
};
