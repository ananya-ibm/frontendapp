/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const spacingBaseline = 1;

const CarbonVars = {
  interactive01: '#0f62fe', // Primary interactive color; Primary buttons
  interactive02: '#6f6f6f', // Secondary interactive color; Secondary button
  interactive03: '#ffffff', // 4.5:1 AA contrast; Tertiary button
  interactive04: '#4589ff', // 3:1 AA contrast; Selected elements; Active elements; Accent icons
  uiBackground: '#161616', // Default page background
  danger: '#da1e28', // Danger button background; 3:1 AA contrast
  ui01: '#262626', // Container background on $ui-background; Secondary page background
  ui02: '#393939', // Container background on $ui-01; `Light` variant background
  ui03: '#393939', // Subtle border; Tertiary background
  ui04: '#6f6f6f', // 3:1 aa element contrast; Medium contrast border
  ui05: '#f4f4f4', // 4.5:1 aa element contrast; High contrast border; Emphasis elements
  text01: '#f4f4f4', // Primary text; Body copy; Headers; Hover text color for $text-02
  text02: '#c6c6c6', // Secondary text; Input labels
  text03: '#6f6f6f', // Placeholder text
  text04: '#ffffff', // Text on interactive colors
  text05: '#8d8d8d', // Tertiary text; Help text
  icon01: '#f4f4f4', // Primary icons
  icon02: '#c6c6c6', // Secondary icons
  icon03: '#ffffff', // Icons on interactive colors; Icons on non-ui colors
  link01: '#78a9ff', // Primary links; Ghost button
  field01: '#262626', // Default input fields; Fields on $ui-backgrounds
  field02: '#393939', // “Light” variant input fields; Fields on $ui-01 backgrounds
  inverse01: '#161616', // Inverse text color; Inverse icon color
  inverse02: '#f4f4f4', // High contrast backgrounds; High contrast elements
  support01: '#fa4d56', // Error
  support02: '#42be65', // Success
  support03: '#f1c21b', // Warning
  support04: '#4589ff', // Information
  inverseSupport01: '#da1e28', // Danger in high contrast moments
  inverseSupport02: '#24a148', // Success in high contrast moments
  inverseSupport03: '#f1c21b', // Warning in high contrast moments
  inverseSupport04: '#0043ce', // Information in high contrast moments
  overlay01: '#161616B3', // Background overlay

  // Interactive color tokens
  focus: '#ffffff', // Focus border; Focus underline
  hoverPrimary: '#0353e9', // $interactive-01 hover
  activePrimary: '#002d9c', // $interactive-01 active
  hoverPrimaryText: '#a6c8ff', // $interactive-01 text hover
  hoverSecondary: '#606060', // $interactive-02 hover
  activeSecondary: '#393939', // $interactive-02 active; $inverse-01 active
  hoverTertiary: '#f4f4f4', // $interactive-03 hover; $inverse-01 hover
  activeTertiary: '#c6c6c6', // $interactive-03 active
  hoverUi: '#353535', // $ui-01 hover; $ui-02 hover; Transparent background hover
  activeUi: '#525252', // $ui-01 active; $ui-02 active
  selectedUi: '#393939', // Selected UI elements
  hoverSelectedUi: '#4c4c4c', // Selected row hover
  hoverDanger: '#ba1b23', // Danger hover; $support-01 hover
  activeDanger: '#750e13', // Danger active; $support-01 active
  hoverRow: '#353535', // Row hover
  visitedLink: '#be95ff', // Visited links
  disabled01: '#262626', // Disabled fields; Disabled backgrounds; Disabled border
  disabled02: '#525252', // Disabled elements on $disabled-01; Disabled label; Disabled text on $disabled-01; Disabled icons; Disabled border
  disabled03: '#6f6f6f', // Disabled text on $disabled-02; Disabled icons on $disabled-02
  highlight: '#001d6c', // $interactive-01 highlight
  skeleton01: '#353535', // Skeleton state of graphics
  skeleton02: '#525252', // Skeleton state of texts
  brand01: '#0062ff', // Primary brand color
  brand02: '#171717', // Secondary brand colors
  brand03: '#0062ff', // Tertiary brand colors

  spacing3xs: `${spacingBaseline * 0.125}rem`,
  spacing2xs: `${spacingBaseline * 0.25}rem`,
  spacingXs: `${spacingBaseline * 0.5}rem`,
  spacingSm: `${spacingBaseline * 0.75}rem`,
  spacingMd: `${spacingBaseline}rem`,
  spacingLg: `${spacingBaseline * 1.5}rem`,
  spacingXl: `${spacingBaseline * 2}rem`,
  spacing2xl: `${spacingBaseline * 2.5}rem`,
  spacing3xl: `${spacingBaseline * 3}rem`,
  layout2xs: `${spacingBaseline}rem`,
  layoutXs: `${spacingBaseline * 1.5}rem`,
  layoutSm: `${spacingBaseline * 2}rem`,
  layoutMd: `${spacingBaseline * 3}rem`,
  layoutLg: `${spacingBaseline * 4}rem`,
  layoutXl: `${spacingBaseline * 6}rem`,
  layout2xl: `${spacingBaseline * 10}rem`,

  bodyLong01FontSize: '.875rem',
  bodyLong01FontWeight: '400',
  bodyLong01LetterSpacing: '.16px',
  bodyLong01LineHeight: '1.43',
  bodyLong02FontSize: '1rem',
  bodyLong02FontWeight: '400',
  bodyLong02LetterSpacing: '0',
  bodyLong02LineHeight: '1.5',
  bodyShort01FontSize: '.875rem',
  bodyShort01FontWeight: '400',
  bodyShort01LetterSpacing: '.16px',
  bodyShort01LineHeight: '1.29',
  bodyShort02FontSize: '1rem',
  bodyShort02FontWeight: '400',
  bodyShort02LetterSpacing: '0',
  bodyShort02LineHeight: '1.375',

  label01FontSize: '.75rem',
  label01FontWeight: '400',
  label01LetterSpacing: '.32px',
  label01LineHeight: '1.34',
  caption01FontSize: '.75rem',
  caption01FontWeight: '400',
  caption01LetterSpacing: '.32px',
  caption01LineHeight: '1.34',
  helperText01FontSize: '.75rem',
  helperText01LetterSpacing: '.32px',
  helperText01LineHeight: '1.34',

  productiveHeading01FontSize: '.875rem',
  productiveHeading01FontWeight: '600',
  productiveHeading01LetterSpacing: '.16px',
  productiveHeading01LineHeight: '1.29',
  productiveHeading02FontSize: '1rem',
  productiveHeading02FontWeight: '600',
  productiveHeading02LetterSpacing: '0',
  productiveHeading02LineHeight: '1.375',
  productiveHeading03FontSize: '1.25rem',
  productiveHeading03FontWeight: '400',
  productiveHeading03LetterSpacing: '0',
  productiveHeading03LineHeight: '1.4',
  productiveHeading04FontSize: '1.75rem',
  productiveHeading04FontWeight: '400',
  productiveHeading04LetterSpacing: '0',
  productiveHeading04LineHeight: '1.29',
  productiveHeading05FontSize: '2rem',
  productiveHeading05FontWeight: '400',
  productiveHeading05LetterSpacing: '0',
  productiveHeading05LineHeight: '1.25',
  productiveHeading06FontSize: '2.625rem',
  productiveHeading06FontWeight: '300',
  productiveHeading06LetterSpacing: '0',
  productiveHeading06LineHeight: '1.199',

  // Responive types are in form <small>,<medium>,<large>,<xLarge>,<max>
  expressiveHeading03FontSize: '1.25rem',
  expressiveHeading03LineHeight: '1.4',
  expressiveHeading03FontWeight: '400',
  expressiveHeading03LetterSpacing: '0',
  expressiveHeading03ResponsiveLineHeight: ',,,1.25,1.34',
  expressiveHeading03ResponsiveFontSize: ',,,1.25,1.5',
  expressiveHeading03ResponsiveFontWeight: ',,,,',
  expressiveHeading03ResponsiveLetterSpacing: ',,,,',

  expressiveHeading04FontSize: '1.75rem',
  expressiveHeading04LineHeight: '1.29',
  expressiveHeading04FontWeight: '400',
  expressiveHeading04LetterSpacing: '0',
  expressiveHeading04ResponsiveLineHeight: ',,,1.25,',
  expressiveHeading04ResponsiveFontSize: ',,,1.75,2',
  expressiveHeading04ResponsiveFontWeight: ',,,,',
  expressiveHeading04ResponsiveLetterSpacing: ',,,,',

  expressiveHeading05FontSize: '2rem',
  expressiveHeading05LineHeight: '1.25',
  expressiveHeading05FontWeight: '400',
  expressiveHeading05LetterSpacing: '0',
  expressiveHeading05ResponsiveLineHeight: ',1.22,1.19,1.17,',
  expressiveHeading05ResponsiveFontSize: ',2.25,2.625,3,3.75',
  expressiveHeading05ResponsiveFontWeight: ',300,,,',
  expressiveHeading05ResponsiveLetterSpacing: ',,,,',

  expressiveHeading06FontSize: '2rem',
  expressiveHeading06LineHeight: '1.25',
  expressiveHeading06FontWeight: '600',
  expressiveHeading06LetterSpacing: '0',
  expressiveHeading06ResponsiveLineHeight: ',1.22,1.19,1.17,',
  expressiveHeading06ResponsiveFontSize: ',2.25,2.625,3,3.75',
  expressiveHeading06ResponsiveFontWeight: ',,,,',
  expressiveHeading06ResponsiveLetterSpacing: ',,,,',

  expressiveParagraph01FontSize: '1.5rem',
  expressiveParagraph01LineHeight: '1.334',
  expressiveParagraph01FontWeight: '300',
  expressiveParagraph01LetterSpacing: '0',
  expressiveParagraph01ResponsiveLineHeight: ',,1.29,,1.25',
  expressiveParagraph01ResponsiveFontSize: ',,1.75,,2',
  expressiveParagraph01ResponsiveFontWeight: ',,,,',
  expressiveParagraph01ResponsiveLetterSpacing: ',,,,',

  expressiveQuotation01FontSize: '1.25rem',
  expressiveQuotation01LineHeight: '1.3',
  expressiveQuotation01FontWeight: '300',
  expressiveQuotation01LetterSpacing: '0',
  expressiveQuotation01ResponsiveLineHeight: ',,1.334,1.29,1.25',
  expressiveQuotation01ResponsiveFontSize: ',1.25,1.5,1.75,2',
  expressiveQuotation01ResponsiveFontWeight: ',,,,',
  expressiveQuotation01ResponsiveLetterSpacing: ',,,,'
};

export default CarbonVars;
