/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export type Border = {
  border?: string | string[];
  radius?: string;
};

type Font = {
  family: string;
  weight?: string | number;
  style?: string;
  size: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
};

export type FontVariant = Partial<Pick<Font, 'weight' | 'size' | 'letterSpacing' | 'lineHeight'>>;

export type ResponsiveFont = Font & {
  breakpoints?: {
    small: FontVariant;
    medium: FontVariant;
    large: FontVariant;
    xLarge: FontVariant;
    max: FontVariant;
  };
};

export type InteractiveColor = {
  base: ColorPair;
  hover: ColorPair;
  active: ColorPair;
};

export type PanelColor = {
  base: string;
  hover: string;
  selected: string;
  selected_hover: string;
};

export type ColorPair = {
  fg: string;
  bg: string;
};

export type ColorPairContrast = {
  contrast: string;
  base: string;
};

export type Theme<T> = {
  name: string;
  version: string;

  globalStyles: {
    cssUrls?: string[];
    cssRules?: string;
    cssComponent?: React.FunctionComponent | React.ClassType<any, any, any>;
  };

  colors: {
    brand: {
      brand1: ColorPairContrast;
      brand2: ColorPairContrast;
    };
    interactive: {
      primary: InteractiveColor;
      secondary: InteractiveColor;
      tertiary: InteractiveColor;
      danger: InteractiveColor;
      disabled: ColorPair;
    };
    information: {
      error: string;
      success: string;
      warning: string;
      information: string;
    };
    text: {
      primary: string;
      secondary: string;

      /**
       * @deprecated
       * TODO: We should perhaps deprecate this one
       */
      tertiary: string;
    };
    icon: {
      primary: string;
      secondary: string;
    };
    link: {
      base: string;
      disabled: string;
      hover: string;
      visited: string;
      visited_hover: string;
    };
    backgrounds: {
      page: string;
      panels: {
        primary: PanelColor;
        secondary: PanelColor;
        tertiary: PanelColor;
      };
      overlay: string;
    };
    table: {
      row: {
        odd: string;
        even: string;
        selected: string;
        hover: string;
      };
    };
    inverse: {
      base: ColorPair;
      danger: ColorPair;
      success: ColorPair;
      support: ColorPair;
      information: ColorPair;
    };
    delimiters: {
      primary: string;
      highContrast: string;
      lowContrast: string;
    };
    form: {
      field: {
        base: ColorPair;
        onPanel: ColorPair;
        disabled: ColorPair;
        placeholder: string;
      };
    };
  };
  typography: {
    heading: {
      heading1: ResponsiveFont;
      heading2: ResponsiveFont;
      heading3: ResponsiveFont;
      heading4: ResponsiveFont;
      heading5: ResponsiveFont;
      heading6: ResponsiveFont;
    };
    body: {
      short: {
        XL: ResponsiveFont;
        L: ResponsiveFont;
        M: ResponsiveFont;
        S: ResponsiveFont;
        XS: ResponsiveFont;
        emXL: ResponsiveFont;
        emL: ResponsiveFont;
        emM: ResponsiveFont;
      };
      long: {
        XL: ResponsiveFont;
        L: ResponsiveFont;
        M: ResponsiveFont;
        S: ResponsiveFont;
        XS: ResponsiveFont;
        emXL: ResponsiveFont;
        emL: ResponsiveFont;
        emM: ResponsiveFont;
      };
    };
    display: {
      heading1: ResponsiveFont;
      heading2: ResponsiveFont;
      heading3: ResponsiveFont;
      heading4: ResponsiveFont;
      body1: ResponsiveFont;
      body2: ResponsiveFont;
    };
    labels: {
      label: ResponsiveFont;
      help: ResponsiveFont;
    };
  };
  spacing: {
    stack: {
      s1: string;
      s2: string;
      s3: string;
      s4: string;
      s5: string;
      s6: string;
      s7: string;
      s8: string;
      s9: string;
      s10: string;
      s11: string;
      s12: string;
      s13: string;

      /** @deprecated */
      sXXXS: string;

      /** @deprecated */
      sXXS: string;

      /** @deprecated */
      sXS: string;

      /** @deprecated */
      sS: string;

      /** @deprecated */
      sM: string;

      /** @deprecated */
      sL: string;

      /** @deprecated */
      sXL: string;

      /** @deprecated */
      sXXL: string;

      /** @deprecated */
      sXXXL: string;

      /** @deprecated */
      lXXS: string;

      /** @deprecated */
      lXS: string;

      /** @deprecated */
      lS: string;

      /** @deprecated */
      lM: string;

      /** @deprecated */
      lL: string;

      /** @deprecated */
      lXL: string;

      /** @deprecated */
      lXXL: string;
    };
    inline: {
      s1: string;
      s2: string;
      s3: string;
      s4: string;
      s5: string;
      s6: string;
      s7: string;
      s8: string;
      s9: string;
      s10: string;
      s11: string;
      s12: string;
      s13: string;

      /** @deprecated */
      sXXXS: string;

      /** @deprecated */
      sXXS: string;

      /** @deprecated */
      sXS: string;

      /** @deprecated */
      sS: string;

      /** @deprecated */
      sM: string;

      /** @deprecated */
      sL: string;

      /** @deprecated */
      sXL: string;

      /** @deprecated */
      sXXL: string;

      /** @deprecated */
      sXXXL: string;

      /** @deprecated */
      lXXS: string;

      /** @deprecated */
      lXS: string;

      /** @deprecated */
      lS: string;

      /** @deprecated */
      lM: string;

      /** @deprecated */
      lL: string;

      /** @deprecated */
      lXL: string;

      /** @deprecated */
      lXXL: string;
    };
    inset: {
      XS: string;
      S: string;
      M: string;
      L: string;
      XL: string;
    };
    squishedInset: {
      XS: string;
      S: string;
      M: string;
      L: string;
      XL: string;
    };
    stretchInset: {
      XS: string;
      S: string;
      M: string;
      L: string;
      XL: string;
    };
  };

  elevation: {
    interactive: {
      accented: {
        base: string;
        hover: string;
      };
      primary: {
        base: string;
        hover: string;
      };
      secondary: {
        base: string;
        hover: string;
      };
      tertiary: {
        base: string;
        hover: string;
      };
      danger: {
        base: string;
        hover: string;
      };
    };
    panels: {
      accented: {
        base: string;
        hover: string;
      };
      primary: {
        base: string;
        hover: string;
      };
      secondary: {
        base: string;
        hover: string;
      };
      tertiary: {
        base: string;
        hover: string;
      };
    };
  };

  borders: {
    interactive: {
      accented: {
        base: Border;
        hover: Border;
      };
      primary: {
        base: Border;
        hover: Border;
      };
      secondary: {
        base: Border;
        hover: Border;
      };
      tertiary: {
        base: Border;
        hover: Border;
      };
      danger: {
        base: Border;
        hover: Border;
      };
    };
    panels: {
      accented: {
        base: Border;
        hover: Border;
      };
      primary: {
        base: Border;
        hover: Border;
      };
      secondary: {
        base: Border;
        hover: Border;
      };
      tertiary: {
        base: Border;
        hover: Border;
      };
    };
  };

  motion: {
    entry: {
      slow?: string;
      regular?: string;
      fast?: string;
    };
    exit: {
      slow?: string;
      regular?: string;
      fast?: string;
    };
    interactive: {
      hover?: string;
      action?: string;
    };
    easings: {
      easeIn: {
        slow?: string;
        regular?: string;
        fast?: string;
      };
      easeOut: {
        slow?: string;
        regular?: string;
        fast?: string;
      };
      easeInOut: {
        slow?: string;
        regular?: string;
        fast?: string;
      };
    };
  };

  assets?: EXOAssets;

  breakpoints: {
    small: string;
    medium: string;
    large: string;
    xLarge: string;
    max: string;
  };

  static?: any;

  frameworkVars: T;

  byComponent: EXOComponentStyles;
};

declare global {
  interface EXOAssets {
    logo?: string;
  }
}
