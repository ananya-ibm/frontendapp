/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export type ContainerDefinitions = Record<string, (spec: Record<string, string> | undefined) => ContainerDefinition>;
export type SpotDefinitions = Record<string, (spec: Record<string, string> | undefined) => SpotDefinition>;

export type ContainerDefinition = {
  content: Content[]; 
} | {
  spots: SpotDefinitions;
}

export type SpotDefinition = {
  content: Content[]; 
}

export type Content = {
  component: string;
  props: Record<string, any>;
}
