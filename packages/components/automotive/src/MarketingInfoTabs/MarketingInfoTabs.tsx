/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Tabs, Tab } from '@exo/frontend-components-base';
import { Car, Tools, Headset } from '@carbon/react/icons';
import { Link as ReactLink } from '@exo/frontend-common-link';
import * as S from './MarketingInfoTabs.styles';

const isSimpleTab = (t: TabElement): t is SimpleTab => (t as SimpleTab).description !== undefined;

export const MarketingInfoTabs = ({ tabs }: Props) => {
  return (
    <S.MarketingInfoTabs>
      <Tabs>
        {tabs &&
          tabs.map(tab => (
            <Tab id={tab.title!} label={tab.title!} key={tab.title}>
              {isSimpleTab(tab) ? (
                <S.ImageTemplate>
                  <div>
                    <S.Title>{tab.title}</S.Title>
                    <S.Desc>{tab.description}</S.Desc>
                  </div>
                  <S.Image src={tab.image} />
                </S.ImageTemplate>
              ) : (
                <div>
                  <S.Title>{tab.title}</S.Title>
                  <S.ThreeColTemplate>
                    <S.Column>
                      <Car size={32} />
                      <S.Subtitle>{tab.left.subtitle}</S.Subtitle>
                      <S.ShortDesc>{tab.left.description}</S.ShortDesc>
                      <ReactLink href="/">Find out more</ReactLink>
                    </S.Column>
                    <S.Column>
                      <Tools size={32} />
                      <S.Subtitle>{tab.middle.subtitle}</S.Subtitle>
                      <S.ShortDesc>{tab.middle.description}</S.ShortDesc>
                      <ReactLink href="/">Find out more</ReactLink>
                    </S.Column>
                    <S.Column>
                      <Headset size={32} />
                      <S.Subtitle>{tab.right.subtitle}</S.Subtitle>
                      <S.ShortDesc>{tab.right.description}</S.ShortDesc>
                      <ReactLink href="/">Find out more</ReactLink>
                    </S.Column>
                  </S.ThreeColTemplate>
                </div>
              )}
            </Tab>
          ))}
      </Tabs>
    </S.MarketingInfoTabs>
  );
};

type SimpleTab = { title?: string; description: string; image?: string };
type ComplexTab = {
  title?: string;
  left: {
    subtitle: string;
    description?: string;
  };
  middle: {
    subtitle: string;
    description?: string;
  };
  right: {
    subtitle: string;
    description?: string;
  };
};

type TabElement = SimpleTab | ComplexTab;

type Props = {
  tabs: TabElement[];
};
