/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronDown
} from '@carbon/react/icons';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import { ExpandButton } from '../ExpandButton/ExpandButton';
import { ConfigurationSummary } from '../ConfigurationSummary/ConfigurationSummary';
import { PriceBar } from '../PriceBar/PriceBar';
import { ProductsGrid } from './ProductsGrid';
import * as S from './Configurator.styles';
import ModelViewer3D from '../ModelViewer3D/ModelViewer3D';


type ActiveMenu = {
  type: string;
  id?: string;
  title?: string;
  parent?: any;
  products?: any;
};

export const Configurator = ({
  categories,
  configuratorSummary,
  onBackButtonClick,
  priceBar,
  handleProductSelection,
  configurationID,
  useVR
}: Props) => {

  const [activeTabId, setActiveTabId] = useState(categories.length && categories[0].id);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>({
    type: 'category',
    id: categories?.[0]?.id
  });
  const [isSummaryActive, setSummaryActive] = useState(false);
  const [isSidebarExpanded] = useState(false);

  // used by 3D Car render
  const [color, setColor] = useState('black');
  const [wheelAlloy, setWheelAlloy] = useState<[string, string]>([
    'frontWheelAlloy_1',
    'backWheelAlloy_1'
  ]);
  const [lights, setLights] = useState('black');

  useEffect(() => {
    if (!categories || !categories.length) {
      setSummaryActive(true);
      setActiveTabId('configurator-summary');
    }
    // this updates the activeMenu when a product is selected
    if (activeMenu.type !== 'subcategory') return;
    const updatedActiveMenu = {
      type: 'subcategory',
      id: activeMenu.id,
      title: activeMenu.title,
      products: categories
        ?.find(c => c.id === activeMenu.parent)
        ?.subcategories?.find(sc => sc.id === activeMenu.id)?.products,
      parent: activeMenu.parent
    };
    setActiveMenu(updatedActiveMenu);
  }, [categories]);

  const hasSummary = configuratorSummary;

  const summaryImage = isSummaryActive
    ? // eslint-disable-next-line react/prop-types
      categories[0] && JSON.stringify(categories[0].image)
    : undefined;

  const navLinks =
    categories && categories.length
      ? categories.map(category => {
          return { name: category.name, id: category.id };
        })
      : [];

  const activeCategory = isSummaryActive ? null : categories.find(cat => cat.id === activeTabId);

  const onNavLinkClick = id => {
    setActiveTabId(id);
    setSummaryActive(false);
    setActiveMenu({ type: 'category', id });
  };

  const onSubcatClick = (subcat, activeCat?) => {
    const subcatObj = {
      type: 'subcategory',
      id: subcat.id,
      title: subcat.title,
      products: subcat.products,
      parent: activeCat ?? activeCategory?.id
    };

    setActiveMenu(subcatObj);
  };

  const onProductClick = async product => {
    const colors = {
      'Brilliant Black': 'black',
      'Electric Blue': 'blue',
      'Fiery Red': 'red',
      'Iridescent Green': 'green',
      'Bright Yellow': 'yellow',
      'Pure White': 'white'
    };
    const wheelAlloyMap = {
      'Standard Alloys': ['frontWheelAlloy_1', 'backWheelAlloy_1'],
      'Ultralite Silver': ['frontWheelAlloy_2', 'backWheelAlloy_2']
    };
    const lightsMap = {
      'Bi-Xenon': 'blue',
      Halogen: 'black',
      LED: 'yellow'
    };
    setColor(colors[product.name]);
    setWheelAlloy(wheelAlloyMap[product.name]);
    setLights(lightsMap[product.name]);

    // update selected product
    if (handleProductSelection) await handleProductSelection(product);
    return product;
  };

  const onShowSummary = () => {
    //  Set this Summary to current
    setActiveTabId('configurator-summary');
    // Expand summary and hide sidebar
    setSummaryActive(true);
  };

  const toggleSummary = () => {
    setActiveTabId(isSummaryActive ? categories[0].id : 'configurator-summary');
    setSummaryActive(!isSummaryActive);
  };

  const onBackClick = () => {
    const previousSubcategory =
      activeCategory?.subcategories?.[
        activeCategory?.subcategories.findIndex(subcat => subcat.id === activeMenu.id) - 1
      ];
    onSubcatClick(previousSubcategory);
  };

  const hasPreviousSubcategory =
    activeCategory?.subcategories?.findIndex(subcat => subcat.id === activeMenu?.id) !== 0;

  const hasNextSubcategory =
    (activeCategory?.subcategories?.findIndex(subcat => subcat.id === activeMenu?.id) ?? -1) + 1 <
    (activeCategory?.subcategories?.length ?? -1);

  const onNextClick = () => {
    const nextSubcategory =
      activeCategory?.subcategories?.[
        activeCategory?.subcategories?.findIndex(subcat => subcat.id === activeMenu.id) + 1
      ];
    onSubcatClick(nextSubcategory);
  };

  const hasNextCategory =
    categories?.findIndex(cat => cat.id === activeCategory?.id) + 1 < categories?.length;

  const nextCategory = hasNextCategory
    ? categories[categories?.findIndex(cat => cat.id === activeCategory?.id) + 1]
    : undefined;

  const onNextCategory = () => {
    onNavLinkClick(nextCategory?.id);
    onSubcatClick(nextCategory?.subcategories?.[0], nextCategory?.id);
  };

  const isLastCategory =
    categories?.findIndex(cat => cat.id === activeCategory?.id) + 1 === categories?.length;
  
  return (
    <>
      <S.Configurator>
      {activeCategory &&
           (useVR ? (
             <ModelViewer3D color={color} wheelAlloy={wheelAlloy} lights={lights} />
          ) : (
            <S.Content image={activeCategory.image} />
          ))}

        {hasSummary && <S.Content image={summaryImage} />}
        <S.Nav>
          {onBackButtonClick && (
            <S.BackButton>
              <Button
                variant="light"
                icon={<ArrowLeft size={16} />}
                label="Go back"
                iconPosition="left"
                onClick={onBackButtonClick}
              />
            </S.BackButton>
          )}
          {navLinks?.length > 0 &&
            navLinks.map(navlink => (
              <S.Link
                href="#"
                key={navlink.id}
                onClick={() => onNavLinkClick(navlink.id)}
                className={activeTabId === navlink.id ? 'active' : ''}
                data-testid={`configurator-${navlink.name}`}
              >
                {navlink.name}
              </S.Link>
            ))}
          {hasSummary && (
            <S.Link
              href="#"
              onclick={() => onShowSummary()}
              key="configurator-summary"
              className={activeTabId === 'configurator-summary' ? 'active' : ''}
            >
              Summary
            </S.Link>
          )}
        </S.Nav>
        {activeCategory && (
          <S.Sidebar isExpanded={isSidebarExpanded}>
            {activeMenu && (
              <>
                <S.Title>{activeCategory.title}</S.Title>
                <S.Menu>
                  {activeCategory.subcategories?.map(subcat => (
                    <React.Fragment key={subcat.id}>
                      <S.MenuItem onClick={() => onSubcatClick(subcat)} type="button">
                        {subcat.title}
                        {activeMenu.id === subcat.id ? (
                          <ChevronDown size={32} className="Configurator-icon" />
                        ) : (
                          <ChevronRight size={32} className="Configurator-icon" />
                        )}
                      </S.MenuItem>
                      {activeMenu.type === 'subcategory' && activeMenu.id === subcat.id && (
                        <>
                          <ProductsGrid
                            topActive={activeMenu.parent}
                            subcat={activeMenu.id}
                            isExpanded={isSidebarExpanded}
                            products={activeMenu.products}
                            handleProductClick={product => onProductClick(product)}
                          />
                          <LayoutSpacing size="sm" />
                          <S.ButtonGroup>
                            {hasPreviousSubcategory && (
                              <S.Button type="button" onClick={onBackClick}>
                                <ArrowLeft size={32} />
                                <span>Go back</span>
                              </S.Button>
                            )}

                            {hasNextSubcategory && (
                              <S.Button type="button" onClick={onNextClick}>
                                <span>Continue</span>
                                <ArrowRight size={32} />
                              </S.Button>
                            )}

                            {!hasNextSubcategory && hasNextCategory && (
                              <Button
                                onClick={onNextCategory}
                                label={nextCategory?.name}
                                icon={<ArrowRight size={16} />}
                              />
                            )}

                            {!hasNextSubcategory && isLastCategory && hasSummary && (
                              <Button
                                onClick={onShowSummary}
                                label="Summary"
                                icon={<ArrowRight size={16} />}
                              />
                            )}
                          </S.ButtonGroup>
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </S.Menu>
              </>
            )}
          </S.Sidebar>
        )}
      </S.Configurator>
      <S.ConfigurationSummary isExpanded={isSummaryActive}>
        {/* @ts-ignore */}
        {hasSummary && isSummaryActive && <ConfigurationSummary {...configuratorSummary} />}
      </S.ConfigurationSummary>

      {priceBar && (
        <>
          <S.PriceBar>
            <PriceBar
              addToCartText={priceBar.addToCartText}
              financeLinkText={priceBar.financeLinkText}
              subscriptionCost={priceBar.subscriptionCost!}
              testDriveOnClick={priceBar.testDriveOnClick}
              addToCartClick={priceBar.addToCartClick}
              testDriveText={priceBar.testDriveText}
              price={priceBar.price!}
              configurationID={configurationID}
            />
          </S.PriceBar>
          <S.ExpandButton>
            <ExpandButton
              test-id="configurator-expand-button"
              isExpanded={isSummaryActive}
              onExpandClick={() => toggleSummary()}
            />
          </S.ExpandButton>
        </>
      )}
    </>
  );
};

export type SummarySelections = {
  title?: string;
  options: {
    title: string;
    text?: string;
    amount: {
      prefix?: string;
      currency?: string;
      value: number | string;
    };
    version?: string;
    thumbnail?: string;
    onProductSelectionChange: (arg: any) => void;
    changeButtonText: string;
  }[];
}[];

type Props = {
  onBackButtonClick?: () => void;
  categories: {
    id?: string;
    name?: string;
    title?: string;
    image?: string;
    subcategories?: {
      id?: string;
      name?: string;
      title?: string;
      thumbnail?: string;
      isSingleSelect?: boolean;
      products: {
        id?: string;
        name?: string;
        isAvailable?: boolean;
        isSelected?: boolean;
        thumbnail?: string;
        price?: {
          prefix?: string;
          currency?: string;
          value: string | number;
        };
      }[];
    }[];
  }[];
  configuratorSummary?: {
    image?: string;
    isSaving?: boolean;
    summaryText: string;
    configurationCode: string;
    deliveryDate: string;
    priceBreakdownText?: string;
    priceBreakdown: {
      text?: string;
      amount?: {
        prefix?: string;
        currency?: string;
        value?: string | number;
      };
    }[];
    onSaveConfiguration: () => void;
    onDeleteConfiguration?: () => void;
    summarySelections: SummarySelections;
  };
  handleProductSelection?: (arg: any) => void;
  priceBar?: {
    addToCartText?: string;
    addToCartClick?: () => void;
    financeLinkText?: string;
    financeUrl?: string;
    price?: {
      value?: string;
      currency?: string;
      prefix?: string;
    };
    testDriveText?: string;
    testDriveOnClick?: () => void;
    subscriptionCost?: {
      value?: string;
      currency?: string;
      prefix?: string;
      rate?: string;
    };
  };
  configurationID?: string;
  useVR?: boolean;
};
