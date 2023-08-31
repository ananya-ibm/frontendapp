/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Schemas } from './Schemas';

type Props = React.ComponentProps<typeof Schemas>;

export default {
  title: 'Features/Devops/Components/Schemas',
  component: Schemas
};

export const Default = (args: Props) => <Schemas {...args} />;
Default.args = {
  data: Array.from({ length : 10 }).map(() => ({
    adapters: Array.from({ length : 1 }).map (() => ({
      id: "@exo/adapter-flight-search-amadeus",
      name: "amadeus",
      shortname: "amadeus"
    })),
    description: "Flight Search",
    feature: "travel/aviation",
    id: "@exo/adapter-flight-search-schema",
    name: "aviation",
    path: "travel/aviation/flight-search"
    })),
  facets: Array.from({ length : 10 }).map(() => ({
    code: "string",
    name: "string",
    multiSelect: true,
    type: "string",
    entries: Array.from({ length : 10 }).map(() => ({
      label: "string",
      count: 2,
      code: "string",
      state: "string",
      type: 'select'
    }))
  })),
  selectedFacets: Array.from({ length : 10 }).map(() => ({
    code: "string",
    label: "string",
    facet: {
      code: "string",
      name: "string"
    }
  }))
} as Props;
