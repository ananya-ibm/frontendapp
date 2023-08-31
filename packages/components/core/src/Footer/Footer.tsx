/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SocialLinks } from '../SocialLinks/SocialLinks';
import * as S from './Footer.styles';

export const Footer = ({ copyright, social, links }: Props) => {
  return (
    <S.Footer>
      <S.ContentPanel>
        <S.Inner>
          <S.Content>
            {links && (
              <S.Columns>
                {links.sections1?.map((section) => (
                  <S.Column key={`footer-${section.title}`}>
                    <S.Heading>{section.title}</S.Heading>
                    <S.Items>
                      {section?.items.map((link) => (
                        <S.Item key={`footer-${section.title}-${link.title}`}>
                          <S.Link href={link.url}>{link.title}</S.Link>
                        </S.Item>
                      ))}
                    </S.Items>
                  </S.Column>
                ))}
                {links.sections2?.map((section) => (
                  <S.Column key={`footer-${section.title}`}>
                    <S.Heading>{section.title}</S.Heading>
                    <S.Items>
                      {section?.items.map((link) => (
                        <S.Item key={`footer-${section.title}-${link.title}`}>
                          <S.Link href={link.url}>{link.title}</S.Link>
                        </S.Item>
                      ))}
                    </S.Items>
                  </S.Column>
                ))}
                <S.SocialColumn>
                  <SocialLinks items={social?.socialLinks} />
                </S.SocialColumn>
              </S.Columns>
            )}
          </S.Content>
        </S.Inner>
      </S.ContentPanel>
      <S.TermsPanel>
        <S.Inner>
          <S.Terms><S.TermsText>{copyright}</S.TermsText></S.Terms>
        </S.Inner>
      </S.TermsPanel>
    </S.Footer>
  );
};

type Props = {
  links: {
    sections1: {
      title: string  | React.ReactNode;
      items: {
        url: string;
        title: string | React.ReactNode;
      }[];
    }[];
    sections2: {
      title: string| React.ReactNode;
      items: {
        url: string;
        title: string| React.ReactNode;
      }[];
    }[];
  };
  copyright: string;
  social: {
    header: string| React.ReactNode;
    buttonText: string| React.ReactNode;
    socialLinks: {
      url: string;
      fgColor: string;
      bgColor: string;
    }[];
  };
};
