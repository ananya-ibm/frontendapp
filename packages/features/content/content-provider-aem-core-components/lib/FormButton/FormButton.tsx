/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { Button } from '@exo/frontend-components-base';

export const FormButton = (props: Props) => {
  return <Button variant={props.variant} type={props.type} label={props.title} />;
};

type Props = {
  name: string;
  title: string;
  type: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'light' | 'link' | any;
};
