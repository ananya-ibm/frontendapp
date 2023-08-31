/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';

const GQL_ADD = gql`
  mutation gqlAdd($partnumber: String!, $text: String!, $name: String!, $rating: Int!) {
    reviewCreate(input: { partnumber: $partnumber, text:$text, name:$name, rating:$rating}) {
        id
        text
        name
        rating 
    }
  }
`;

export const useProductReviewModification = () => {
  const session = useSessionContext();

  const [reviewCreate] = useMutation(GQL_ADD);
  
  return {
    add: async (partnumber: string, text: string, name: string, rating: number) => {
      await session.get();
      return reviewCreate({ variables: { partnumber, text, name, rating } });
    }
  };
};
