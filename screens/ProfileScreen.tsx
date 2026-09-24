import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { GlassCard } from '../components/GlassCard';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { TrustBadge } from '../components/TrustBadge';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { radii } from '../theme/radii';
import { mockProfile } from '../data/prototypeData';
import {
  GraduationCap,
  Sprout,
  Zap,
  Target,
  MapPin,
  Flame,
  CheckCircle2,
  Edit3,
  X,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react-native';

interface ProfileScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  return (
    <ScreenContainer
      title="Livelihood Profile"
      stepIndicator="Step 03 / 08"
      onBack={onBack}
    >
      {/* Title & Introduction */}
      <AnimatedEntrance delay={100} distance={15}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>Here's what I understood.</Text>
          <Text style={styles.subtitle}>Your personalized livelihood profile</Text>
        </View>
      </AnimatedEntrance>

      {/* Verified Beneficiary Card Header */}
      <AnimatedEntrance delay={150} distance={15}>
        <View style={styles.beneficiaryBadgeRow}>
          <TrustBadge
            label="PM-AJAY GIA Candidate"
            sublabel="Direct Special Skilling Grant Eligible"
          />
        </View>
      </AnimatedEntrance>

      {/* Floating Organic Profile Cards */}
      <View style={styles.cardsGrid}>
        {/* Card 1: Education */}
        <AnimatedEntrance delay={200} distance={20}>
          <GlassCard tint="warm" style={styles.profileCard}>
            <View style={[styles.cardIconWrap, { backgroundColor: colors.orange[100] }]}>
              <GraduationCap size={18} color={colors.orange[700]} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Education</Text>
              <Text style={styles.cardValue}>{mockProfile.education}</Text>
            </View>
            <View style={styles.checkPill}>
              <CheckCircle2 size={13} color={colors.green[600]} />
            </View>
          </GlassCard>
        </AnimatedEntrance>

        {/* Card 2: Current Livelihood */}
        <AnimatedEntrance delay={280} distance={20}>
          <GlassCard tint="green" style={styles.profileCard}>
            <View style={[styles.cardIconWrap, { backgroundColor: colors.green[100] }]}>
              <Sprout size={18} color={colors.green[700]} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Current Livelihood</Text>
              <Text style={styles.cardValue}>{mockProfile.currentLivelihood}</Text>
            </View>
            <View style={styles.checkPill}>
              <CheckCircle2 size={13} color={colors.green[600]} />
            </View>
          </GlassCard>
        </AnimatedEntrance>

        {/* Card 3: Existing Skills */}
        <AnimatedEntrance delay={360} distance={20}>
          <GlassCard tint="neutral" style={styles.profileCard}>
            <View style={[styles.cardIconWrap, { backgroundColor: '#FEE2E2' }]}>
              <Zap size={18} color="#EA580C" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Existing Skills</Text>
              <View style={styles.skillsChipsRow}>
                {mockProfile.existingSkills.map((skill, idx) => (
                  <View key={idx} style={styles.skillChip}>
                    <Text style={styles.skillChipText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          </GlassCard>
        </AnimatedEntrance>

        {/* Card 4: Interests */}
        <AnimatedEntrance delay={440} distance={20}>
          <GlassCard tint="cyan" style={styles.profileCard}>
            <View style={[styles.cardIconWrap, { backgroundColor: colors.cyan[100] }]}>
              <Flame size={18} color={colors.cyan[700]} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Interest & Aspiration</Text>
              <View style={styles.skillsChipsRow}>
                {mockProfile.interest.map((item, idx) => (
                  <View key={idx} style={[styles.skillChip, { backgroundColor: colors.cyan[50], borderColor: colors.cyan[200] }]}>
                    <Text style={[styles.skillChipText, { color: colors.cyan[800] }]}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </GlassCard>
        </AnimatedEntrance>

        {/* Card 5: Mobility */}
        <AnimatedEntrance delay={520} distance={20}>
          <GlassCard tint="neutral" style={styles.profileCard}>
            <View style={[styles.cardIconWrap, { backgroundColor: '#E0E7FF' }]}>
              <MapPin size={18} color="#4F46E5" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Preferred Mobility</Text>
              <Text style={styles.cardValue}>{mockProfile.mobility}</Text>
            </View>
          </GlassCard>
        </AnimatedEntrance>

        {/* Card 6: Goal */}
        <AnimatedEntrance delay={600} distance={20}>
          <GlassCard tint="warm" style={[styles.profileCard, styles.goalCard]}>
            <View style={[styles.cardIconWrap, { backgroundColor: colors.orange[500] }]}>
              <Target size={18} color="#FFFFFF" />
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.cardLabel, { color: colors.orange[800] }]}>Primary Goal</Text>
              <Text style={[styles.cardValue, { color: colors.navy[900], fontWeight: '800' }]}>
                {mockProfile.goal}
              </Text>
            </View>
          </GlassCard>
        </AnimatedEntrance>
      </View>

      {/* Confirmation Block */}
      <AnimatedEntrance delay={680} distance={20} style={styles.bottomBlock}>
        <Text style={styles.confirmPrompt}>Does this look right?</Text>

        <View style={styles.actionRow}>
          <PrimaryButton
            label="Yes, Continue"
            subtitle="Analyze my skill landscape"
            icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} />}
            onPress={onContinue}
            style={styles.primaryBtn}
          />

          <SecondaryButton
            label="Edit Profile"
            icon={<Edit3 size={15} color={colors.navy[700]} />}
            onPress={() => setShowEditModal(true)}
            style={styles.secondaryBtn}
          />
        </View>
      </AnimatedEntrance>

      {/* Prototype Edit Modal */}
      <Modal
        visible={showEditModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <X size={18} color={colors.navy[800]} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalBody}>
              Profile editing will be available here in the full version. In this SIH prototype demonstration, you can proceed with the synthesized profile.
            </Text>
            <PrimaryButton
              label="Understood, Keep Profile"
              onPress={() => setShowEditModal(false)}
              style={{ marginTop: spacing.md }}
            />
          </View>
        </View>
      </Modal>
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
  beneficiaryBadgeRow: {
    marginVertical: spacing.sm,
  },
  cardsGrid: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: radii.lg,
  },
  goalCard: {
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    backgroundColor: '#FFFDF9',
  },
  cardIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    ...typography.caption,
    fontSize: 11,
    color: colors.navy[500],
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  cardValue: {
    ...typography.bodyEmphasized,
    fontSize: 14.5,
    color: colors.navy[900],
    marginTop: 2,
  },
  skillsChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 5,
  },
  skillChip: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2DCD2',
  },
  skillChipText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.navy[800],
  },
  checkPill: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.green[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBlock: {
    marginTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  confirmPrompt: {
    ...typography.h3,
    fontSize: 16,
    color: colors.navy[900],
    textAlign: 'center',
    marginBottom: spacing.md,
    fontWeight: '700',
  },
  actionRow: {
    gap: spacing.sm,
  },
  primaryBtn: {
    width: '100%',
  },
  secondaryBtn: {
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 42, 67, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.gutter,
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 360,
    shadowColor: '#102A43',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  modalTitle: {
    ...typography.h3,
    fontSize: 17,
    color: colors.navy[900],
  },
  modalBody: {
    ...typography.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.navy[600],
  },
});
