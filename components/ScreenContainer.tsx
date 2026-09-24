import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Sparkles } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { radii } from '../theme/radii';

interface ScreenContainerProps {
  children: React.ReactNode;
  title?: string;
  stepIndicator?: string; // e.g. "03 / 08" or "Skill Analysis"
  onBack?: () => void;
  showBack?: boolean;
  scrollable?: boolean;
  footer?: React.ReactNode;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  title,
  stepIndicator,
  onBack,
  showBack = true,
  scrollable = true,
  footer,
}) => {
  return (
    <View style={styles.container}>
      {/* Subtle organic light canvas background */}
      <View style={styles.backgroundCanvas} pointerEvents="none">
        <LinearGradient
          colors={['#FFF2E0', '#FFFDF8']}
          style={styles.topAmbient}
        />
        <LinearGradient
          colors={['transparent', '#F4F9F2']}
          style={styles.bottomAmbient}
        />
      </View>

      {/* Top Header Bar */}
      <View style={styles.topHeader}>
        <View style={styles.leftHeader}>
          {showBack && onBack ? (
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButton}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Go back to previous screen"
            >
              <ArrowLeft size={18} color={colors.navy[900]} strokeWidth={2.4} />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholderBack} />
          )}

          {title && (
            <Text numberOfLines={1} style={styles.headerTitle}>
              {title}
            </Text>
          )}
        </View>

        {stepIndicator && (
          <View style={styles.stepBadge}>
            <Sparkles size={11} color={colors.orange[600]} />
            <Text style={styles.stepBadgeText}>{stepIndicator}</Text>
          </View>
        )}
      </View>

      {/* Content Area */}
      {scrollable ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.nonScrollContent}>{children}</View>
      )}

      {/* Optional Fixed Footer (e.g. Floating CTAs) */}
      {footer && <View style={styles.footerContainer}>{footer}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  backgroundCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topAmbient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    opacity: 0.6,
  },
  bottomAmbient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
    opacity: 0.7,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.xs,
    minHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240, 235, 224, 0.6)',
    backgroundColor: 'rgba(255, 253, 248, 0.85)',
    zIndex: 20,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECE5D8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    shadowColor: '#102A43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  placeholderBack: {
    width: 8,
  },
  headerTitle: {
    ...typography.h3,
    fontSize: 16,
    color: colors.navy[900],
    fontWeight: '700',
    flex: 1,
  },
  stepBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: radii.pill,
    gap: 4,
  },
  stepBadgeText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.orange[700],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.base,
    paddingBottom: spacing['4xl'],
  },
  nonScrollContent: {
    flex: 1,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.base,
    paddingBottom: spacing.base,
  },
  footerContainer: {
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.md,
    backgroundColor: 'rgba(255, 253, 248, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#F0EBE1',
    ...Platform.select({
      ios: {
        shadowColor: '#102A43',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
