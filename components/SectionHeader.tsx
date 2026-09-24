import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  style?: ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        align === 'center' ? styles.centerAlign : styles.leftAlign,
        style,
      ]}
    >
      {badge && (
        <View style={styles.badgeWrapper}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}

      <Text
        style={[
          styles.title,
          align === 'center' ? styles.centerText : styles.leftText,
        ]}
      >
        {title}
      </Text>

      {subtitle && (
        <Text
          style={[
            styles.subtitle,
            align === 'center' ? styles.centerText : styles.leftText,
          ]}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  centerAlign: {
    alignItems: 'center',
  },
  leftAlign: {
    alignItems: 'flex-start',
  },
  badgeWrapper: {
    backgroundColor: '#FFF2E8',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
    marginBottom: 8,
  },
  badgeText: {
    ...typography.badge,
    fontSize: 11,
    color: colors.orange[700],
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    ...typography.heroTitle,
    fontSize: 28,
    lineHeight: 35,
    color: colors.navy[900],
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  subtitle: {
    ...typography.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.navy[600],
    marginTop: 8,
    maxWidth: 320,
  },
  centerText: {
    textAlign: 'center',
  },
  leftText: {
    textAlign: 'left',
  },
});
