import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { VoiceOrb, VoiceState } from '../components/VoiceOrb';
import { PrimaryButton } from '../components/PrimaryButton';
import { GlassCard } from '../components/GlassCard';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { Sparkles, ArrowRight, Mic, CheckCircle2 } from 'lucide-react-native';

interface VoiceOnboardingScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export const VoiceOnboardingScreen: React.FC<VoiceOnboardingScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const [voicePhase, setVoicePhase] = useState<'ready' | 'listening' | 'understanding' | 'completed'>('ready');

  const getVoiceOrbState = (): VoiceState => {
    switch (voicePhase) {
      case 'listening':
        return 'listening';
      case 'understanding':
        return 'thinking';
      case 'completed':
        return 'responding';
      default:
        return 'idle';
    }
  };

  const handleStartTalking = () => {
    setVoicePhase('listening');
    // Simulated smooth transition through states
    setTimeout(() => {
      setVoicePhase('understanding');
    }, 2200);

    setTimeout(() => {
      setVoicePhase('completed');
    }, 4500);
  };

  return (
    <ScreenContainer
      title="Voice Onboarding"
      stepIndicator="Step 01 / 08"
      onBack={onBack}
    >
      {/* Screen Title & Motivation */}
      <AnimatedEntrance delay={100} distance={15}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>Let's get to know you.</Text>
          <Text style={styles.supportingText}>
            You don't need to fill long forms. Just speak naturally and tell Saathi about yourself.
          </Text>
        </View>
      </AnimatedEntrance>

      {/* Central Visual: VoiceOrb */}
      <AnimatedEntrance delay={250} distance={20} style={styles.orbWrapper}>
        <VoiceOrb
          state={getVoiceOrbState()}
          size={190}
          showStatusLabel={true}
          onPress={voicePhase === 'ready' ? handleStartTalking : undefined}
        />
      </AnimatedEntrance>

      {/* Voice Status Pill */}
      <AnimatedEntrance delay={350} distance={15} style={styles.statusBlock}>
        {voicePhase === 'ready' && (
          <View style={styles.statusPill}>
            <View style={[styles.statusDot, { backgroundColor: colors.orange[500] }]} />
            <Text style={styles.statusText}>Ready to listen</Text>
          </View>
        )}

        {voicePhase === 'listening' && (
          <View style={[styles.statusPill, { borderColor: colors.green[400] }]}>
            <View style={[styles.statusDot, { backgroundColor: colors.green[600] }]} />
            <Text style={[styles.statusText, { color: colors.green[700] }]}>
              Listening to your natural voice...
            </Text>
          </View>
        )}

        {voicePhase === 'understanding' && (
          <View style={[styles.statusPill, { borderColor: colors.cyan[400] }]}>
            <View style={[styles.statusDot, { backgroundColor: colors.cyan[600] }]} />
            <Text style={[styles.statusText, { color: colors.cyan[700] }]}>
              Understanding your dialect & background...
            </Text>
          </View>
        )}

        {voicePhase === 'completed' && (
          <View style={[styles.statusPill, { borderColor: colors.green[500], backgroundColor: '#F0FDF4' }]}>
            <CheckCircle2 size={14} color={colors.green[700]} />
            <Text style={[styles.statusText, { color: colors.green[800], fontWeight: '700' }]}>
              Voice Connected • Crystal Clear
            </Text>
          </View>
        )}
      </AnimatedEntrance>

      {/* Completed State Helper Card */}
      {voicePhase === 'completed' ? (
        <AnimatedEntrance delay={100} distance={15} style={styles.promptCardWrapper}>
          <GlassCard tint="warm" style={styles.promptCard}>
            <View style={styles.promptCardHeader}>
              <Sparkles size={18} color={colors.orange[600]} />
              <Text style={styles.promptCardTitle}>Voice Check Successful</Text>
            </View>
            <Text style={styles.promptCardBody}>
              "I'll ask you a few simple questions about your skills, work and goals. Speak freely in Hindi or any local dialect."
            </Text>
          </GlassCard>
        </AnimatedEntrance>
      ) : (
        <AnimatedEntrance delay={450} distance={15} style={styles.promptCardWrapper}>
          <GlassCard tint="neutral" variant="subtle" style={styles.promptCard}>
            <View style={styles.promptCardHeader}>
              <Mic size={16} color={colors.navy[600]} />
              <Text style={styles.promptCardTitle}>No Typing Needed</Text>
            </View>
            <Text style={styles.promptCardBody}>
              Tap "Start Talking" below. Saathi is trained to listen in over 12 Indian languages and dialects.
            </Text>
          </GlassCard>
        </AnimatedEntrance>
      )}

      {/* Actions */}
      <AnimatedEntrance delay={500} distance={20} style={styles.actionWrapper}>
        {voicePhase === 'completed' ? (
          <PrimaryButton
            label="Continue"
            subtitle="Begin 5 quick questions"
            icon={<ArrowRight size={20} color="#FFFFFF" strokeWidth={2.4} />}
            onPress={onContinue}
          />
        ) : (
          <PrimaryButton
            label={voicePhase === 'ready' ? 'Start Talking' : 'Calibrating Voice...'}
            subtitle={voicePhase === 'ready' ? 'Simulate voice connection' : 'Listening & Processing'}
            icon={<Mic size={20} color="#FFFFFF" strokeWidth={2.4} />}
            onPress={handleStartTalking}
            disabled={voicePhase !== 'ready'}
          />
        )}
      </AnimatedEntrance>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerBlock: {
    marginVertical: spacing.sm,
  },
  title: {
    ...typography.heroTitle,
    fontSize: 27,
    lineHeight: 34,
    color: colors.navy[900],
  },
  supportingText: {
    ...typography.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.navy[600],
    marginTop: spacing.xs,
  },
  orbWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  statusBlock: {
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ECE4D8',
    gap: 8,
    shadowColor: '#102A43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.navy[800],
    fontWeight: '600',
  },
  promptCardWrapper: {
    marginVertical: spacing.md,
  },
  promptCard: {
    padding: 16,
  },
  promptCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  promptCardTitle: {
    ...typography.bodyEmphasized,
    fontSize: 14,
    color: colors.navy[900],
  },
  promptCardBody: {
    ...typography.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.navy[700],
  },
  actionWrapper: {
    marginTop: spacing.lg,
  },
});
