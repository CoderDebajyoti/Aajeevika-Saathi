import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
  Award,
  TrendingUp,
  MapPin,
  Clock,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react-native';

interface PathwayDetailScreenProps {
  pathway?: PathwayItem;
  onBack: () => void;
  onFindOpportunities: () => void;
}

export const PathwayDetailScreen: React.FC<PathwayDetailScreenProps> = ({
  pathway = mockPathways[0], // Defaults to Solar PV Technician
  onBack,
  onFindOpportunities,
}) => {
  return (
    <ScreenContainer
      title={pathway.title}
      stepIndicator="Step 06 / 08"
      onBack={onBack}
    >
      {/* Header Banner */}
      <AnimatedEntrance delay={100} distance={15}>
        <GlassCard tint="warm" style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroIconWrap}>
              <Sun size={24} color={colors.orange[600]} strokeWidth={2.4} />
            </View>
            <View style={styles.heroTextCol}>
              <Text style={styles.pathwayTitle}>{pathway.title}</Text>
              <Text style={styles.pathwayTitleHi}>{pathway.titleHi}</Text>
            </View>
            <View style={styles.matchBadge}>
              <Text style={styles.matchPercent}>{pathway.matchPercentage}%</Text>
              <Text style={styles.matchLabel}>Match</Text>
            </View>
          </View>

          <Text style={styles.fullDesc}>{pathway.fullDescription}</Text>

          {/* Quick Metrics */}
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Clock size={14} color={colors.navy[500]} />
              <Text style={styles.metricLabel}>{pathway.duration}</Text>
            </View>
            <View style={styles.metricItem}>
              <BookOpen size={14} color={colors.navy[500]} />
              <Text style={styles.metricLabel}>70% Practical</Text>
            </View>
            <View style={styles.metricItem}>
              <ShieldCheck size={14} color={colors.green[700]} />
              <Text style={[styles.metricLabel, { color: colors.green[800], fontWeight: '700' }]}>
                PM-AJAY 100% Free
              </Text>
            </View>
          </View>
        </GlassCard>
      </AnimatedEntrance>

      {/* "Why this fits you" Personalized Insight Card */}
      <AnimatedEntrance delay={200} distance={15} style={styles.sectionWrap}>
        <GlassCard tint="green" style={styles.fitCard}>
          <View style={styles.fitHeader}>
            <CheckCircle2 size={16} color={colors.green[700]} />
            <Text style={styles.fitTitle}>Why this fits you</Text>
          </View>
          <Text style={styles.fitBody}>
            {pathway.fitReason}
          </Text>
        </GlassCard>
      </AnimatedEntrance>

      {/* Visual Skilling Pathway Ladder (NSQF-Aligned) */}
      <AnimatedEntrance delay={300} distance={20} style={styles.sectionWrap}>
        <View style={styles.ladderContainer}>
          <Text style={styles.sectionHeaderTitle}>Visual NSQF Pathway</Text>
          <Text style={styles.sectionHeaderSub}>
            From where you stand to certified financial independence
          </Text>

          {/* Step 1: Your Skills */}
          <View style={styles.ladderStepRow}>
            <View style={[styles.ladderStepIcon, { backgroundColor: '#FEE2E2' }]}>
              <Zap size={16} color="#DC2626" />
            </View>
            <View style={styles.ladderStepContent}>
              <Text style={styles.ladderStepCategory}>YOUR FOUNDATION</Text>
              <Text style={styles.ladderStepName}>Electrical Basics & Farming</Text>
              <Text style={styles.ladderStepDesc}>Existing comfort with tools and circuits</Text>
            </View>
          </View>

          <View style={styles.ladderConnector} />

          {/* Step 2: Training */}
          <View style={styles.ladderStepRow}>
            <View style={[styles.ladderStepIcon, { backgroundColor: '#FFEDD5' }]}>
              <Sun size={16} color={colors.orange[600]} />
            </View>
            <View style={styles.ladderStepContent}>
              <Text style={[styles.ladderStepCategory, { color: colors.orange[700] }]}>6-MONTH TRAINING</Text>
              <Text style={styles.ladderStepName}>Solar PV Rooftop Installation</Text>
              <Text style={styles.ladderStepDesc}>DC wiring, invertor mapping & safety codes</Text>
            </View>
          </View>

          <View style={styles.ladderConnector} />

          {/* Step 3: Certification */}
          <View style={styles.ladderStepRow}>
            <View style={[styles.ladderStepIcon, { backgroundColor: colors.cyan[100] }]}>
              <Award size={16} color={colors.cyan[700]} />
            </View>
            <View style={styles.ladderStepContent}>
              <Text style={[styles.ladderStepCategory, { color: colors.cyan[700] }]}>NSQF LEVEL 4 CERTIFICATION</Text>
              <Text style={styles.ladderStepName}>National Skill Qualification Standard</Text>
              <Text style={styles.ladderStepDesc}>Govt-recognized badge recognized nationwide</Text>
            </View>
          </View>

          <View style={styles.ladderConnector} />

          {/* Step 4: Opportunity & Income */}
          <View style={styles.ladderStepRow}>
            <View style={[styles.ladderStepIcon, { backgroundColor: colors.green[100] }]}>
              <TrendingUp size={16} color={colors.green[700]} />
            </View>
            <View style={styles.ladderStepContent}>
              <Text style={[styles.ladderStepCategory, { color: colors.green[700] }]}>SUSTAINABLE LIVELIHOOD</Text>
              <Text style={styles.ladderStepName}>Local Installation & Service Enterprise</Text>
              <Text style={styles.ladderStepDesc}>Estimated ₹18,000 - ₹28,000 / month with toolkit grant</Text>
            </View>
          </View>
        </View>
      </AnimatedEntrance>

      {/* Primary Action */}
      <AnimatedEntrance delay={420} distance={20} style={styles.actionWrap}>
        <PrimaryButton
          label="Find Opportunities Nearby"
          subtitle="Explore local training centres within 10 km"
          icon={<MapPin size={18} color="#FFFFFF" strokeWidth={2.4} />}
          onPress={onFindOpportunities}
        />
      </AnimatedEntrance>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    padding: 18,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    backgroundColor: '#FFFDF9',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  heroTextCol: {
    flex: 1,
  },
  pathwayTitle: {
    ...typography.h2,
    fontSize: 18,
    color: colors.navy[900],
    fontWeight: '800',
  },
  pathwayTitleHi: {
    ...typography.caption,
    fontSize: 12,
    color: colors.navy[500],
  },
  matchBadge: {
    alignItems: 'center',
    backgroundColor: '#FFF2E8',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  matchPercent: {
    ...typography.heroTitle,
    fontSize: 17,
    lineHeight: 20,
    color: colors.orange[600],
    fontWeight: '800',
  },
  matchLabel: {
    ...typography.caption,
    fontSize: 9.5,
    color: colors.orange[700],
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  fullDesc: {
    ...typography.bodySmall,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.navy[700],
    marginTop: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0EBE0',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metricLabel: {
    ...typography.caption,
    fontSize: 11.5,
    color: colors.navy[700],
    fontWeight: '600',
  },
  sectionWrap: {
    marginTop: spacing.md,
  },
  fitCard: {
    padding: 14,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
  },
  fitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  fitTitle: {
    ...typography.bodyEmphasized,
    fontSize: 13,
    color: colors.green[800],
    fontWeight: '700',
  },
  fitBody: {
    ...typography.bodySmall,
    fontSize: 13,
    lineHeight: 18,
    color: colors.navy[700],
  },
  ladderContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: radii.xl,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECE4D8',
  },
  sectionHeaderTitle: {
    ...typography.h3,
    fontSize: 15,
    color: colors.navy[900],
    fontWeight: '700',
  },
  sectionHeaderSub: {
    ...typography.caption,
    fontSize: 11.5,
    color: colors.navy[500],
    marginBottom: 14,
  },
  ladderStepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ladderStepIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ladderStepContent: {
    flex: 1,
  },
  ladderStepCategory: {
    ...typography.caption,
    fontSize: 9.5,
    color: colors.navy[400],
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  ladderStepName: {
    ...typography.bodyEmphasized,
    fontSize: 13.5,
    color: colors.navy[900],
  },
  ladderStepDesc: {
    ...typography.caption,
    fontSize: 11,
    color: colors.navy[600],
    marginTop: 1,
  },
  ladderConnector: {
    width: 2,
    height: 18,
    backgroundColor: '#E7DFD3',
    marginLeft: 17,
    marginVertical: 3,
  },
  actionWrap: {
    marginTop: spacing.lg,
    paddingBottom: spacing.base,
  },
});
