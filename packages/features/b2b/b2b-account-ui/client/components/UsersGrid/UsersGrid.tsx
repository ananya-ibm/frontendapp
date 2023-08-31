/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved
US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { OrganizationContainerRenderProps } from '@exo/frontend-features-b2b-account-logic';
import { Button, Card, CardSection, CardTitle } from '@exo/frontend-components-base';
import { UserAddition } from './UserAddition/UserAddition';
import * as S from './UsersGrid.styles';

export const UsersGrid = ({ organization, onAddUser }: OrganizationContainerRenderProps) => {
  const [addVisible, setAddVisible] = useState(false);

  const userDetails = organization.members.map(member => ({
    id: member.id,
    name: `${member.firstName} ${member.lastName}`,
    details: [member.email, member.companyName]
  }));

  const handleAddAction = () => {
    setAddVisible(true);
  };
  const addUser = async (user: any) => {
    await onAddUser(organization.id, [{ id: user.userId }]);
    setAddVisible(false);
  };
  const handleEditUser = userId => {
    // eslint-disable-next-line no-console
    console.log('editing: ', userId);
  };

  if (addVisible) {
    return (
      <S.UsersAdd>
        <UserAddition handleCancel={() => setAddVisible(false)} onAdd={addUser} />
      </S.UsersAdd>
    );
  }

  return (
    <div>
      {userDetails.map(cc => (
        <React.Fragment key={cc.id}>
          <Card>
            <CardTitle
              primaryAction={{
                label: 'Edit',
                onClick: () => handleEditUser(cc.id)
              }}
            >
              {cc.name}
            </CardTitle>
            <CardSection>
              {cc.details?.map(d => (
                <div key={d}>{d}</div>
              ))}
            </CardSection>
          </Card>
          <LayoutSpacing size="sm" />
        </React.Fragment>
      ))}
      <LayoutSpacing size="sm" />
      <div style={{ float: 'right' }}>
        <Button
          variant="secondary"
          label="Add New"
          size="field"
          onClick={() => handleAddAction()}
        />
      </div>
    </div>
  );
};
