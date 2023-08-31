/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as S from './DevMenu.styles';

export const DevMenu = ({ className, children }: Props) => {
  return <S.Menu className={className}>{children}</S.Menu>;
};

type Props = {
  children: any;
  className?: string;
};
