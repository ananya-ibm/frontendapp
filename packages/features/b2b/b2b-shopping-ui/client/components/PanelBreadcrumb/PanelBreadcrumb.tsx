/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { CategoryBreadcrumbContainerRenderProps } from '@exo/frontend-features-catalog-logic';
import { SidePanel } from '@exo/frontend-components-core';
import { Table, TableHeaderRow, TableHeader } from '@exo/frontend-components-base';
import { Link as ReactLink } from '@exo/frontend-common-link';
import * as S from './PanelBreadcrumb.styles';

export const PanelBreadcrumb = ({ path, title }: Props) => {
  return (
    <SidePanel.Section>
      <Table>
        <TableHeaderRow>
          <TableHeader>
            {!path && title}
            {path && (
              <S.Breadcrumb>
                <S.BreadcrumbEntry>
                  <ReactLink to="/shop">Home</ReactLink>
                </S.BreadcrumbEntry>
                {path.length > 1 && (
                  <S.BreadcrumbEntry>
                    <ReactLink to={path[path.length - 2].url}>...</ReactLink>
                  </S.BreadcrumbEntry>
                )}
                {path.length > 0 && (
                  <S.BreadcrumbEntry>
                    <ReactLink to={path[path.length - 1].url}>
                      {path[path.length - 1].label}
                    </ReactLink>
                  </S.BreadcrumbEntry>
                )}
              </S.Breadcrumb>
            )}
          </TableHeader>
        </TableHeaderRow>
      </Table>
    </SidePanel.Section>
  );
};

type Props = Partial<CategoryBreadcrumbContainerRenderProps> & {
  title?: string;
};
