/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { Entity, useEntity } from '../../hooks/useEntity';

export const EntityContainer = ({
  type,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useEntity({ type });

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({ entity: data });
};

export type EntityContainerRenderProps = {
  entity: Entity;
};

type Props = SmartComponentProps<{
  type: string;
  render: (props: EntityContainerRenderProps) => JSX.Element;
}>;
