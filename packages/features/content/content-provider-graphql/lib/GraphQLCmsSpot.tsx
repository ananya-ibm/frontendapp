/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { DocumentNode, gql } from '@apollo/client';
import { CmsProviders } from '@exo/frontend-content-api-types';
import { useCmsContext } from '@exo/frontend-content-api';
import { useCmsSpot } from './useCmsSpot';
import { useContainerContext } from './GraphQLCmsContainer';
import { instantiateComponents } from './instantiateComponents';

type CmsSpotType = NonNullable<CmsProviders['CmsSpot']> & { fragment: DocumentNode };

// eslint-disable-next-line react/prop-types
export const GraphQLCmsSpot: CmsSpotType = ({ name, spec, render }) => {
  const location = useLocation();
  const cmsContext = useCmsContext();
  const { containerName } = useContainerContext();

  const { called, loading, data } = useCmsSpot(
    {
      url: location.pathname,
      specs: spec,
      containerName,
      name
    },
    GraphQLCmsSpot.fragment
  );

  if (!called || loading) return render!(<div>Loading...</div>);

  if (!data || data.length === 0) return <></>;

  return render(
    <>
      {data.map((c, idx) =>
        instantiateComponents(
          c,
          `${containerName} ${name} ${idx}`,
          cmsContext?.configuration?.components
        )
      )}
    </>
  );
};

GraphQLCmsSpot.fragment = gql`
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
