/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Link as ReactLink } from '@exo/frontend-common-link';

export const Action = (props: Props) => {
  const className = `action${props.isActive ? ' action--active' : ''} ${props.className ?? ''}`;
  if (props.href) {
    return (
      <ReactLink aria-label={props.label ?? props.name} className={`${className} ${props.icon ? 'has-icon' : ''}`} href={props.href} onClick={props.onClick}>
        {props.label}
        {props.icon && <div role="img">{props.icon}</div>}
      </ReactLink>
    );
  } else {
    return (
      <button aria-label={props.label ?? props.name} className={`${className} ${props.icon ? 'has-icon' : ''}`} onClick={props.onClick}>
        {props.label}
        {props.icon && <div role="img">{props.icon}</div>}
      </button>
    );
  }
};

type Props = {
  name?: string;
  label?: string;
  icon?: React.ReactElement;
  href?: string;
  isActive?: boolean;
  onClick?: (e?: any) => void;
  className?: string;
};
