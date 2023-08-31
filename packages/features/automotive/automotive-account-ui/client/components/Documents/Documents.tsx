/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Card, CardTitle, CardSection, Button, Tabs, Tab } from '@exo/frontend-components-base';
import { TrashCan, View } from '@carbon/react/icons';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { DocumentsContainerRenderProps } from '@exo/frontend-features-automotive-account-logic';
import * as S from './Documents.styles';

const DocumentCard = ({ name, expiry }: CardProps) => {
  return (
    <div>
      <Card>
        <CardTitle
          primaryAction={{
            label: 'View document',
            icon: <View size={16} />,
            onClick: () => {}
          }}
          secondaryActions={[
            {
              label: 'Delete',
              icon: <TrashCan size={16} />,
              onClick: () => {}
            }
          ]}
        >
          {name}
        </CardTitle>
        <CardSection>{expiry}</CardSection>
      </Card>

      <LayoutSpacing size="xs" />
    </div>
  );
};

export const Documents = ({ activeDocuments, expiredDocuments }: DocumentsContainerRenderProps) => {
  return (
    <S.Documents>
      <LayoutSpacing size="sm" />
      <Tabs>
        <Tab id="active" label="Active">
          <S.RightButton>
            <Button label="Upload Document" onClick={() => {}} />
          </S.RightButton>
          <LayoutSpacing size="xs" />
          {activeDocuments?.map(itemA => (
            <DocumentCard key={itemA.id} name={itemA.name} expiry={itemA.expiry} />
          ))}
        </Tab>
        <Tab id="expire" label="Expire">
          <S.RightButton>
            <Button label="Expire Document" onClick={() => {}} />
          </S.RightButton>
          <LayoutSpacing size="xs" />
          {expiredDocuments?.map(itemE => (
            <DocumentCard key={itemE.id} name={itemE.name} expiry={itemE.expiry} />
          ))}
        </Tab>
      </Tabs>
    </S.Documents>
  );
};

type CardProps = {
  id?: string;
  name?: string;
  expiry?: string;
};
