/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ReactElement } from 'react';

export type RenderError = (error: any) => ReactElement | null;
export type RenderLoading = () => ReactElement | null;

export type SmartComponentProps<T> = T & {
  renderError?: RenderError;
  renderLoading?: RenderLoading;
};
