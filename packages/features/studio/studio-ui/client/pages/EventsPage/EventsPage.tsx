/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { EventListDataContainer } from '@exo/frontend-features-studio-logic';
import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { CrudView } from '../../components/CrudView/CrudView';
import { DynamicFormDefinition } from '@exo/frontend-components-forms';

const form: DynamicFormDefinition = {
  fields: [
    {
      type: 'input',
      id: 'id',
      label: 'ID',
      presentation: {
        view: 'text'
      },
      validations: [{ type: 'required', message: 'Required' }]
    },
    {
      type: 'input',
      id: 'lastUpdated',
      label: 'Last Updated',
      presentation: {
        view: 'text'
      },
      validations: [{ type: 'required', message: 'Required' }]
    },
    {
      type: 'input',
      id: 'domain',
      label: 'Domain',
      presentation: {
        view: 'text'
      },
      validations: [{ type: 'required', message: 'Required' }]
    },
    {
      type: 'input',
      id: 'event',
      label: 'Event',
      presentation: {
        view: 'text'
      },
      validations: [{ type: 'required', message: 'Required' }]
    },
    {
      type: 'input',
      id: 'origin',
      label: 'Origin',
      presentation: {
        view: 'text'
      },
      validations: [{ type: 'required', message: 'Required' }]
    },
    {
      type: 'textarea',
      id: 'message',
      label: 'Message',
      presentation: {
        view: 'json'
      },
      validations: [{ type: 'required', message: 'Required' }]
    },
    {
      type: 'textarea',
      id: 'payload',
      label: 'Payload',
      presentation: {
        view: 'json'
      },
      validations: [{ type: 'required', message: 'Required' }]
    }
  ]
}

const formatData = (d: any) => {
  return {
    id: d.id,
    lastUpdated: d.lastUpdated,
    domain: d.payload.domain,
    event: d.payload.event,
    origin: d.payload.metadata.origin,
    message: JSON.stringify(d.payload.message, undefined, '  '),
    payload: JSON.stringify(d.payload, undefined, '  ')
  }
}

const EMPTY = [];

export const EventsPage = ({}: Props) => {
  const headerData = [
    { label: 'ID', id: 'id' },
    { label: 'Last Updated', id: 'lastUpdated', defaultInclude: true },
    { label: 'Domain', id: 'payload.domain', defaultInclude: true },
    { label: 'Event', id: 'payload.event', defaultInclude: true },
    { label: 'Origin', id: 'payload.metadata.origin', defaultInclude: true }
  ];

  return (
    <div>
      <h1>Event Management</h1>

      <LayoutSpacing size="sm" />

      <EventListDataContainer
        renderLoading={() => <CrudView data={EMPTY} isLoading columns={headerData} />}
        render={(props) => (
          <CrudView
            columns={headerData}
            form={form}
            canView
            onLoad={(id) => formatData(props.data.find((d) => d.id === id))}
            {...props}
          />
        )}
      />
    </div>
  );
}

type Props = {}
