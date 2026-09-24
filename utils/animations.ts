import { Animated, Easing } from 'react-native';

export const animationPresets = {
  // Spring configurations for tactile buttons
  pressSpring: {
    toValue: 0.96,
    useNativeDriver: true,
    speed: 50,
    bounciness: 4,
  },
  releaseSpring: {
    toValue: 1,
    useNativeDriver: true,
    speed: 30,
    bounciness: 8,
  },

  // Smooth timing presets
  fadeIn: (anim: Animated.Value, duration = 600, delay = 0) =>
    Animated.timing(anim, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),

  slideUp: (anim: Animated.Value, toValue = 0, duration = 600, delay = 0) =>
    Animated.timing(anim, {
      toValue,
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),

  pulseLoop: (anim: Animated.Value, min = 0.94, max = 1.06, duration = 2400) =>
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: max,
          duration: duration / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: min,
          duration: duration / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ),

  floatingLoop: (anim: Animated.Value, distance = 8, duration = 3000) =>
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: -distance,
          duration: duration / 2,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: distance,
          duration: duration / 2,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ),
};
