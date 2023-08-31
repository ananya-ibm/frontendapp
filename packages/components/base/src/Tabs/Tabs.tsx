/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Tab as CarbonTab, Tabs as CarbonTabs, TabList, TabPanels, TabPanel } from '@carbon/react';
import SkeletonLine from '../SkeletonLine/SkeletonLine';

type TabChild = React.ReactElement<any, typeof Tab> | undefined | boolean;

export const Tabs = ({
  children,
  className,
  selected
}: {
  children: TabChild | TabChild[];
  className?: string;
  selected?: number;
}) => {
  if (Array.isArray(children) && children.length === 0) return <></>;

  // TODO: Hanle aria-label 
  return (
    <CarbonTabs selected={selected} className={className}>
      <TabList aria-label="Tabs">
        {React.Children.map(children, (c) =>
          c && typeof c === 'object' ? <CarbonTab onClick={c.props.onClick}>{c.props.label}</CarbonTab> : c
        )}
      </TabList>
      <TabPanels>
        {React.Children.map(children, (c) =>
          c && typeof c === 'object' ? React.cloneElement(c.type(c.props), { key: c.key }) : c
        )}
      </TabPanels>
    </CarbonTabs>
  );
};

Tabs.Skeleton = () => {
  return (
    <CarbonTabs>
      <TabList aria-label="Tabs">
        <CarbonTab id="loading-1"><SkeletonLine /></CarbonTab>
        <CarbonTab id="loading-2"><SkeletonLine /></CarbonTab>
        <CarbonTab id="loading-3"><SkeletonLine /></CarbonTab>
      </TabList>
    </CarbonTabs>
  );
};

export const Tab = ({ children, id, className }: Props) => {
  return (
    <TabPanel id={id} className={className}>
      {children}
    </TabPanel>
  );
};

type Props = {
  children: any | any[];
  id: string;
  label: string | React.ReactElement;
  onClick?: () => void;
  className?: string;
};
