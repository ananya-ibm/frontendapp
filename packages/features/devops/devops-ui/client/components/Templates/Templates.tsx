/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Templates.styles';
import { TemplatesContainerRenderProps } from '@exo/frontend-features-devops-logic';
import { Grid, Column, Row } from '@exo/frontend-components-base';

export const Templates = ({ data }: Props) => {
  return (
    <>
      <Grid>
        <S.PageTitle>App Catalog</S.PageTitle>
        <S.PageDescription>
          <p>Below you can find a list of pre-configured deployment templates that can be used to deploy EXO demo or test environments.</p>
          <p>Select a template to learn more and spin up a new environment.</p>
        </S.PageDescription>
        <Row>
        {data.map(entry => (
          <Column sm={16} md={4} lg={4} xl={3} key={entry.id}>
            <S.TemplateTile href={"/devops/catalog/" + entry.id}>
              <S.Name>
                {entry.name}
              </S.Name>
              <S.Description>
                {entry.description}
              </S.Description>
              <S.Keywords>
                {entry.keywords}
              </S.Keywords>
            </S.TemplateTile>
          </Column>
        ))}
        </Row>
      </Grid>
    </>
  );
};

type Props = TemplatesContainerRenderProps & {
  // TODO: Add any additional props
};
