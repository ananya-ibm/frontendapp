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
import { ReactElement } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { mapNavItem, NavItem } from './navMapper';

export const NavigationContainer = ({
  depth=1,
  navigationUrlType,
  navigationKey,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const useSlugs = navigationUrlType === 'slug';

  const navigationQ = useNavigation(navigationKey, depth);

  if (navigationQ.loading) return renderLoading();
  if (navigationQ.error) return renderError(navigationQ.error);

  const navItems = (navigationQ.data?.navRoot?.children ?? [])
    // eslint-disable-next-line no-underscore-dangle
    .filter(c => c.__typename === 'NavContentNode')
    .map(c => mapNavItem(c, useSlugs));

  return render({ navItems });
};

type Props = SmartComponentProps<{
  depth: number;
  navigationUrlType: 'slug' | 'id';
  navigationKey: string;
  render: (props: NavigationContainerRenderProps) => ReactElement | null;
}>;

export type NavigationContainerRenderProps = {
  navItems: NavItem[];
};
