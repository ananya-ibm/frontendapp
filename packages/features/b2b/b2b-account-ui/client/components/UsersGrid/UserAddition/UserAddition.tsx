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

import React from 'react';
import { DynamicForm } from '@exo/frontend-components-forms';

export const UserAddition = ({ handleCancel, onAdd }) => {
  return (
    <DynamicForm
      onSubmit={onAdd}
      onCancel={handleCancel}
      form={{
        footer: [
          { action: 'cancel', label: 'Cancel', presentation: { view: 'secondary' } },
          { action: 'submit', label: 'Add' }
        ],
        fields: [
          {
            type: 'group',
            label: 'Add a User to this organization',
            helpText: 'Please add an already exisiting user to the organization',
            presentation: { view: 'group' },
            fields: [
              {
                type: 'input',
                id: 'userId',
                label: 'Existing User ID',
                presentation: {
                  placeholder: '0001'
                },
                validations: [{ type: 'required', message: 'This field is required' }]
              }
            ]
          }
        ]
      }}
    />
  );
};
