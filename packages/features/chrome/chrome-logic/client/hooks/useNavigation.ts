/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';

const addNesting = (d: number) => {
  if (d == 0) {
    return ''; 
  } 

  return `
    children {
      __typename
      ... on NavContentNode {
        ...ContentNode
        ${addNesting(d - 1)}
      }
    }
  `
}

export const makeQuery = (d: number) => gql`
  query GetMenuItems($id: String!) {
    navRoot(id: $id) {
      ${addNesting(d)}
    }
  }

  fragment ContentNode on NavContentNode {
    __typename
    title
    thumbnail
    description
    type
    link {
      __typename
      label
      ... on NavCategoryLink {
        category {
          id
          identifier
          slug
        }
      }
      ... on NavUrlLink {
        url
      }
    }
  }
`;

export type NavContentNode = {
  __typename: string;
  title: string;
  thumbnail?: string;
  description?: string;
  type?: string;
  link: {
    __typename: string;
    label: string;
    url: string;
    category?: {
      id: string;
      identifier: string;
      slug: string;
    };
  };
  children?: NavContentNode[];
};

export const useNavigation = (id: string, depth=3) => {
  const { loading, error, data } = useQuery<{ navRoot: { children: NavContentNode[] } }>(
    makeQuery(depth),
    {
      variables: { id }
    }
  );

  return { loading, error, data };
};
