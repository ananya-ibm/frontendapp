/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Action } from '@exo/frontend-components-base';
import { Search, ShoppingBag, User } from '@carbon/react/icons';
import { useTheme } from 'styled-components';
import { Masthead } from './Masthead';
import { normal } from './MegaMenu/MegaMenu.stories';

export default {
  title: 'Components/Core/Masthead',
  component: Masthead,
  decorators: [
    (Story) => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
} as any;

export const Sample = () => {
  const currentTheme = useTheme() as any;
  return (
    <Masthead>
      <Masthead.Auxilliary
        actions={
          <>
            <Action label="Action 1" href="#" />
            <Action label="Action 2" href="#" />
            <Action label="Action 3" href="#" />
          </>
        }
      />
      <Masthead.Header
        logo={<Action href="/" icon={<currentTheme.static.Logo />} />}
        actions={
          <>
            <Action label="Shopping Bag" icon={<ShoppingBag size={24} className="icon" />} />
            <Action label="User" icon={<User size={24} className="icon" />} />
            <Action label="Search" icon={<Search size={24} className="icon" />} />
          </>
        }
        menuToggle={
          <Masthead.MenuToggle
            render={(isOpen, onClose) => (
              <Masthead.NavMobile
                isOpen={isOpen}
                onClose={onClose}
                actions={
                  <>
                    <Action label="Lorem" href="#" />
                    <Action label="Ipsum" href="#" />
                    <Action label="Dolor" href="#" />
                    <Action label="Sit" href="#" />
                    <Action label="Amet" href="#" />
                    <Action label="Consectetuer" href="#" />
                    <Action label="Consectetuer" href="#" />
                    <Action label="Consectetuer" href="#" />
                    <Action label="Consectetuer" href="#" />
                    <Action label="Consectetuer" href="#" />
                  </>
                }
                secondaryActions={
                  <>
                    <Action label="Shopping Bag" icon={<Search size={16} className="icon" />} />
                    <Action label="User" icon={<User size={16} className="icon" />} />
                  </>
                }
                logo={<Action href="/" icon={<currentTheme.static.Logo />} />}
              />
            )}
          />
        }
      />
      <Masthead.NavDesktop
        actions={
          <>
            <Masthead.MegaMenuTrigger
              label="Lorem"
              render={(isVisible, top, hide) => {
                return (
                  <Masthead.MegaMenu
                    navItems={normal.args.navItems as any}
                    isVisible={isVisible}
                    top={top}
                    onClick={hide}
                  />
                );
              }}
            />
            <Action label="Ipsum" href="#" />
            <Action label="Dolor" href="#" />
            <Action label="Sit" href="#" />
            <Action label="Amet" href="#" />
            <Action label="Consectetuer" href="#" />
            <Action label="Consectetuer" href="#" />
            <Action label="Consectetuer" href="#" />
            <Action label="Consectetuer" href="#" />
            <Action label="Consectetuer" href="#" />
          </>
        }
        secondaryActions={
          <>
            <Action label="Shopping Bag" icon={<Search size={16} className="icon" />} />
            <Action label="User" icon={<User size={16} className="icon" />} />
          </>
        }
      />
    </Masthead>
  );
};

export const OneLine = () => {
  const currentTheme = useTheme() as any;
  return (
    <Masthead>
      <Masthead.Header
        logo={<Action href="/" icon={<currentTheme.static.Logo />} />}
        actions={
          <>
            <Action label="Search" icon={<Search size={24} className="icon" />} />
            <Action label="Shopping Bag" icon={<ShoppingBag size={24} className="icon" />} />
            <Action label="User" icon={<User size={24} className="icon" />} />
          </>
        }
        navigation={
          <>
            <Action label="Lorem" href="#" />
            <Action label="Ipsum" href="#" />
            <Action label="Dolor" href="#" />
            <Action label="Sit" href="#" />
            <Action label="Amet" href="#" />
          </>
        }
        menuToggle={
          <Masthead.MenuToggle
            render={(isOpen, onClose) => (
              <Masthead.NavMobile
                isOpen={isOpen}
                onClose={onClose}
                actions={
                  <>
                    <Action label="Lorem" href="#" />
                    <Action label="Ipsum" href="#" />
                    <Action label="Dolor" href="#" />
                    <Action label="Sit" href="#" />
                    <Action label="Amet" href="#" />
                  </>
                }
                secondaryActions={
                  <>
                    <Action label="Shopping Bag" icon={<Search size={16} className="icon" />} />
                    <Action label="User" icon={<User size={16} className="icon" />} />
                  </>
                }
                logo={<Action href="/" icon={<currentTheme.static.Logo />} />}
              />
            )}
          />
        }
      />
    </Masthead>
  );
};
