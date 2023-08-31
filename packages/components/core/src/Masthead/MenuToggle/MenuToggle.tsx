/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Menu } from '@carbon/react/icons';
import { Action } from '@exo/frontend-components-base';
import React, { useState } from 'react';

export const MenuToggle = ({ render }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Action
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        icon={<Menu size={20} />}
        name="Toggle"
      />
      {render(isOpen, () => {
        setIsOpen(false);
      })}
    </>
  );
};

type Props = {
  render: (isOpen: boolean, onClose: () => void) => React.ReactElement;
};
