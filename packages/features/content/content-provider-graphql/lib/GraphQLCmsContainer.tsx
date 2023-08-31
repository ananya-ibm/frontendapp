/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { DocumentNode, gql } from '@apollo/client';
import { CmsProviders } from '@exo/frontend-content-api-types';
import { useCmsContext } from '@exo/frontend-content-api';
import { useCmsContainer } from './useCmsContainer';
import { instantiateComponents } from './instantiateComponents';

const GraphQLContainerContext = React.createContext<{ containerName: string }>({
  containerName: ''
});

export const useContainerContext = () => {
  return useContext(GraphQLContainerContext);
};

type CmsContainerType = NonNullable<CmsProviders['CmsContainer']> & { fragment: DocumentNode };

export const GraphQLCmsContainer: CmsContainerType = ({ name, spec, children }) => {
  const location = useLocation();
  const cmsContext = useCmsContext();
  const { called, loading, data } = useCmsContainer(
    {
      url: location.pathname,
      specs: spec,
      name
    },
    GraphQLCmsContainer.fragment
  );

  if (!called || loading) return <div>Loading...</div>;

  if (!data || data.length === 0) {
    return (
      <GraphQLContainerContext.Provider value={{ containerName: name }}>
        {children}
      </GraphQLContainerContext.Provider>
    );
  }

  return (
    <>
      {data.map((c, idx) =>
        instantiateComponents(c, `${name} ${idx}`, cmsContext?.configuration?.components)
      )}
    </>
  );
};

GraphQLCmsContainer.fragment = gql`
  fragment Components on CmsComponent {
    name
    props {
      key
      value
    }
    children {
      name
      props {
        key
        value
      }
      children {
        name
        props {
          key
          value
        }
        children {
          name
          props {
            key
            value
          }
        }
      }
    }
  }
`;
