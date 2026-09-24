import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { GlassCard } from '../components/GlassCard';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { radii } from '../theme/radii';
import { mockPathways, PathwayItem } from '../data/prototypeData';
import {
  Sun,
  Zap,
  Wrench,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
} from 'lucide-react-native';

interface RecommendationsScreenProps {
  onBack: () => void;
  onSelectPathway: (pathway: PathwayItem) => void;
}

export const RecommendationsScreen: React.FC<RecommendationsScreenProps> = ({
  onBack,
  onSelectPathway,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const getPathwayIcon = (id: string) => {
    switch (id) {
      case 'solar_pv':
        return <Sun size={20} color={colors.orange[600]} strokeWidth={2.4} />;
      case 'electrical_entrepreneur':
        return <Zap size={20} color={colors.green[600]} strokeWidth={2.4} />;
      case 'energy_equipment':
        return <Wrench size={20} color={colors.cyan[600]} strokeWidth={2.4} />;
      default:
        return <TrendingUp size={20} color={colors.orange[600]} strokeWidth={2.4} />;
    }
  };

  return (
    <ScreenContainer
      title="Recommended Pathways"
      stepIndicator="Step 05 / 08"
      onBack={onBack}
    >
      {/* Title & Introduction */}
      <AnimatedEntrance delay={100} distance={15}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>Paths that fit you</Text>
          <Text style={styles.subtitle}>
            Based on your skills, interests and goals.
          </Text>
        </View>
      </AnimatedEntrance>

      {/* "Why these paths?" Chips */}
      <AnimatedEntrance delay={180} distance={15}>
        <View style={styles.whySection}>
          <Text style={styles.whyLabel}>Why these paths?</Text>
          <View style={styles.whyChipsRow}>
            <View style={styles.whyChip}>
              <CheckCircle2 size={12} color={colors.green[700]} />
              <Text style={styles.whyChipText}>Your Skills: Electrical</Text>
            </View>
            <View style={styles.whyChip}>
              <Sparkles size={12} color={colors.orange[600]} />
              <Text style={styles.whyChipText}>Your Interest: Technical</Text>
            </View>
            <View style={styles.whyChip}>
              <Award size={12} color={colors.cyan[700]} />
              <Text style={styles.whyChipText}>Your Goal: Self-Reliance</Text>
            </View>
          </View>
        </View>
      </AnimatedEntrance>

      {/* 3 Distinct Pathway Recommendation Cards */}
      <View style={styles.cardsList}>
        {mockPathways.map((pathway: PathwayItem, index: number) => {
          const isTopMatch = pathway.highlighted;

          return (
            <AnimatedEntrance
              key={pathway.id}
              delay={250 + index * 120}
              distance={25}
            >
              <GlassCard
                tint={isTopMatch ? 'warm' : 'neutral'}
                style={[
                  styles.pathwayCard,
                  isTopMatch && styles.topMatchCard,
                ]}
              >
                {/* Header Row with Badge & Match Meter */}
                <View style={styles.cardHeader}>
                  <View style={styles.titleWithIcon}>
                    <View
                      style={[
                        styles.pathIconWrap,
                        {
                          backgroundColor: isTopMatch
                            ? '#FFEDD5'
                            : colors.navy[50],
                        },
                      ]}
                    >
                      {getPathwayIcon(pathway.id)}
                    </View>
                    <View style={styles.headerTextCol}>
                      <Text style={styles.pathwayTitle}>{pathway.title}</Text>
                      <Text style={styles.pathwayTitleHi}>{pathway.titleHi}</Text>
                    </View>
                  </View>

                  {/* Match Percentage Badge */}
                  <View
                    style={[
                      styles.matchPill,
                      isTopMatch && styles.matchPillTop,
                    ]}
                  >
                    <Text
                      style={[
                        styles.matchPercentageText,
                        isTopMatch && { color: colors.orange[700] },
                      ]}
                    >
                      {pathway.matchPercentage}%
                    </Text>
                    <Text style={styles.matchSubLabel}>Match</Text>
                  </View>
                </View>

                {/* Tags Row */}
                <View style={styles.tagsRow}>
                  {pathway.tags.map((tag, tIdx) => (
                    <View
                      key={tIdx}
                      style={[
                        styles.tagPill,
                        tIdx === 0 && isTopMatch && styles.tagPillPrimary,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          tIdx === 0 && isTopMatch && styles.tagTextPrimary,
                        ]}
                      >
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Short Explanation */}
                <Text style={styles.explanationText}>
                  {pathway.shortExplanation}
                </Text>

                {/* Quick Info Grid */}
                <View style={styles.quickInfoRow}>
                  <View style={styles.infoCol}>
                    <Text style={styles.infoLabel}>Duration</Text>
                    <Text style={styles.infoVal}>{pathway.duration}</Text>
                  </View>
                  <View style={styles.infoDivider} />
                  <View style={styles.infoCol}>
                    <Text style={styles.infoLabel}>Income Est.</Text>
                    <Text style={styles.infoVal}>{pathway.avgMonthlyIncome.split('/')[0]}</Text>
                  </View>
                  <View style={styles.infoDivider} />
                  <View style={styles.infoCol}>
                    <Text style={styles.infoLabel}>Support</Text>
                    <Text style={[styles.infoVal, { color: colors.green[700] }]}>100% GIA Grant</Text>
                  </View>
                </View>

                {/* Card CTA */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => onSelectPathway(pathway)}
                  style={[
                    styles.exploreBtn,
                    isTopMatch && styles.exploreBtnPrimary,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Explore ${pathway.title} pathway`}
                >
                  <Text
                    style={[
                      styles.exploreBtnText,
                      isTopMatch && styles.exploreBtnTextPrimary,
                    ]}
                  >
                    Explore Path Details
                  </Text>
                  <ArrowRight
                    size={16}
                    color={isTopMatch ? '#FFFFFF' : colors.navy[800]}
                    strokeWidth={2.4}
                  />
                </TouchableOpacity>
              </GlassCard>
            </AnimatedEntrance>
          );
        })}
      </View>

      {/* Prototype Sample Data Notice */}
      <View style={styles.prototypeNotice}>
        <ShieldCheck size={14} color={colors.navy[500]} />
        <Text style={styles.prototypeNoticeText}>
          Simulated AI pathways for SIH prototype evaluation. Aligned to National Skill Qualification Framework (NSQF).
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerBlock: {
    marginVertical: spacing.xs,
  },
  title: {
    ...typography.heroTitle,
    fontSize: 26,
    color: colors.navy[900],
  },
  subtitle: {
    ...typography.body,
    fontSize: 14.5,
    color: colors.navy[600],
    marginTop: 4,
  },
  whySection: {
    marginVertical: spacing.sm,
  },
  whyLabel: {
    ...typography.caption,
    fontSize: 11,
    color: colors.navy[500],
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  whyChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  whyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#E7DFD3',
    gap: 5,
  },
  whyChipText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.navy[800],
    fontWeight: '600',
  },
  cardsList: {
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  pathwayCard: {
    padding: 16,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: '#ECE4D8',
  },
  topMatchCard: {
    borderColor: '#FED7AA',
    backgroundColor: '#FFFDF9',
    shadowColor: colors.orange[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pathIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerTextCol: {
    flex: 1,
  },
  pathwayTitle: {
    ...typography.h3,
    fontSize: 16,
    color: colors.navy[900],
    fontWeight: '700',
  },
  pathwayTitleHi: {
    ...typography.caption,
    fontSize: 11,
    color: colors.navy[500],
  },
  matchPill: {
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  matchPillTop: {
    backgroundColor: '#FFF2E8',
    borderColor: '#FED7AA',
  },
  matchPercentageText: {
    ...typography.heroTitle,
    fontSize: 16,
    lineHeight: 18,
    color: colors.navy[900],
    fontWeight: '800',
  },
  matchSubLabel: {
    ...typography.caption,
    fontSize: 9,
    color: colors.navy[500],
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tagPill: {
    backgroundColor: '#F8FAF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tagPillPrimary: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  tagText: {
    ...typography.caption,
    fontSize: 10.5,
    color: colors.navy[700],
    fontWeight: '600',
  },
  tagTextPrimary: {
    color: '#92400E',
    fontWeight: '700',
  },
  explanationText: {
    ...typography.bodySmall,
    fontSize: 13,
    lineHeight: 19,
    color: colors.navy[700],
    marginBottom: 12,
  },
  quickInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EFE8DE',
  },
  infoCol: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    ...typography.caption,
    fontSize: 9.5,
    color: colors.navy[400],
  },
  infoVal: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.navy[800],
    marginTop: 1,
  },
  infoDivider: {
    width: 1,
    height: 18,
    backgroundColor: '#E7DFD3',
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: radii.pill,
    backgroundColor: '#F0EBE1',
    gap: 6,
  },
  exploreBtnPrimary: {
    backgroundColor: colors.orange[500],
  },
  exploreBtnText: {
    ...typography.button,
    fontSize: 14,
    color: colors.navy[900],
  },
  exploreBtnTextPrimary: {
    color: '#FFFFFF',
  },
  prototypeNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    gap: 8,
  },
  prototypeNoticeText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.navy[500],
    flex: 1,
    lineHeight: 15,
  },
});
