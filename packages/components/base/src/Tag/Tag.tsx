/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Tag as CarbonTag, TagSkeleton } from '@carbon/react';

export const Tag = ({ label, onClick, variant, className }: Props) => {
  return (
    <CarbonTag
      /* @ts-ignore */
      filter={!!onClick}
      type={variant === 'black-and-white' ? 'gray' : 'blue'}
      onClick={onClick}
      className={className}
    >
      {label}
    </CarbonTag>
  );
};

Tag.Skeleton = () => {
  return <TagSkeleton />;
};

type Props = {
  label: string;
  variant?: 'default' | 'black-and-white';
  onClick?: () => void;
  className?: string;
};
