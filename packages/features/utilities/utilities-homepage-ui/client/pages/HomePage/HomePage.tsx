/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import { useEventContext } from '@exo/frontend-features-events-logic';
import { Grid, Row, Column } from '@exo/frontend-components-base';
import { Hero, FullWidthTile, ContentTiles } from '@exo/frontend-components-content';
import { LayoutSpacing } from '@exo/frontend-components-core';
import * as S from './HomePage.styles';
import { useEffectOnce } from '@exo/frontend-common-hooks';
import { DetailCase } from '@exo/frontend-components-utilities';
import { useIntl } from '@exo/frontend-common-i18n';

// TODO - this is a temporary solution until the images come from the BE or some CMS
import headerimage from '../../assets/headerimage.png';
import image1 from '../../assets/image-1.png';
import image3 from '../../assets/image.png';
import unsplash from '../../assets/jeremy-bezanger-k8HniqcdYS4-unsplash.png';
import somehelp from '../../assets/some ways we can help.png';
import Tree from '../../assets/Pictogram 1.png';
import SolarPanel from '../../assets/pictogram 2.png';
import SVG from '../../assets/Pictogram 3.png';

// ToDo: There is a bug where CMS container should in fact not be used like this, it should wrap the whole page and use CMSSpot

export const HomePage = () => {
  const eventContext = useEventContext();
  useEffectOnce(() => {
    eventContext?.createEvent({ name: 'page_load', pageName: 'Home page' });
  });
  const intl = useIntl('features.utilities.utilities-ui.pages.HomePage');
  return (
    <S.HomePage>
      <Grid>
        <Row>
          <S.HeaderImage>
            <S.Title>
              <Hero
                color="#161616"
                ctaText="CTA button"
                image={headerimage}
                subtitle=""
                text={intl.msg(
                  'Hero.Text',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                )}
                title={intl.msg('Hero.Title', 'Energy and Utilities')}
                variant="image-50%"
              />
            </S.Title>
          </S.HeaderImage>
        </Row>
        <LayoutSpacing size="sm" />
        <S.titlealign>{intl.msg('Cards.Title', 'What you get?')}</S.titlealign>
        <Row>
          <S.Centering>
            <div
              style={{
                maxWidth: '20rem'
              }}
            >
              <S.Card interactive>
                <S.CardSection type="media">
                  <img src={Tree} />
                </S.CardSection>
                <S.CardTitle>{intl.msg('Card1.Title', 'Lorem ipsum')}</S.CardTitle>
                <S.CardSection>
                  {intl.msg(
                    'Card1.Body',
                    '                  Quo quis molestiae tempora eligendi omnis quisquam quisquam. Nihil dolor voluptatibus velit nobis culpa. Eos reprehenderit in nisi et qui.'
                  )}
                </S.CardSection>
              </S.Card>
            </div>
            <div
              style={{
                maxWidth: '20rem'
              }}
            >
              <S.Card interactive>
                <S.CardSection type="media">
                  <img src={SolarPanel} />
                </S.CardSection>
                <S.CardTitle>{intl.msg('Card2.Title', 'Lorem ipsum')}</S.CardTitle>
                <S.CardSection type="primary">
                  {intl.msg(
                    'Card2.Body',
                    '                  Quo quis molestiae tempora eligendi omnis quisquam quisquam. Nihil dolor voluptatibus velit nobis culpa. Eos reprehenderit in nisi et qui.'
                  )}
                </S.CardSection>
              </S.Card>
            </div>
            <div
              style={{
                maxWidth: '20rem'
              }}
            >
              <S.Card interactive>
                <S.CardSection type="media">
                  <img src={SVG} />
                </S.CardSection>
                <S.CardTitle>{intl.msg('Card3.Title', 'Lorem ipsum')}</S.CardTitle>
                <S.CardSection>
                  {intl.msg(
                    'Card3.Body',
                    'Quo quis molestiae tempora eligendi omnis quisquam quisquam. Nihil dolor voluptatibus velit nobis culpa. Eos reprehenderit in nisi et qui.'
                  )}
                </S.CardSection>
              </S.Card>
            </div>
          </S.Centering>
        </Row>
        <LayoutSpacing size="sm" />
        <S.titlealign>
          {intl.msg('Section3.Title', 'Here are some ways we can help you save')}
        </S.titlealign>
        <Row>
          <S.ContentPadding>
            <DetailCase
              subTitle={intl.msg(
                'DetailCase.SubTitle',
                'Benefits'
              ) as string}
              title={intl.msg(
                'DetailCase.Title',
                'Lorem ipsum'
              ) as string}
              body1={intl.msg(
                'DetailCase.Body1',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              ) as string}
              body2={intl.msg(
                'DetailCase.Body2',
                'Lorem ipsum dolor sit amet.'
              ) as string}
              body3={intl.msg(
                'DetailCase.Body3',
                'Lorem ipsum dolor sit amet.'
              ) as string}
              body4={intl.msg(
                'DetailCase.Body4',
                'Lorem ipsum dolor sit amet.'
              ) as string}
              body5={intl.msg(
                'DetailCase.Body5',
                'Lorem ipsum dolor sit amet.'
              ) as string}
              body6={intl.msg(
                'DetailCase.Body6',
                'Lorem ipsum dolor sit amet.'
              ) as string}
              ctaText={intl.msg(
                'DetailCase.ctaText',
                'Lorem ipsum dolor sit amet.'
              ) as string}
              ctaLink="www.google.com"
              image={somehelp}
              imagePosition="right"
              background="white"
            />
          </S.ContentPadding>
        </Row>
        <LayoutSpacing size="md" />
        <Row>
          <S.Image>
            <FullWidthTile
              body={intl.msg(
                'FullWidthTile.Body',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              ) as string}
              ctaLink="#"
              ctaText={intl.msg(
                'FullWidthTile.ctaText',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              ) as string}
              ctaTextMobile={intl.msg(
                'FullWidthTile.ctaTextMobile',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              ) as string}
              image={unsplash}
              title={intl.msg(
                'FullWidthTile.Title',
                'Energy and Utilities'
              ) as string}
            />
          </S.Image>
        </Row>
        <LayoutSpacing size="xl" />
        <S.ContentPadding>
          <ContentTiles
            tiles={[
              {
                body: intl.msg(
                  'ContentTile1.Body',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                ) as string,
                ctaLink: '#',
                ctaText: intl.msg(
                  'ContentTile1.ctaText',
                  'Tertiary button'
                ) as string,
                image: image1,
                title: intl.msg(
                  'ContentTile1.Title',
                  'Energy and Utilities'
                ) as string
              },
              {
                body: intl.msg(
                  'ContentTile2.Body',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                ) as string,
                ctaLink: '#',
                ctaText: intl.msg(
                  'ContentTile2.ctaText',
                  'Tertiary button'
                ) as string,
                image: image3,
                title: intl.msg(
                  'ContentTile2.Title',
                  'Energy and Utilities'
                ) as string
              }
            ]}
          />
        </S.ContentPadding>
        <LayoutSpacing size="xl" />
        <Row>
          <Column>
            <CmsContainer name="autohomepage">
              <CmsSpot name="auto-hero" />
            </CmsContainer>
          </Column>
        </Row>
      </Grid>
    </S.HomePage>
  );
};
