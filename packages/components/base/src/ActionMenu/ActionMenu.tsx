/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/require-default-props, import/no-named-as-default, react/boolean-prop-naming */

import React from 'react';
import {
  OverflowMenu as CarbonOverflowMenu,
  OverflowMenuItem as CarbonOverflowMenuItem
} from '@carbon/react';

export const ActionMenu = ({ icon, direction = 'right', className, children }: ActionMenuProps) => {
  const Icon = icon ? () => icon : undefined;
  // TODO: ariaLabel is mandatory - expose as prop
  return (
    <CarbonOverflowMenu ariaLabel="Actions" className={className} flipped={direction === 'left'} renderIcon={Icon}>
      {React.Children.map(children, (c) => 
        c && typeof c === 'object' ? React.cloneElement(c.type(c.props), { key: c.key }) : c
      )}
    </CarbonOverflowMenu>
  );
};

type ActionMenuProps = {
  children: any;
  icon?: JSX.Element;
  direction?: 'left' | 'right';
  className?: string;
};

export const ActionMenuItem = ({ label, disabled, onClick, className }: ActionMenuItemProps) => {
  return (
    <CarbonOverflowMenuItem
      itemText={label}
      disabled={disabled}
      onClick={onClick}
      className={className}
    />
  );
};

type ActionMenuItemProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};
