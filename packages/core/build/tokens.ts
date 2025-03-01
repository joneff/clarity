/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { token, CdsTheme } from './token-utils';

const layout = {
  space: {
    xxs: token(2),
    xs: token(4),
    sm: token(6),
    md: token(12),
    lg: token(24),
    xl: token(48),
    xxl: token(96),
  },
  grid: {
    cols: token(12, { static: true }),
  },
  width: {
    xs: token('576px', { static: true }),
    sm: token('768px', { static: true }),
    md: token('992px', { static: true }),
    lg: token('1200px', { static: true }),
    xl: token('1440px', { static: true }),
  },
};

const space = {
  0: token(0),
  1: token(1),
  2: token(2),
  3: token(4),
  4: token(6),
  5: token(8),
  6: token(12),
  7: token(16),
  8: token(18),
  9: token(24),
  10: token(32),
  11: token(36),
  12: token(48),
  13: token(72),
};

const color = {
  black: token([0, 0, 0]),
  white: token([0, 0, 100]),
  green: {
    50: token([93, 80, 94]),
    100: token([93, 80, 83]),
    200: token([93, 80, 70]),
    300: token([93, 80, 56]),
    400: token([93, 80, 48]),
    500: token([93, 80, 44]),
    600: token([93, 80, 37]),
    700: token([93, 80, 28]),
    800: token([93, 80, 23]),
    900: token([93, 80, 17]),
    1000: token([93, 80, 12]),
  },
  blue: {
    50: token([198, 100, 95]),
    100: token([198, 100, 87]),
    200: token([198, 100, 78]),
    300: token([198, 100, 70]),
    400: token([198, 100, 59]),
    500: token([198, 100, 48]),
    600: token([198, 100, 43]),
    700: token([198, 100, 34]),
    800: token([198, 100, 27]),
    900: token([198, 100, 21]),
    1000: token([198, 100, 15]),
  },
  violet: {
    50: token([282, 100, 97]),
    100: token([282, 80, 91]),
    200: token([282, 73, 83]),
    300: token([282, 66, 74]),
    400: token([282, 60, 65]),
    500: token([282, 60, 57]),
    600: token([282, 60, 49]),
    700: token([283, 80, 36]),
    800: token([282, 100, 26]),
    900: token([282, 100, 19]),
    1000: token([282, 100, 14]),
  },
  red: {
    50: token([9, 100, 97]),
    100: token([9, 100, 94]),
    200: token([9, 100, 88]),
    300: token([9, 100, 79]),
    400: token([9, 100, 71]),
    500: token([9, 100, 65]),
    600: token([9, 100, 60]),
    700: token([9, 100, 44]),
    800: token([9, 100, 38]),
    900: token([9, 100, 28]),
    1000: token([9, 100, 22]),
  },
  ochre: {
    50: token([41, 100, 96]),
    100: token([41, 100, 92]),
    200: token([41, 100, 86]),
    300: token([41, 100, 78]),
    400: token([41, 100, 70]),
    500: token([40, 100, 59]),
    600: token([39, 100, 50]),
    700: token([38, 100, 42]),
    800: token([37, 100, 32]),
    900: token([36, 100, 27]),
    1000: token([35, 100, 19]),
  },
  lavender: {
    50: token([238, 100, 96]),
    100: token([238, 58, 88]),
    200: token([238, 53, 79]),
    300: token([238, 52, 70]),
    400: token([238, 58, 64]),
    500: token([238, 59, 58]),
    600: token([238, 60, 52]),
    700: token([238, 69, 45]),
    800: token([238, 100, 32]),
    900: token([238, 100, 22]),
    1000: token([238, 100, 14]),
  },
  azure: {
    50: token([211, 100, 95]),
    100: token([211, 100, 88]),
    200: token([211, 100, 81]),
    300: token([211, 100, 70]),
    400: token([211, 100, 62]),
    500: token([211, 100, 54]),
    600: token([211, 100, 46]),
    700: token([211, 100, 37]),
    800: token([211, 100, 26]),
    900: token([211, 100, 18]),
    1000: token([211, 100, 14]),
  },
  aqua: {
    50: token([184, 100, 96]),
    100: token([184, 100, 86]),
    200: token([184, 100, 75]),
    300: token([184, 100, 62]),
    400: token([184, 100, 48]),
    500: token([184, 100, 43]),
    600: token([184, 100, 34]),
    700: token([184, 100, 25]),
    800: token([184, 100, 18]),
    900: token([184, 100, 13]),
    1000: token([184, 100, 10]),
  },
  jade: {
    50: token([160, 83, 95]),
    100: token([160, 82, 88]),
    200: token([160, 78, 78]),
    300: token([160, 69, 65]),
    400: token([160, 69, 53]),
    500: token([160, 64, 45]),
    600: token([160, 69, 36]),
    700: token([160, 64, 30]),
    800: token([160, 100, 21]),
    900: token([160, 70, 21]),
    1000: token([160, 69, 19]),
  },
  yellow: {
    50: token([50, 100, 95]),
    100: token([50, 100, 84]),
    200: token([50, 100, 73]),
    300: token([50, 100, 57]),
    400: token([46, 100, 52]),
    500: token([44, 100, 47]),
    600: token([42, 100, 42]),
    700: token([40, 100, 35]),
    800: token([40, 100, 26]),
    900: token([40, 100, 18]),
    1000: token([40, 100, 13]),
  },
  tangerine: {
    50: token([25, 100, 95]),
    100: token([25, 100, 88]),
    200: token([25, 94, 78]),
    300: token([25, 100, 72]),
    400: token([25, 100, 62]),
    500: token([25, 100, 48]),
    600: token([25, 100, 41]),
    700: token([25, 100, 34]),
    800: token([25, 100, 25]),
    900: token([25, 100, 19]),
    1000: token([25, 100, 15]),
  },
  magenta: {
    50: token([345, 100, 95]),
    100: token([345, 100, 87]),
    200: token([345, 100, 79]),
    300: token([345, 100, 70]),
    400: token([345, 100, 61]),
    500: token([345, 81, 50]),
    600: token([345, 83, 40]),
    700: token([345, 91, 31]),
    800: token([345, 100, 24]),
    900: token([345, 100, 19]),
    1000: token([345, 100, 15]),
  },
  pink: {
    50: token([324, 100, 97]),
    100: token([324, 95, 91]),
    200: token([324, 84, 81]),
    300: token([324, 78, 70]),
    400: token([324, 78, 62]),
    500: token([324, 64, 51]),
    600: token([324, 80, 39]),
    700: token([324, 100, 30]),
    800: token([324, 100, 24]),
    900: token([324, 100, 18]),
    1000: token([324, 100, 15]),
  },
  warmGray: {
    50: token([282, 3, 97]),
    100: token([282, 3, 92]),
    200: token([282, 3, 84]),
    300: token([282, 3, 74]),
    400: token([282, 3, 63]),
    500: token([282, 3, 54]),
    600: token([282, 3, 43]),
    700: token([282, 3, 35]),
    800: token([282, 3, 28]),
    900: token([282, 3, 20]),
    1000: token([282, 3, 14]),
  },
  slate: {
    50: token([238, 20, 96]),
    100: token([238, 20, 91]),
    200: token([238, 20, 82]),
    300: token([238, 20, 73]),
    400: token([238, 20, 63]),
    500: token([238, 23, 56]),
    600: token([238, 24, 49]),
    700: token([238, 28, 38]),
    800: token([238, 28, 29]),
    900: token([238, 28, 22]),
    1000: token([238, 28, 14]),
  },
  ice: {
    50: token([211, 100, 97]),
    100: token([211, 58, 90]),
    200: token([211, 53, 81]),
    300: token([211, 49, 70]),
    400: token([211, 47, 62]),
    500: token([211, 47, 53]),
    600: token([211, 56, 44]),
    700: token([211, 69, 34]),
    800: token([211, 69, 27]),
    900: token([211, 100, 20]),
    1000: token([211, 100, 14]),
  },
  coolGray: {
    50: token([211, 20, 96]),
    100: token([211, 20, 90]),
    200: token([211, 20, 81]),
    300: token([211, 20, 72]),
    400: token([211, 20, 61]),
    500: token([211, 20, 53]),
    600: token([211, 20, 44]),
    700: token([211, 23, 36]),
    800: token([211, 30, 28]),
    900: token([211, 40, 22]),
    1000: token([211, 63, 14]),
  },
  tan: {
    50: token([41, 23, 96]),
    100: token([41, 22, 91]),
    200: token([41, 27, 82]),
    300: token([41, 23, 68]),
    400: token([41, 23, 58]),
    500: token([41, 20, 47]),
    600: token([41, 20, 40]),
    700: token([41, 20, 32]),
    800: token([41, 23, 26]),
    900: token([41, 23, 21]),
    1000: token([41, 22, 16]),
  },
  construction: {
    50: token([198, 36, 96]),
    100: token([198, 20, 91]),
    200: token([198, 14, 82]),
    300: token([198, 10, 71]),
    400: token([198, 9, 56]),
    500: token([198, 10, 46]),
    600: token([198, 14, 36]),
    700: token([198, 19, 28]),
    800: token([198, 23, 23]),
    900: token([198, 28, 18]),
    1000: token([198, 30, 15]),
  },
  gray: {
    0: token([0, 0, 100]),
    50: token([0, 0, 98]),
    100: token([0, 0, 95]),
    200: token([0, 0, 91]),
    300: token([0, 0, 87]),
    400: token([0, 0, 80]),
    500: token([0, 0, 70]),
    600: token([0, 0, 55]),
    700: token([0, 0, 40]),
    800: token([0, 0, 27]),
    900: token([0, 0, 20]),
    1000: token([0, 0, 0]),
  },
};

const typography = {
  color: {
    100: token(color.white),
    200: token(color.construction[600]), // placeholders
    300: token(color.construction[800]), // labels
    400: token(color.construction[900]), // headings
    500: token(color.black), // content
  },
  fontWeight: {
    // Clarity City is limited to a minimum weight of 300 and max weight of 600, tokens provide hooks for customization
    light: token('300'),
    regular: token('400'),
    medium: token('500'),
    semibold: token('600'),
    bold: token('600'),
    extrabold: token('600'),
  },
  fontSize: {
    0: token(10),
    1: token(11),
    2: token(12),
    3: token(13),
    4: token(14),
    5: token(16),
    6: token(20),
    7: token(24),
    8: token(32),
    9: token(40),
  },
  baseFontSize: token('125%'), // deprecated for removal in 6.0
  baseFontSizePx: token(20), // deprecated for removal in 6.0
  fontFamily: token("'Clarity City', 'Avenir Next', sans-serif"),
  headerFontFamily: token("'Clarity City', 'Avenir Next', sans-serif"),
  monospaceFontFamily: token('ui-monospace, Consolas, Menlo, Monaco, monospace'),
  topGapHeight: token('0.1475em'), // line-height eraser
  ascenderHeight: token('0.1703em'), // line-height eraser
  xHeight: token('0.517em'), // line-height eraser
  link: {
    color: {
      value: token(color.blue[800]),
      hover: token(color.blue[900]),
      visited: {
        value: token(color.lavender[600]),
        hover: token(color.lavender[700]),
      },
    },
  },
  body: {
    fontSize: token(14),
    lineHeight: token('1.42857em', { static: true }), // static for line height eraser calcs
    letterSpacing: token('-0.014286em'),
    fontWeight: token('400'),
  },
  display: {
    fontSize: token(40),
    lineHeight: token('1.1em', { static: true }),
    letterSpacing: token('-0.0125em'),
    fontWeight: token('400'),
  },
  heading: {
    fontSize: token(32),
    lineHeight: token('1.125em', { static: true }),
    letterSpacing: token('-0.0125em'),
    fontWeight: token('400'),
  },
  title: {
    fontSize: token(24),
    lineHeight: token('1.16667em', { static: true }),
    letterSpacing: token('-0.008333em'),
    fontWeight: token('400'),
  },
  section: {
    fontSize: token(20),
    lineHeight: token('1.2em', { static: true }),
    letterSpacing: token('-0.01em'),
    fontWeight: token('400'),
  },
  subsection: {
    fontSize: token(16),
    lineHeight: token('1.25em', { static: true }),
    letterSpacing: token('-0.0125em'),
    fontWeight: token('400'),
  },
  message: {
    fontSize: token(16),
    lineHeight: token('1.25em', { static: true }),
    letterSpacing: token('-0.0125em'),
    fontWeight: token(400),
  },
  secondary: {
    fontSize: token(13),
    lineHeight: token('1.23077em', { static: true }),
    letterSpacing: token('-0.007692em'),
    fontWeight: token('400'),
  },
  caption: {
    fontSize: token(11),
    lineHeight: token('1.454545em', { static: true }),
    letterSpacing: token('0.018182em'),
    fontWeight: token('400'),
  },
  smallcaption: {
    fontSize: token(10),
    lineHeight: token('1.2em', { static: true }),
    letterSpacing: token('0.05em'),
    fontWeight: token('500'),
  },
};

const animation = {
  duration: {
    instant: token('0s'),
    quickest: token('0.1s'),
    quicker: token('0.15s'),
    quick: token('0.2s'),
    secondary: token('0.3s'),
    primary: token('0.4s'),
    slow: token('0.5s'),
    slower: token('0.7s'),
    slowest: token('0.8s'),
  },
  easing: {
    primary: token('cubic-bezier(0,.99,0,.99)'),
    secondary: token('cubic-bezier(0, 1.5, 0.5, 1)'),
    loop: token('cubic-bezier(0.17, 0.4, 0.8, 0.79)'),
  },
};

const aliases = {
  object: {
    border: {
      radius: {
        100: token(4),
        200: token(12),
        300: token('50%'),
      },
      width: {
        100: token(1),
        200: token(2),
        300: token(3),
        400: token(4),
      },
      color: {
        value: token(color.construction[200]),
        tint: token(color.construction[100]),
        shade: token(color.construction[300]),
      },
    },
    shadow: {
      100: token('0 1px 3px 0 hsla(198, 30%, 15%, 0.5)'),
      200: token('0 1px 3px 0 hsla(198, 30%, 15%, 0.3)'),
      300: token('0 1px 3px 0 hsla(198, 30%, 15%, 0.2)'),
    },
    opacity: {
      0: token('hsla(0, 0%, 0%, 0)'),
      100: token('hsla(0, 0%, 0%, 0.2)'),
      200: token('hsla(0, 0%, 0%, 0.4)'),
      300: token('hsla(0, 0%, 0%, 0.6)'),
    },
    interaction: {
      outline: token('Highlight solid 2px'),
      outlineOffset: token('1px'),
      touchTarget: token(36),
      borderColor: token(color.construction[500]),
      background: {
        value: token(color.white),
        hover: token(color.blue[50]),
        active: token(color.blue[100]),
        selected: token(color.blue[50]),
        disabled: token(color.white),
        highlight: token(color.blue[700]),
      },
      color: {
        value: token(color.construction[700]),
        hover: token(color.construction[1000]),
        active: token(color.construction[1000]),
        selected: token(color.construction[700]),
        disabled: token(color.construction[300]),
      },
    },
    app: {
      background: token(color.gray[50]),
    },
    overlay: {
      background: token(color.white),
      backdropBackground: token('hsla(0, 0%, 0%, 0.6)'),
    },
    container: {
      background: {
        value: token(color.white),
        tint: token(color.construction[50]),
        shade: token(color.construction[100]),
      },
      borderColor: token(color.construction[200]),
    },
  },
  status: {
    info: {
      value: token(color.blue[700]),
      tint: token(color.blue[50]),
      shade: token(color.blue[800]),
    },
    success: {
      value: token(color.green[700]),
      tint: token(color.green[50]),
      shade: token(color.green[800]),
    },
    warning: {
      value: token(color.ochre[500]),
      tint: token(color.ochre[100]),
      shade: token(color.ochre[600]),
      dark: token(color.ochre[800]),
    },
    danger: {
      value: token(color.red[700]),
      tint: token(color.red[50]),
      shade: token(color.red[800]),
      dark: token(color.red[900]),
    },
    neutral: {
      value: token(color.construction[600]),
      tint: token(color.construction[50]),
      shade: token(color.construction[700]),
    },
    disabled: {
      value: token(color.construction[300]),
      tint: token(color.construction[200]),
      shade: token(color.construction[400]),
    },
    alt: {
      value: token(color.violet[700]),
      tint: token(color.violet[600]),
      shade: token(color.violet[900]),
    },
  },
};

export const baseTheme: CdsTheme = {
  global: { layout, space, color, typography, animation, base: token(20, { static: true }) },
  aliases,
};
