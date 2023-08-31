/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export type Provider<P, C, E> = {
  providers?: P;
  configuration?: C;
} & E;

export type ProviderContextProvider<P, C, E> = (props: {
  children: any;
  configuration: C;
  context: React.Context<Provider<P, C, E> | undefined>;
}) => React.ReactElement;
