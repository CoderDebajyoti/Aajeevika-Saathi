import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { VoiceOrb, VoiceState } from '../components/VoiceOrb';
import { PrimaryButton } from '../components/PrimaryButton';
import { GlassCard } from '../components/GlassCard';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { radii } from '../theme/radii';
import { mockConversation } from '../data/prototypeData';
import { Volume2, User, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react-native';

interface ConversationScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export const ConversationScreen: React.FC<ConversationScreenProps> = ({
  onBack,
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalSteps = mockConversation.length;
  const currentStep = mockConversation[currentStepIndex];

  const handleNextQuestion = () => {
    setIsAnswering(true);
    // Simulate user speaking and AI processing
    setTimeout(() => {
      setIsAnswering(false);
      if (currentStepIndex < totalSteps - 1) {
        setCurrentStepIndex(i => i + 1);
      } else {
        setIsCompleted(true);
      }
    }, 1200);
  };

  const getVoiceState = (): VoiceState => {
    if (isCompleted) return 'idle';
    if (isAnswering) return 'listening';
    return 'responding';
  };

  return (
    <ScreenContainer
      title="Voice Conversation"
      stepIndicator={`Question 0${currentStepIndex + 1} / 0${totalSteps}`}
      onBack={onBack}
    >
      {/* Progress Bar */}
      <View style={styles.progressBarWrapper}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${((currentStepIndex + 1) / totalSteps) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.stepCounterText}>
          0{currentStepIndex + 1} / 0{totalSteps}
        </Text>
      </View>

      {/* VoiceOrb as central visual */}
      <View style={styles.orbWrapper}>
        <VoiceOrb
          state={getVoiceState()}
          size={145}
          showStatusLabel={false}
        />
      </View>

      {!isCompleted ? (
        <View style={styles.conversationContent}>
          {/* Saathi Voice Question Bubble */}
          <AnimatedEntrance key={`q-${currentStep.id}`} delay={50} distance={15}>
            <GlassCard tint="warm" style={styles.aiQuestionCard}>
              <View style={styles.cardSenderRow}>
                <View style={styles.aiAvatar}>
                  <Volume2 size={14} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <Text style={styles.senderName}>Saathi Voice</Text>
                <View style={styles.badgeVoice}>
                  <Text style={styles.badgeVoiceText}>Audio</Text>
                </View>
              </View>

              <Text style={styles.questionText}>"{currentStep.question}"</Text>
              <Text style={styles.questionHiText}>"{currentStep.questionHi}"</Text>
            </GlassCard>
          </AnimatedEntrance>

          {/* User Spoken Response Card */}
          <AnimatedEntrance key={`a-${currentStep.id}`} delay={200} distance={15}>
            <GlassCard tint="green" style={styles.userResponseCard}>
              <View style={styles.cardSenderRow}>
                <View style={styles.userAvatar}>
                  <User size={14} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <Text style={styles.senderName}>You (Rameshwar)</Text>
                <View style={styles.badgeRecorded}>
                  <Text style={styles.badgeRecordedText}>Recognized</Text>
                </View>
              </View>

              <Text style={styles.responseText}>"{currentStep.response}"</Text>
              <Text style={styles.responseHiText}>"{currentStep.responseHi}"</Text>

              {/* Real-time AI extraction chip */}
              <View style={styles.insightChip}>
                <Sparkles size={12} color={colors.cyan[700]} />
                <Text style={styles.insightText}>{currentStep.insight}</Text>
              </View>
            </GlassCard>
          </AnimatedEntrance>

          {/* Bottom Action to advance question */}
          <AnimatedEntrance delay={300} distance={15} style={styles.actionWrapper}>
            <PrimaryButton
              label={
                currentStepIndex < totalSteps - 1
                  ? 'Confirm & Next Question'
                  : 'Complete & Synthesize'
              }
              subtitle="Simulating native voice capture"
              icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} />}
              onPress={handleNextQuestion}
            />
          </AnimatedEntrance>
        </View>
      ) : (
        /* Conversation Completed Synthesis View */
        <AnimatedEntrance delay={100} distance={20} style={styles.completedWrapper}>
          <GlassCard tint="warm" style={styles.completedCard}>
            <View style={styles.successIconCircle}>
              <CheckCircle2 size={32} color={colors.green[600]} strokeWidth={2.4} />
            </View>

            <Text style={styles.completedTitle}>
              "Thanks. I have a good picture of where you are and where you want to go."
            </Text>

            <Text style={styles.completedBody}>
              Analyzed your agricultural background, Class 12 foundation, electrical repairs aptitude, and localized entrepreneurship goals.
            </Text>

            <View style={styles.summaryStatsRow}>
              <View style={styles.statPill}>
                <Text style={styles.statLabel}>Education</Text>
                <Text style={styles.statVal}>Class 12</Text>
              </View>
              <View style={styles.statPill}>
                <Text style={styles.statLabel}>Aptitude</Text>
                <Text style={styles.statVal}>Electrical</Text>
              </View>
              <View style={styles.statPill}>
                <Text style={styles.statLabel}>Mobility</Text>
                <Text style={styles.statVal}>Local (10km)</Text>
              </View>
            </View>
          </GlassCard>

          <View style={styles.actionWrapper}>
            <PrimaryButton
              label="Build My Profile"
              subtitle="Generate personalized livelihood profile"
              icon={<ArrowRight size={20} color="#FFFFFF" strokeWidth={2.4} />}
              onPress={onComplete}
            />
          </View>
        </AnimatedEntrance>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  progressBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: spacing.xs,
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F0EBE1',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.orange[500],
    borderRadius: 3,
  },
  stepCounterText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: colors.navy[700],
  },
  orbWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  conversationContent: {
    gap: spacing.md,
  },
  aiQuestionCard: {
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
  },
  userResponseCard: {
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
  },
  cardSenderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.orange[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.green[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  senderName: {
    ...typography.badge,
    fontSize: 12,
    color: colors.navy[900],
    fontWeight: '700',
    flex: 1,
  },
  badgeVoice: {
    backgroundColor: '#FFF2E8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  badgeVoiceText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.orange[700],
    fontWeight: '700',
  },
  badgeRecorded: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  badgeRecordedText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.green[700],
    fontWeight: '700',
  },
  questionText: {
    ...typography.bodyEmphasized,
    fontSize: 16,
    color: colors.navy[900],
    lineHeight: 22,
  },
  questionHiText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.navy[600],
    marginTop: 4,
    fontStyle: 'italic',
  },
  responseText: {
    ...typography.bodyEmphasized,
    fontSize: 15,
    color: colors.green[900],
    lineHeight: 21,
  },
  responseHiText: {
    ...typography.caption,
    fontSize: 12.5,
    color: colors.green[800],
    marginTop: 4,
    fontStyle: 'italic',
  },
  insightChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 249, 255, 0.9)',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.md,
    marginTop: 10,
    gap: 6,
  },
  insightText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.navy[700],
    fontWeight: '600',
    flex: 1,
  },
  actionWrapper: {
    marginTop: spacing.sm,
  },
  completedWrapper: {
    gap: spacing.md,
  },
  completedCard: {
    padding: 20,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
  },
  successIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.green[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  completedTitle: {
    ...typography.h3,
    fontSize: 18,
    color: colors.navy[900],
    textAlign: 'center',
    fontWeight: '800',
    lineHeight: 24,
  },
  completedBody: {
    ...typography.bodySmall,
    fontSize: 13.5,
    color: colors.navy[600],
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 19,
  },
  summaryStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0EBE1',
  },
  statPill: {
    alignItems: 'center',
  },
  statLabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.navy[400],
  },
  statVal: {
    ...typography.badge,
    fontSize: 12,
    fontWeight: '700',
    color: colors.navy[900],
    marginTop: 2,
  },
});
