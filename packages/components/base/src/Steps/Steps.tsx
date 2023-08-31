/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import {
  ProgressIndicator,
  ProgressIndicatorSkeleton,
  ProgressStep
} from '@carbon/react';

export const Steps = ({
  current = 0,
  variant = 'default',
  onChange,
  className,
  children
}: StepsProps) => {
  return (
    <ProgressIndicator
      currentIndex={current-1}
      spaceEqually={variant === 'full-width'}
      onChange={onChange}
      className={className}
    >
      {React.Children.map(children, (c) => React.cloneElement(c.type(c.props), { key: c.key }))}
    </ProgressIndicator>
  );
};

type StepsProps = {
  current?: number;
  children: React.ReactElement<any, typeof Step>[];
  variant?: 'default' | 'full-width';
  className?: string;
  onChange?: (index: number) => void;
};

export const Step = ({ title, description, isDisabled, className }: StepProps) => {
  return (
    <ProgressStep
      label={title}
      secondaryLabel={description}
      disabled={isDisabled}
      className={className}
    />
  );
};

type StepProps = {
  title: string;
  description?: string;
  isDisabled?: boolean;
  className?: string;
};

Steps.Skeleton = () => <ProgressIndicatorSkeleton />;
