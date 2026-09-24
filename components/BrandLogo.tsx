import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
}) => {
  const iconSize = size === 'sm' ? 36 : size === 'md' ? 48 : 60;
  const titleSize = size === 'sm' ? 18 : size === 'md' ? 22 : 28;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {/* Custom Brand Symbol: Human Heart/Hands + Leaf/Growth + Voice Wave */}
        <View style={[styles.iconWrapper, { width: iconSize, height: iconSize }]}>
          <Svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none">
            <Defs>
              {/* Saffron Gradient */}
              <SvgLinearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#FB923C" />
                <Stop offset="100%" stopColor="#EA580C" />
              </SvgLinearGradient>

              {/* Growth Green Gradient */}
              <SvgLinearGradient id="greenGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#4ADE80" />
                <Stop offset="100%" stopColor="#15803D" />
              </SvgLinearGradient>

              {/* Sky Cyan Gradient */}
              <SvgLinearGradient id="cyanGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#67E8F9" />
                <Stop offset="100%" stopColor="#0284C7" />
              </SvgLinearGradient>
            </Defs>

            {/* Background Halo */}
            <Circle cx="32" cy="32" r="30" fill="#FFF8F0" stroke="#FEE8D6" strokeWidth="1.5" />

            {/* Organic Growth Leaf (Right side - Green) */}
            <Path
              d="M32 46C32 46 47 43 47 27C47 17 38 15 32 15C32 23 35 34 32 46Z"
              fill="url(#greenGrad)"
              opacity="0.9"
            />

            {/* Human/Voice Rising Arc (Left side - Saffron) */}
            <Path
              d="M32 46C32 46 17 43 17 27C17 19 23 16 28 17C26 24 29 37 32 46Z"
              fill="url(#orangeGrad)"
            />

            {/* Central Sprout Core (Rising Sun / Soul) */}
            <Circle cx="32" cy="22" r="4.5" fill="#F97316" />

            {/* Voice Soundwaves (Cyan / Technology Accents) */}
            <Path
              d="M48 24C51 28 51 34 48 38"
              stroke="url(#cyanGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <Path
              d="M16 24C13 28 13 34 16 38"
              stroke="#FDBA74"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </Svg>
        </View>

        <View style={styles.textColumn}>
          <View style={styles.nameRow}>
            <Text style={[styles.brandTitlePrimary, { fontSize: titleSize }]}>Aajeevika </Text>
            <Text style={[styles.brandTitleSecondary, { fontSize: titleSize }]}>Saathi</Text>
          </View>
        </View>
      </View>

      {showTagline && (
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>
            <Text style={styles.taglineVoice}>Your Voice</Text>
            <Text style={styles.taglineDot}> • </Text>
            <Text style={styles.taglineSkills}>Your Skills</Text>
            <Text style={styles.taglineDot}> • </Text>
            <Text style={styles.taglineTomorrow}>A Brighter Tomorrow</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    shadowColor: colors.orange[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
  },
  textColumn: {
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitlePrimary: {
    ...typography.heroTitle,
    fontSize: 22,
    lineHeight: 28,
    color: colors.navy[900],
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  brandTitleSecondary: {
    ...typography.heroTitle,
    fontSize: 22,
    lineHeight: 28,
    color: colors.orange[600],
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  taglineContainer: {
    marginTop: 4,
    paddingLeft: spacing.xs,
  },
  tagline: {
    ...typography.caption,
    fontSize: 12,
    color: colors.navy[600],
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  taglineVoice: {
    color: colors.orange[600],
  },
  taglineSkills: {
    color: colors.green[700],
  },
  taglineTomorrow: {
    color: colors.navy[800],
  },
  taglineDot: {
    color: colors.orange[400],
    fontWeight: '700',
  },
});
