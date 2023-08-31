/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import {
  LogoTwitter,
  LogoFacebook,
  LogoLinkedin,
  LogoYoutube,
  LogoInstagram
} from '@carbon/react/icons';
import * as S from './SocialLinks.styles';

// 308

const getIcon = (url: string) => {
  if (url.includes('linkedin')) return <LogoLinkedin size={24} />;
  else if (url.includes('youtube')) return <LogoYoutube size={24} />;
  else if (url.includes('facebook')) return <LogoFacebook size={24} />;
  else if (url.includes('instagram')) return <LogoInstagram size={24} />;
  else if (url.includes('twitter')) return <LogoTwitter size={24} />;
  else return '';
};

const getLabel = (url: string) => {
  if (url.includes('linkedin')) return "LinkedIn";
  else if (url.includes('youtube')) return "YouTube";
  else if (url.includes('facebook')) return "Facebook";
  else if (url.includes('instagram')) return "Instagram";
  else if (url.includes('twitter')) return "Twitter";
  else return '';
};

export const SocialLinks = ({ items }: Props) => {
  return (
    <S.SocialLinks>
      {items &&
        items.map(item => (
          <S.Icon
            aria-label={getLabel(item.url!)}
            key={item.url!}
            onClick={() => window.open(item.url)}
            fgColor={item.fgColor!}
            bgColor={item.bgColor!}
          >
            {getIcon(item.url!)}
          </S.Icon>
        ))}
    </S.SocialLinks>
  );
};

type Props = {
  items: {
    url?: string;
    fgColor?: string;
    bgColor?: string;
  }[];
};
