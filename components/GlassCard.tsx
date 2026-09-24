import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { radii } from '../theme/radii';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  tint?: 'neutral' | 'warm' | 'green' | 'cyan';
  variant?: 'elevated' | 'subtle' | 'borderless';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  tint = 'neutral',
  variant = 'elevated',
}) => {
  const getBackgroundColor = () => {
    switch (tint) {
      case 'warm':
        return '#FFFBF5';
      case 'green':
        return '#F5FBF6';
      case 'cyan':
        return '#F2FAFE';
      default:
        return 'rgba(255, 255, 255, 0.92)';
    }
  };

  const getBorderColor = () => {
    switch (tint) {
      case 'warm':
        return colors.border.accentOrange;
      case 'green':
        return colors.border.accentGreen;
      case 'cyan':
        return colors.border.accentCyan;
      default:
        return colors.border.light;
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: variant === 'borderless' ? 'transparent' : getBorderColor(),
        },
        variant === 'elevated' ? styles.elevated : styles.subtle,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    padding: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  elevated: {
    ...Platform.select({
      ios: {
        shadowColor: '#102A43',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.07,
        shadowRadius: 16,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  subtle: {
    ...Platform.select({
      ios: {
        shadowColor: '#102A43',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});
