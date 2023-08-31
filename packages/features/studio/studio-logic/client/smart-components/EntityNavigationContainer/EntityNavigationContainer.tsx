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
import { EntitySummary, useEntities } from '../../hooks/useEntities';

export const EntityNavigationContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useEntities({});

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  const groups = [...new Set(data.map(d => d.group))].sort();
  const entities = Object.fromEntries(groups.map(g => [g, data.filter(e => e.group === g)]));
  return render({ entities });
};

export type EntityNavigationContainerRenderProps = {
  entities: Record<string, EntitySummary[]>;
};

type Props = SmartComponentProps<{
  render: (props: EntityNavigationContainerRenderProps) => JSX.Element;
}>;
