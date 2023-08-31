/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { formatDate } from '@exo/frontend-common-i18n';
import { SmartComponentProps } from '@exo/frontend-common-utils';

const activeDocuments = [
  {
    id: '01',
    name: 'Document Name',
    expiry: `Expires: ${formatDate(new Date('2020-07-14T11:01:58.135Z').toString(), 'dd/MM/yyyy')}`
  },
  {
    id: '02',
    name: 'Document Name',
    expiry: `Expires: ${formatDate(new Date('2020-07-14T11:01:58.135Z').toString(), 'dd/MM/yyyy')}`
  }
];

const expiredDocuments = [
  {
    id: '01',
    name: 'Expired Document Name',
    expiry: `Expires: ${formatDate(new Date('2020-07-14T11:01:58.135Z').toString(), 'dd/MM/yyyy')}`
  },
  {
    id: '02',
    name: 'Expired Document Name',
    expiry: `Expires: ${formatDate(new Date('2020-07-14T11:01:58.135Z').toString(), 'dd/MM/yyyy')}`
  }
];

export const DocumentsContainer = ({ render }: Props) => {
  return render({
    activeDocuments,
    expiredDocuments
  });
};

type Document = {
  id?: string;
  name?: string;
  expiry?: string;
};

export type DocumentsContainerRenderProps = {
  activeDocuments: Document[];
  expiredDocuments: Document[];
};

type Props = SmartComponentProps<{
  render: (props: DocumentsContainerRenderProps) => JSX.Element;
}>;
