import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { GlassCard } from '../components/GlassCard';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { CurvedRoadmap } from '../components/CurvedRoadmap';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { radii } from '../theme/radii';
import {
  MapPin,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Phone,
  X,
  Compass,
} from 'lucide-react-native';

interface LivelihoodRoadmapScreenProps {
  onBack: () => void;
  onRestart: () => void;
}

export const LivelihoodRoadmapScreen: React.FC<LivelihoodRoadmapScreenProps> = ({
  onBack,
  onRestart,
}) => {
  const [showEnquiryModal, setShowEnquiryModal] = useState<boolean>(false);

  return (
    <ScreenContainer
      title="Livelihood Roadmap"
      stepIndicator="Hero Milestone 08 / 08"
      onBack={onBack}
    >
      {/* Title & Introduction */}
      <AnimatedEntrance delay={100} distance={15}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>Your Livelihood Path</Text>
          <Text style={styles.subtitle}>
            From where you are today to where you want to go.
          </Text>
        </View>
      </AnimatedEntrance>

      {/* Progress Status Bar */}
      <AnimatedEntrance delay={180} distance={15}>
        <View style={styles.statusBanner}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Completed</Text>
            <View style={styles.statusRow}>
              <CheckCircle2 size={13} color={colors.green[600]} />
              <Text style={styles.statusValue}>Profile & Gap Analysis</Text>
            </View>
          </View>
          <View style={styles.statusDivider} />
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.orange[600] }]}>Current Stage</Text>
            <View style={styles.statusRow}>
              <Sparkles size={13} color={colors.orange[600]} />
              <Text style={[styles.statusValue, { color: colors.orange[700], fontWeight: '800' }]}>
                Solar Training
              </Text>
            </View>
          </View>
        </View>
      </AnimatedEntrance>

      {/* Hero Visual: Curved Organic Roadmap */}
      <AnimatedEntrance delay={280} distance={20}>
        <CurvedRoadmap />
      </AnimatedEntrance>

      {/* Bottom Highlighted "Your Next Step" Recommendation Card */}
      <AnimatedEntrance delay={400} distance={25} style={styles.nextStepWrap}>
        <GlassCard tint="warm" style={styles.nextStepCard}>
          <View style={styles.nextStepHeader}>
            <View style={styles.nextBadge}>
              <Sparkles size={12} color={colors.orange[700]} />
              <Text style={styles.nextBadgeText}>YOUR IMMEDIATE NEXT STEP</Text>
            </View>
            <View style={styles.distPill}>
              <MapPin size={12} color={colors.orange[600]} />
              <Text style={styles.distText}>2.4 km away</Text>
            </View>
          </View>

          <Text style={styles.nextCentreTitle}>Pradhan Mantri Kaushal Kendra (PMKK)</Text>
          <Text style={styles.nextCentreDesc}>
            Batch begins on 1st of next month. 8 beneficiary seats remaining under PM-AJAY 100% grant.
          </Text>

          <View style={styles.benefitsRow}>
            <View style={styles.benefitChip}>
              <CheckCircle2 size={11} color={colors.green[600]} />
              <Text style={styles.benefitText}>100% Free Training</Text>
            </View>
            <View style={styles.benefitChip}>
              <CheckCircle2 size={11} color={colors.green[600]} />
              <Text style={styles.benefitText}>₹1,500/mo Travel Aid</Text>
            </View>
            <View style={styles.benefitChip}>
              <CheckCircle2 size={11} color={colors.green[600]} />
              <Text style={styles.benefitText}>Toolkit Provided</Text>
            </View>
          </View>

          <View style={styles.cardActions}>
            <PrimaryButton
              label="Explore Opportunity Details"
              subtitle="Register interest for PMKK batch"
              icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} />}
              onPress={() => setShowEnquiryModal(true)}
            />
          </View>
        </GlassCard>
      </AnimatedEntrance>

      {/* End of Prototype Options */}
      <AnimatedEntrance delay={500} distance={20} style={styles.footerActions}>
        <SecondaryButton
          label="Restart Prototype Journey"
          icon={<RotateCcw size={15} color={colors.navy[700]} />}
          onPress={onRestart}
        />
      </AnimatedEntrance>

      {/* Prototype Registration Modal */}
      <Modal
        visible={showEnquiryModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowEnquiryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seat Reservation Simulated</Text>
              <TouchableOpacity onPress={() => setShowEnquiryModal(false)}>
                <X size={18} color={colors.navy[800]} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalSuccessBanner}>
              <CheckCircle2 size={24} color={colors.green[600]} />
              <Text style={styles.modalSuccessText}>
                Rameshwar Kumar's voice profile has been mapped to PMKK Centre batch #SPV-401!
              </Text>
            </View>

            <Text style={styles.modalDetailsText}>
              In the live system, an automated SMS & IVR call in Hindi will be dispatched to the beneficiary with batch timings and nodal officer contact.
            </Text>

            <PrimaryButton
              label="Return to Roadmap"
              onPress={() => setShowEnquiryModal(false)}
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
    fontSize: 27,
    color: colors.navy[900],
  },
  subtitle: {
    ...typography.body,
    fontSize: 14.5,
    color: colors.navy[600],
    marginTop: 4,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: 12,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: '#ECE4D8',
    shadowColor: '#102A43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statusItem: {
    flex: 1,
  },
  statusLabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.navy[400],
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  statusValue: {
    ...typography.caption,
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.navy[900],
  },
  statusDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E7DFD3',
    marginHorizontal: 12,
  },
  nextStepWrap: {
    marginTop: spacing.md,
  },
  nextStepCard: {
    padding: 18,
    borderRadius: radii.xl,
    borderWidth: 2,
    borderColor: '#FED7AA',
    backgroundColor: '#FFFDF9',
    shadowColor: colors.orange[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  nextStepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nextBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  nextBadgeText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: colors.orange[800],
  },
  distPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.orange[700],
  },
  nextCentreTitle: {
    ...typography.h3,
    fontSize: 16,
    color: colors.navy[900],
    fontWeight: '800',
  },
  nextCentreDesc: {
    ...typography.bodySmall,
    fontSize: 13,
    lineHeight: 18,
    color: colors.navy[700],
    marginTop: 4,
  },
  benefitsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 12,
  },
  benefitChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    gap: 4,
  },
  benefitText: {
    ...typography.caption,
    fontSize: 10.5,
    color: colors.green[800],
    fontWeight: '700',
  },
  cardActions: {
    marginTop: spacing.xs,
  },
  footerActions: {
    marginVertical: spacing.xl,
    paddingBottom: spacing.lg,
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
    marginBottom: spacing.md,
  },
  modalTitle: {
    ...typography.h3,
    fontSize: 17,
    color: colors.navy[900],
  },
  modalSuccessBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    gap: 10,
    marginBottom: spacing.sm,
  },
  modalSuccessText: {
    ...typography.bodyEmphasized,
    fontSize: 13,
    color: colors.green[900],
    flex: 1,
    lineHeight: 18,
  },
  modalDetailsText: {
    ...typography.bodySmall,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.navy[600],
  },
});
