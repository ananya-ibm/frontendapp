/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SmartComponentProps } from '@exo/frontend-common-utils';

const dealer = {
  title: 'Your dealer',
  name: 'John Smith',
  surname: 'Car expert salesman',
  phoneNumber: '+44 1234 4532',
  emailAddress: 'johnsmith@mail.com',
  img: 'https://images.unsplash.com/photo-1476286768413-e7051cdb2179'
};

export const DealerContainer = ({ render }: Props) => {
  return render({ ...dealer });
};

export type DealerContainerRenderProps = {
  title: string;
  name: string;
  surname: string;
  phoneNumber: string;
  emailAddress: string;
  img: string;
};

type Props = SmartComponentProps<{
  render: (props: DealerContainerRenderProps) => JSX.Element;
}>;
