import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { GlassCard } from '../components/GlassCard';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { SkillConstellation } from '../components/SkillConstellation';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { radii } from '../theme/radii';
import { mockSkills, mockOpportunityGap, SkillItem } from '../data/prototypeData';
import { Sun, ArrowRight, Sparkles, TrendingUp, Info } from 'lucide-react-native';

interface SkillLandscapeScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export const SkillLandscapeScreen: React.FC<SkillLandscapeScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(mockSkills[1]); // Default to Electrical

  return (
    <ScreenContainer
      title="Skill Landscape"
      stepIndicator="Step 04 / 08"
      onBack={onBack}
    >
      {/* Title & Introduction */}
      <AnimatedEntrance delay={100} distance={15}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>Your Skill Landscape</Text>
          <Text style={styles.subtitle}>
            Let's see what you already bring to the table.
          </Text>
        </View>
      </AnimatedEntrance>

      {/* Radial / Constellation Skill Web */}
      <AnimatedEntrance delay={200} distance={20}>
        <SkillConstellation
          selectedSkillId={selectedSkill.id}
          onSelectSkill={setSelectedSkill}
        />
      </AnimatedEntrance>

      {/* Active Skill Info Inspector Card */}
      <AnimatedEntrance delay={300} distance={15}>
        <GlassCard tint="neutral" style={styles.inspectorCard}>
          <View style={styles.inspectorHeader}>
            <View
              style={[
                styles.strengthDot,
                { backgroundColor: selectedSkill.color },
              ]}
            />
            <Text style={styles.inspectorTitle}>{selectedSkill.name}</Text>
            <View
              style={[
                styles.strengthBadge,
                { backgroundColor: `${selectedSkill.color}15` },
              ]}
            >
              <Text style={[styles.strengthBadgeText, { color: selectedSkill.color }]}>
                {selectedSkill.strength} Aptitude ({selectedSkill.score}%)
              </Text>
            </View>
          </View>
          <Text style={styles.inspectorDesc}>{selectedSkill.description}</Text>
        </GlassCard>
      </AnimatedEntrance>

      {/* Opportunity Gap Card (Highlight) */}
      <AnimatedEntrance delay={400} distance={20} style={styles.gapCardWrapper}>
        <GlassCard tint="warm" style={styles.opportunityGapCard}>
          <View style={styles.gapHeader}>
            <View style={styles.sunIconWrap}>
              <Sun size={20} color={colors.orange[600]} strokeWidth={2.4} />
            </View>
            <View style={styles.gapHeaderText}>
              <View style={styles.gapTag}>
                <Sparkles size={11} color={colors.orange[700]} />
                <Text style={styles.gapTagText}>Your Opportunity Gap</Text>
              </View>
              <Text style={styles.gapTitle}>{mockOpportunityGap.title}</Text>
            </View>
          </View>

          <Text style={styles.gapBody}>
            {mockOpportunityGap.highlightText}
          </Text>

          {/* Bridging Path Visual */}
          <View style={styles.bridgeRow}>
            <View style={styles.bridgeFrom}>
              <Text style={styles.bridgeFromLabel}>Current Foundation</Text>
              <Text style={styles.bridgeFromVal}>Basic Electrical</Text>
            </View>
            <View style={styles.bridgeArrow}>
              <ArrowRight size={14} color={colors.orange[600]} strokeWidth={2.5} />
            </View>
            <View style={styles.bridgeTo}>
              <Text style={styles.bridgeToLabel}>High-Growth Target</Text>
              <Text style={styles.bridgeToVal}>Solar PV Tech</Text>
            </View>
          </View>
        </GlassCard>
      </AnimatedEntrance>

      {/* Continue Action */}
      <AnimatedEntrance delay={500} distance={20} style={styles.actionBlock}>
        <PrimaryButton
          label="See My Pathways"
          subtitle="Explore 3 tailored skilling routes"
          icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} />}
          onPress={onContinue}
        />
      </AnimatedEntrance>
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
  inspectorCard: {
    padding: 12,
    borderRadius: radii.md,
    marginTop: spacing.xs,
    borderColor: '#E7DFD3',
  },
  inspectorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  strengthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  inspectorTitle: {
    ...typography.bodyEmphasized,
    fontSize: 14,
    color: colors.navy[900],
    flex: 1,
  },
  strengthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  strengthBadgeText: {
    ...typography.caption,
    fontSize: 10.5,
    fontWeight: '700',
  },
  inspectorDesc: {
    ...typography.bodySmall,
    fontSize: 12,
    lineHeight: 17,
    color: colors.navy[600],
  },
  gapCardWrapper: {
    marginTop: spacing.md,
  },
  opportunityGapCard: {
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    backgroundColor: '#FFFDF9',
  },
  gapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sunIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  gapHeaderText: {
    flex: 1,
  },
  gapTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gapTagText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: colors.orange[700],
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  gapTitle: {
    ...typography.h3,
    fontSize: 16,
    color: colors.navy[900],
    fontWeight: '800',
    marginTop: 2,
  },
  gapBody: {
    ...typography.bodySmall,
    fontSize: 13,
    lineHeight: 19,
    color: colors.navy[700],
    marginTop: 4,
  },
  bridgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: radii.md,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#F0E8DC',
  },
  bridgeFrom: {
    flex: 1,
  },
  bridgeFromLabel: {
    ...typography.caption,
    fontSize: 9.5,
    color: colors.navy[400],
  },
  bridgeFromVal: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: colors.navy[800],
    marginTop: 1,
  },
  bridgeArrow: {
    paddingHorizontal: 8,
  },
  bridgeTo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  bridgeToLabel: {
    ...typography.caption,
    fontSize: 9.5,
    color: colors.orange[600],
  },
  bridgeToVal: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: colors.orange[700],
    marginTop: 1,
  },
  actionBlock: {
    marginTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
});
