/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';
import { handleApolloError, State } from '@exo/frontend-common-apollo';

const transformResponse = <T>(data: any): T => {
  return data?.studioEntity;
};

export const useEntity = <T extends Entity>({ type }: Args): Result<T> => {
  const variables = { type };

  const { called, loading, data, error } = useQuery(
    gql`
      query ($type: String!) {
        studioEntity(type: $type) {
          name
          type
          group

          list {
            isRelayStyleConnection
            queryName
            returnType
          } 

          read {
            id {
              name
              type
            }
            queryName
            returnType
          } 

          create {
            input {
              name
              type
            }
            mutationName
          }

          update {
            id {
              name
              type
            }
            input {
              name
              type
            }
            mutationName
          }

          delete {
            id {
              name
              type
            }
            mutationName
          }

          attributes {
            ...Attributes
            subEntity {
              name
              attributes {
                ...Attributes

                subEntity {
                  name
                  attributes {
                    ...Attributes

                    subEntity {
                      name
                      attributes {
                        ...Attributes

                        subEntity {
                          name
                          attributes {
                            ...Attributes
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      fragment Attributes on StudioSchemaAttribute {
        name
        isList
        isMandatory
        isSynthetic
        isRelayStyleConnection
        scalarType
        type
        validValues
        relationTo {
          entityName
          typeName
          idField
        }
      }
    `,
    { variables }
  );

  handleApolloError(__filename, error);

  return { called, loading, data: transformResponse(data), error };
};

type Args = {
  type: string;
};

export type Entity = {
  name: string;
  group: string;
  type: string;

  list?: {
    isRelayStyleConnection: boolean;
    queryName: string;
    returnType: string;
  };

  read?: {
    id: {
      name: string;
      type: string;
    };
    queryName: string;
    returnType: string;
  };

  create?: {
    input: {
      name: string;
      type: string;
    };
    mutationName: string;
  };
  
  update?: {
    id: {
      name: string;
      type: string;
    };
    input: {
      name: string;
      type: string;
    };
    mutationName: string;
  };

  delete?: {
    mutationName: string;
    id: {
      name: string;
      type: string;
    };
  };

  attributes: (Attribute & SubEntityMixin)[];
}

type Attribute = {
  name: string;
  isList: boolean;
  isMandatory: boolean;
  isSynthetic: boolean;
  isRelayStyleConnection: boolean;
  scalarType: string;
  type: string;
  validValues: string[];
  relationTo: {
    entityName: string;
    typeName: string;
    idField: string;
  };
};

type SubEntityMixin = {
  subEntity?: {
    name: string;
    attributes: (Attribute & SubEntityMixin)[];
  };
};

type Result<T extends Entity> = {
  data?: T;
  called: boolean;
} & State;
