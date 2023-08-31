/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Tab, Tabs } from '@exo/frontend-components-base';
import React, { useState } from 'react';
import * as S from './EntityPage.styles';
import { DataPanel } from './panels/DataPanel';
import { SchemaPanel } from './panels/SchemaPanel';

export const EntityPage = ({ entity }: Props) => {
  const [selectedTabs, setSelectedTabs] = useState(['data']);
  return (
    <div>
      <h1>{entity}</h1>

      <S.TabSection>
        <Tabs>
          <Tab id="data" label="Data" onClick={() => setSelectedTabs((old) => [...old, 'data'])}>
            {selectedTabs.includes('data') && (
              <DataPanel entity={entity} />
            )}
          </Tab>

          <Tab
            id="schema"
            label="Schema"
            onClick={() => setSelectedTabs((old) => [...old, 'schema'])}
          >
            {selectedTabs.includes('schema') && (
              <SchemaPanel entity={entity} />
            )}
          </Tab>

          <Tab id="rules" label="Rules" onClick={() => setSelectedTabs((old) => [...old, 'rules'])}>
            Not implemented yet
          </Tab>

          <Tab
            id="rules"
            label="Settings"
            onClick={() => setSelectedTabs((old) => [...old, 'settings'])}
          >
            Not implemented yet
          </Tab>
        </Tabs>
      </S.TabSection>
    </div>
  );
};

type Props = {
  entity: string;
};
