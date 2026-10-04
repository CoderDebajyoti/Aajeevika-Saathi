import { Easing } from 'react-native';

export const animations = {
  // Core Durations
  durations: {
    fast: 150,
    normal: 300,
    slow: 500,
    verySlow: 800,
  },

  // Easings (Organic + Fluid)
  easing: {
    // Standard fluid ease
    standard: Easing.bezier(0.4, 0.0, 0.2, 1.0),
    // Entrance: starts quick, settles softly
    entrance: Easing.bezier(0.0, 0.0, 0.2, 1.0),
    // Exit: accelerates gently
    exit: Easing.bezier(0.4, 0.0, 1.0, 1.0),
    // Bouncy organic interactions
    elastic: Easing.elastic(1),
  },

  // Springs for Reanimated/React Native Animated
  springs: {
    snappy: { damping: 20, mass: 1, stiffness: 200, overshootClamping: false },
    bouncy: { damping: 10, mass: 1, stiffness: 100, overshootClamping: false },
    soft: { damping: 15, mass: 1, stiffness: 80, overshootClamping: true },
  },

  // Semantic Presets (Animation Language)
  presets: {
    pageTransitions: {
      duration: 300,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1.0),
    },
    voiceWave: {
      duration: 800,
      easing: Easing.inOut(Easing.ease),
    },
    aiProcessing: {
      duration: 500,
      easing: Easing.linear,
    },
    cardAnimations: {
      spring: { damping: 15, mass: 1, stiffness: 120 },
    },
    progressAnimation: {
      duration: 600,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1.0),
    },
    microInteractions: {
      spring: { damping: 20, mass: 1, stiffness: 250 },
    }
  }
};
