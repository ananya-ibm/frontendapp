/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { EntityNavigationContainer } from '@exo/frontend-features-studio-logic';
import { Card, CardFoldableSection, CardSection, CardTitle } from '@exo/frontend-components-base';
import * as S from './StudioHomepage.styles';
import { Link } from '@exo/frontend-common-link';

const ITEMS_TO_SHOW = 5;

export const StudioHomepage = ({}: Props) => {
  return (
    <div>
      <h1>Data Management</h1>

      <S.Panel isStyled>
        <EntityNavigationContainer
          render={({ entities }) => {
            return (
              <>
                {Object.keys(entities).map((grp) => (
                  <S.Entry key={grp}>
                    <Card>
                      <CardTitle>{grp[0].toUpperCase() + grp.slice(1)}</CardTitle>
                      <CardSection>
                        <ul>
                          {entities[grp].slice(0, ITEMS_TO_SHOW).map(e => (
                            <li key={e.type}><Link href={`/studio/data/entities/${e.type}`}>{e.name}</Link></li>
                          ))}
                        </ul>
                      </CardSection>
                      {entities[grp].length > ITEMS_TO_SHOW && (
                        <CardFoldableSection>
                          <CardSection>
                            <ul>
                              {entities[grp].slice(ITEMS_TO_SHOW).map(e => (
                                <li key={e.type}><Link href={`/studio/data/entities/${e.type}`}>{e.name}</Link></li>
                              ))}
                            </ul>
                          </CardSection>
                        </CardFoldableSection>
                      )}
                    </Card>
                  </S.Entry>
                ))}
              </>
            );
          }}
        />
      </S.Panel>
    </div>
  );
};

type Props = {};
