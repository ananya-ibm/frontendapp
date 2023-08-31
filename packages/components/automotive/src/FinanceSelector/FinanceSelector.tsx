/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import * as S from './FinanceSelector.styles';

export const FinanceSelector = ({ tabs, tabId, onTabClick }: Props) => {
  const [activeTabId, setActiveTab] = useState(tabId || tabs[0].id);

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const onClick = e => {
    setActiveTab(e.target.id);
    if (onTabClick) onTabClick(e.target.id);
  };
  return (
    <S.FinanceSelector>
      <S.Tabs>
        {tabs &&
          tabs.map(tab => (
            <S.Tab isActive={activeTabId === tab.id} id={tab.id} key={tab.id} onClick={onClick}>
              {tab.label}
            </S.Tab>
          ))}
      </S.Tabs>
      <S.Content>{activeTab?.content}</S.Content>
    </S.FinanceSelector>
  );
};

type Props = {
  tabs: {
    label: string;
    id: string;
    content: string | React.ReactElement;
  }[];
  tabId?: string;
  onTabClick?: (id: string) => void;
};
