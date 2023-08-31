/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Schema } from './Schema';
import { SchemaContainerRenderProps } from '@exo/frontend-features-devops-logic';

export default {
  title: 'Features/Devops/Components/Schema',
  component: Schema
};

export const Default = (args: SchemaContainerRenderProps) => <Schema {...args} />;
Default.args = {
  data: {
    id: '@exo/graphql-weather-schema',
    name: 'forecast',
    description: 'Weather',
    feature: 'weather',
    path: 'weather/forecast',
    adapters: Array.from({ length: 1 }).map(() => ({
      name: 'twc'
    })),
    schemas: Array.from({ length: 2 }).map(() => ({
      queryType: Array.from({ length: 1 }).map(() => ({
        fields: Array.from({ length: 1 }).map(() => ({
          args: Array.from({ length: 1 }).map(() => ({
            name: 'numberOfDays',
            defaultValue: '',
            description: ''
          })),
          description: '',
          name: 'weatherDailyForecast'
        })),
        type: Array.from({ length: 1 }).map(() => ({
          kind: 'LIST',
          ofType: Array.from({ length: 1 }).map(() => ({
            name: 'ForecastDay'
          })),
          name: ''
        }))
      }))
    }))
  }
};