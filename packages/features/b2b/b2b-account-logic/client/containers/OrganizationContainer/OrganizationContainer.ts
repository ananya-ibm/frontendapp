/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useOrganization } from '../../hooks/useOrganization';

export const OrganizationContainer = ({
  id,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { loading, error, data } = useOrganization<any>({ id }, OrganizationContainer.fragment);

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({ organization: data?.organization, onAddUser: async () => {} });
};

type Props = SmartComponentProps<{
  id: string;
  render: (props: OrganizationContainerRenderProps) => JSX.Element;
}>;

export type OrganizationContainerRenderProps = {
  organization?: any;
  onAddUser: (orgId: string, user: any) => Promise<void>;
};

OrganizationContainer.fragment = gql`
  fragment OrganizationContainer on OrgOrganization {
    id
    name
    members {
      id
      firstName
      lastName
      email
      companyName
    }
  }
`;
