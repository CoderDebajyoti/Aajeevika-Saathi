import { TextStyle, Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'sans-serif',
});

export const typography = {
  fontFamily,

  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 34,
    '5xl': 40,
  },

  weights: {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semibold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
    heavy: '800' as TextStyle['fontWeight'],
  },

  // Semantic Typography Presets
  heroTitle: {
    fontFamily,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '800' as const,
    letterSpacing: -0.5,
  },
  
  heroTagline: {
    fontFamily,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
  },

  h1: {
    fontFamily,
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },

  h2: {
    fontFamily,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
  },

  h3: {
    fontFamily,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  },

  body: {
    fontFamily,
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '400' as const,
  },

  bodyEmphasized: {
    fontFamily,
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '600' as const,
  },

  bodySmall: {
    fontFamily,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
  },

  caption: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.3,
  },

  button: {
    fontFamily,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700' as const,
    letterSpacing: 0.1,
  },

  badge: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600' as const,
    letterSpacing: 0.4,
  },
};
