/**
 * Aajeevika Saathi - Brand & UI Color System
 * 
 * Aesthetic: HUMAN + FUTURISTIC + ORGANIC + INDIAN + PREMIUM + ACCESSIBLE
 * Theme: Warm Light Theme with Saffron, Growth Green, Trust Navy, and Sky Cyan AI accents.
 */

export const colors = {
  // Brand Warm Saffron / Orange (Action, warmth, primary CTAs)
  orange: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316', // Core Saffron
    600: '#EA580C',
    700: '#C2410C',
    gradient: ['#FB923C', '#EA580C'] as const,
    glow: 'rgba(249, 115, 22, 0.25)',
    soft: '#FFF2E8',
  },

  // Fresh Livelihood Green (Growth, livelihood, success, progress)
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A', // Core Growth Green
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    gradient: ['#22C55E', '#15803D'] as const,
    glow: 'rgba(34, 197, 94, 0.22)',
    soft: '#EDF9F1',
  },

  // Deep Trust Navy (Typography, authority, grounding, high contrast readability)
  navy: {
    50: '#F0F4F8',
    100: '#D9E2EC',
    200: '#BCCCDC',
    400: '#627D98',
    600: '#334E68',
    700: '#1E3A5F',
    800: '#173B57',
    900: '#102A43', // Core Deep Navy text
    950: '#0B1C2D',
  },

  // Sky / AI Cyan (Voice interaction, futuristic intelligence, subtle waves)
  cyan: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',
    600: '#0284C7',
    gradient: ['#38BDF8', '#0284C7'] as const,
    glow: 'rgba(56, 189, 248, 0.25)',
    soft: '#EEF8FD',
  },

  // Warm Off-White & Cream Surfaces (Never harsh pure white or dark cyberpunk)
  surface: {
    background: '#FFFDF9',     // Main warm canvas
    card: '#FFFFFF',           // Crisp foreground card
    cream: '#FAF6EE',          // Soft warm organic layer
    tintGreen: '#F4F9F2',      // Subtle growth tint
    tintOrange: '#FFF8F1',     // Subtle warm saffron tint
    glass: 'rgba(255, 255, 255, 0.85)',
    glassBorder: 'rgba(240, 235, 224, 0.8)',
    glassSubtle: 'rgba(255, 255, 255, 0.65)',
  },

  // Text Hierarchy
  text: {
    primary: '#102A43',        // High contrast navy
    secondary: '#486581',      // Medium navy slate
    muted: '#627D98',          // Soft assistive text
    inverse: '#FFFFFF',        // White on colored buttons
    accentOrange: '#EA580C',
    accentGreen: '#15803D',
    accentCyan: '#0284C7',
  },

  // UI Borders & Dividers
  border: {
    light: '#F0EBE1',
    medium: '#E2DCD2',
    accentOrange: '#FED7AA',
    accentGreen: '#BBF7D0',
    accentCyan: '#BAE6FD',
  },

  // Voice States
  voice: {
    idle: {
      core: '#FB923C',
      outer: '#FDBA74',
      glow: 'rgba(249, 115, 22, 0.2)',
    },
    listening: {
      core: '#22C55E',
      outer: '#86EFAC',
      glow: 'rgba(34, 197, 94, 0.3)',
    },
    thinking: {
      core: '#38BDF8',
      outer: '#7DD3FC',
      glow: 'rgba(56, 189, 248, 0.3)',
    },
    responding: {
      core: '#F97316',
      outer: '#22C55E',
      glow: 'rgba(249, 115, 22, 0.35)',
    },
  },
} as const;

export type ColorTheme = typeof colors;
