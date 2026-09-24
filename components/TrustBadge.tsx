import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { ShieldCheck } from 'lucide-react-native';

interface TrustBadgeProps {
  label?: string;
  sublabel?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  label = 'PM-AJAY GIA Initiative',
  sublabel = 'Social Impact • Free & Guided',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <ShieldCheck size={14} color={colors.green[700]} strokeWidth={2.4} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.sublabel}>{sublabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 253, 244, 0.75)',
    borderWidth: 1,
    borderColor: colors.border.accentGreen,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
  },
  iconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.green[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  textContainer: {
    justifyContent: 'center',
  },
  label: {
    ...typography.badge,
    fontSize: 11,
    color: colors.green[800],
    fontWeight: '700',
  },
  sublabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.navy[600],
  },
});
