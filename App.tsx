import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowRight,
  Sparkles,
  Languages,
  BookOpen,
  Award,
  TrendingUp,
  X,
  Volume2,
  CheckCircle2,
  HeartHandshake,
} from 'lucide-react-native';

import { colors } from './theme/colors';
import { typography } from './theme/typography';
import { spacing } from './theme/spacing';
import { radii } from './theme/radii';
import {
  BrandLogo,
  HeroVisual,
  PrimaryButton,
  SecondaryButton,
  GlassCard,
  AnimatedEntrance,
  TrustBadge,
  VoiceState,
} from './components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [selectedLanguage, setSelectedLanguage] = useState<'hi' | 'en'>('hi');
  const [showHowItWorks, setShowHowItWorks] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Cycle voice state on interactive tap
  const handleVoiceOrbPress = () => {
    const states: VoiceState[] = ['idle', 'listening', 'thinking', 'responding'];
    const nextIndex = (states.indexOf(voiceState) + 1) % states.length;
    setVoiceState(states[nextIndex]);
  };

  const handleStartJourney = () => {
    // Interactive prototype feedback
    setVoiceState('listening');
    setHasStarted(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFDF8" />

        {/* Dynamic Light Theme Canvas with Organic Gradients */}
        <View style={styles.canvasBackground} pointerEvents="none">
          {/* Subtle Warm Saffron Ambient Glow (Top Left) */}
          <LinearGradient
            colors={['#FFF1E0', '#FFFDF8']}
            style={styles.topAmbientGradient}
          />
          {/* Subtle Growth Green Ambient Glow (Bottom Right) */}
          <LinearGradient
            colors={['transparent', '#F2F8EF']}
            style={styles.bottomAmbientGradient}
          />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* Top Bar: Brand Logo & Interactive Language/Accessibility Pill */}
          <AnimatedEntrance delay={100} distance={15}>
            <View style={styles.topBar}>
              <BrandLogo size="md" showTagline={false} />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedLanguage(l => (l === 'hi' ? 'en' : 'hi'))}
                style={styles.langPill}
                accessibilityRole="button"
                accessibilityLabel="Switch language between Hindi and English"
              >
                <Languages size={15} color={colors.navy[700]} />
                <Text style={styles.langText}>
                  {selectedLanguage === 'hi' ? 'हिन्दी • Eng' : 'Eng • हिन्दी'}
                </Text>
              </TouchableOpacity>
            </View>
          </AnimatedEntrance>

          {/* Social Impact Trust Badge */}
          <AnimatedEntrance delay={200} distance={15} style={styles.badgeRow}>
            <TrustBadge
              label="PM-AJAY GIA Component"
              sublabel="Voice-First Livelihood & Skilling"
            />
          </AnimatedEntrance>

          {/* Expressive Humanist Headline */}
          <AnimatedEntrance delay={300} distance={20} style={styles.headlineBlock}>
            <Text style={styles.headline}>
              {selectedLanguage === 'hi' ? (
                <>
                  <Text style={styles.headlineDark}>अपनी आवाज़ से पाएं </Text>
                  <Text style={styles.headlineHighlight}>सच्चा हुनर</Text>
                  <Text style={styles.headlineDark}> और नया मुकाम</Text>
                </>
              ) : (
                <>
                  <Text style={styles.headlineDark}>Turn Your </Text>
                  <Text style={styles.headlineHighlight}>Voice</Text>
                  <Text style={styles.headlineDark}> Into Real Opportunity</Text>
                </>
              )}
            </Text>

            <Text style={styles.taglineLine}>
              "Your Voice • Your Skills • A Brighter Tomorrow"
            </Text>

            <Text style={styles.supportingText}>
              Discover the skills, training and opportunities that can shape your
              next step. Designed for beneficiaries under PM-AJAY.
            </Text>
          </AnimatedEntrance>

          {/* Central Hero Visual: Interactive VoiceOrb + Resonating Waves + Floating Skills */}
          <AnimatedEntrance delay={400} distance={25} style={styles.heroWrapper}>
            <HeroVisual
              voiceState={voiceState}
              onVoicePress={handleVoiceOrbPress}
            />
          </AnimatedEntrance>

          {/* State Demo Helper Note */}
          <AnimatedEntrance delay={480} distance={15} style={styles.hintCardWrapper}>
            <GlassCard tint="warm" variant="subtle" style={styles.hintCard}>
              <View style={styles.hintRow}>
                <Sparkles size={16} color={colors.orange[600]} />
                <Text style={styles.hintCardText}>
                  Interactive Prototype: Tap the orb above to test{' '}
                  <Text style={styles.hintBold}>Idle</Text>,{' '}
                  <Text style={styles.hintBold}>Listening</Text>,{' '}
                  <Text style={styles.hintBold}>Thinking</Text>, and{' '}
                  <Text style={styles.hintBold}>Responding</Text>.
                </Text>
              </View>
            </GlassCard>
          </AnimatedEntrance>

          {/* Interactive Livelihood Journey Highlights (Value Proposition) */}
          <AnimatedEntrance delay={550} distance={20} style={styles.highlightsContainer}>
            <GlassCard style={styles.pathwayCard}>
              <View style={styles.pathwayHeader}>
                <View style={styles.pathwayIconWrap}>
                  <HeartHandshake size={18} color={colors.green[700]} />
                </View>
                <View style={styles.pathwayHeaderTextWrap}>
                  <Text style={styles.pathwayTitle}>Empowering Your Ambition</Text>
                  <Text style={styles.pathwaySub}>Tailored for GIA Beneficiaries</Text>
                </View>
              </View>

              <View style={styles.stepsRow}>
                <View style={styles.stepItem}>
                  <View style={[styles.stepDot, { backgroundColor: colors.orange[500] }]}>
                    <Text style={styles.stepDotText}>1</Text>
                  </View>
                  <Text style={styles.stepTitle}>Speak</Text>
                  <Text style={styles.stepDesc}>No complex forms</Text>
                </View>

                <View style={styles.stepDivider} />

                <View style={styles.stepItem}>
                  <View style={[styles.stepDot, { backgroundColor: colors.cyan[600] }]}>
                    <Text style={styles.stepDotText}>2</Text>
                  </View>
                  <Text style={styles.stepTitle}>Discover</Text>
                  <Text style={styles.stepDesc}>NSQF skill gaps</Text>
                </View>

                <View style={styles.stepDivider} />

                <View style={styles.stepItem}>
                  <View style={[styles.stepDot, { backgroundColor: colors.green[600] }]}>
                    <Text style={styles.stepDotText}>3</Text>
                  </View>
                  <Text style={styles.stepTitle}>Prosper</Text>
                  <Text style={styles.stepDesc}>Local livelihoods</Text>
                </View>
              </View>
            </GlassCard>
          </AnimatedEntrance>

          {/* Action CTAs */}
          <AnimatedEntrance delay={650} distance={25} style={styles.actionBlock}>
            <PrimaryButton
              label={hasStarted ? 'Listening to Your Voice...' : 'Start Your Journey'}
              subtitle="100% Free • Guided by PM-AJAY Saathi"
              onPress={handleStartJourney}
              icon={<ArrowRight size={20} color="#FFFFFF" strokeWidth={2.4} />}
              style={styles.primaryBtn}
            />

            <SecondaryButton
              label="Explore How It Works"
              icon={<BookOpen size={16} color={colors.navy[700]} />}
              onPress={() => setShowHowItWorks(true)}
              style={styles.secondaryBtn}
            />
          </AnimatedEntrance>

          {/* Footer Footnote */}
          <View style={styles.footerInfo}>
            <Text style={styles.footerText}>
              Ministry of Social Justice & Empowerment • Government of India
            </Text>
          </View>
        </ScrollView>

        {/* Modal: "Explore How It Works" (Interactive Demonstration) */}
        <Modal
          visible={showHowItWorks}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowHowItWorks(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>How Aajeevika Saathi Works</Text>
                  <Text style={styles.modalSubtitle}>From Voice to Sustainable Livelihood</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowHowItWorks(false)}
                  style={styles.closeBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Close dialog"
                >
                  <X size={20} color={colors.navy[700]} />
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.modalScroll}
                showsVerticalScrollIndicator={false}
              >
                {/* Step 1 */}
                <View style={styles.modalStepCard}>
                  <View style={[styles.modalStepBadge, { backgroundColor: colors.orange[100] }]}>
                    <Volume2 size={18} color={colors.orange[600]} />
                  </View>
                  <View style={styles.modalStepInfo}>
                    <Text style={styles.modalStepHeading}>1. Natural Voice Conversation</Text>
                    <Text style={styles.modalStepText}>
                      Speak freely in Hindi or your local dialect. No technical literacy or typing required.
                    </Text>
                  </View>
                </View>

                {/* Step 2 */}
                <View style={styles.modalStepCard}>
                  <View style={[styles.modalStepBadge, { backgroundColor: colors.cyan[100] }]}>
                    <Sparkles size={18} color={colors.cyan[600]} />
                  </View>
                  <View style={styles.modalStepInfo}>
                    <Text style={styles.modalStepHeading}>2. Deep Skill Profiling</Text>
                    <Text style={styles.modalStepText}>
                      Our AI understands your informal experiences, craft background, and personal aspirations.
                    </Text>
                  </View>
                </View>

                {/* Step 3 */}
                <View style={styles.modalStepCard}>
                  <View style={[styles.modalStepBadge, { backgroundColor: colors.green[100] }]}>
                    <Award size={18} color={colors.green[600]} />
                  </View>
                  <View style={styles.modalStepInfo}>
                    <Text style={styles.modalStepHeading}>3. NSQF-Aligned Skill Mapping</Text>
                    <Text style={styles.modalStepText}>
                      Pinpoints certified qualification courses and subsidies eligible under PM-AJAY GIA.
                    </Text>
                  </View>
                </View>

                {/* Step 4 */}
                <View style={styles.modalStepCard}>
                  <View style={[styles.modalStepBadge, { backgroundColor: '#FEE2E2' }]}>
                    <TrendingUp size={18} color="#DC2626" />
                  </View>
                  <View style={styles.modalStepInfo}>
                    <Text style={styles.modalStepHeading}>4. Local Livelihood Roadmap</Text>
                    <Text style={styles.modalStepText}>
                      Connects you directly to micro-credit, enterprise setup, and verified nearby job opportunities.
                    </Text>
                  </View>
                </View>

                <View style={styles.modalSuccessBanner}>
                  <CheckCircle2 size={18} color={colors.green[600]} />
                  <Text style={styles.modalSuccessText}>
                    Designed for maximum social impact with zero barrier to entry.
                  </Text>
                </View>
              </ScrollView>

              <PrimaryButton
                label="Got It, Let's Begin"
                onPress={() => {
                  setShowHowItWorks(false);
                  handleStartJourney();
                }}
                style={{ marginTop: spacing.md }}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  canvasBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topAmbientGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 380,
    opacity: 0.7,
  },
  bottomAmbientGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.sm,
    paddingBottom: spacing['4xl'],
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#EFE8DA',
    shadowColor: '#102A43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 6,
  },
  langText: {
    ...typography.caption,
    color: colors.navy[800],
    fontWeight: '700',
    fontSize: 12,
  },
  badgeRow: {
    marginTop: spacing.md,
    alignItems: 'flex-start',
  },
  headlineBlock: {
    marginTop: spacing.md,
  },
  headline: {
    ...typography.heroTitle,
    fontSize: SCREEN_WIDTH < 380 ? 25 : 30,
    lineHeight: SCREEN_WIDTH < 380 ? 33 : 38,
    letterSpacing: -0.6,
  },
  headlineDark: {
    color: colors.navy[900],
    fontWeight: '800',
  },
  headlineHighlight: {
    color: colors.orange[600],
    fontWeight: '800',
  },
  taglineLine: {
    ...typography.caption,
    fontSize: 13,
    color: colors.green[700],
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 0.2,
  },
  supportingText: {
    ...typography.body,
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.navy[600],
    marginTop: spacing.xs,
  },
  heroWrapper: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  hintCardWrapper: {
    marginVertical: spacing.xs,
  },
  hintCard: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radii.md,
    backgroundColor: '#FFFBF3',
    borderColor: '#FED7AA',
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hintCardText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.navy[800],
    flex: 1,
    lineHeight: 16,
  },
  hintBold: {
    fontWeight: '700',
    color: colors.orange[700],
  },
  highlightsContainer: {
    marginTop: spacing.sm,
  },
  pathwayCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: radii.lg,
    padding: 16,
    borderColor: '#ECE5D8',
  },
  pathwayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  pathwayIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.green[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  pathwayHeaderTextWrap: {
    flex: 1,
  },
  pathwayTitle: {
    ...typography.h3,
    fontSize: 15,
    lineHeight: 20,
    color: colors.navy[900],
    fontWeight: '700',
  },
  pathwaySub: {
    ...typography.caption,
    fontSize: 11,
    color: colors.navy[400],
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  stepDotText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  stepTitle: {
    ...typography.caption,
    fontWeight: '700',
    fontSize: 12,
    color: colors.navy[800],
  },
  stepDesc: {
    ...typography.caption,
    fontSize: 10,
    color: colors.navy[600],
    marginTop: 2,
    textAlign: 'center',
  },
  stepDivider: {
    width: 24,
    height: 1.5,
    backgroundColor: '#E7DFD3',
    alignSelf: 'center',
    marginBottom: 18,
  },
  actionBlock: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  primaryBtn: {
    width: '100%',
  },
  secondaryBtn: {
    width: '100%',
  },
  footerInfo: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.navy[400],
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 42, 67, 0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFDF9',
    borderTopLeftRadius: radii['2xl'],
    borderTopRightRadius: radii['2xl'],
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? spacing['3xl'] : spacing.xl,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.base,
  },
  modalTitle: {
    ...typography.h2,
    fontSize: 20,
    color: colors.navy[900],
    fontWeight: '800',
  },
  modalSubtitle: {
    ...typography.caption,
    fontSize: 13,
    color: colors.navy[600],
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0EBE1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: {
    marginVertical: spacing.xs,
  },
  modalStepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#F0EAE0',
    marginBottom: spacing.sm,
  },
  modalStepBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  modalStepInfo: {
    flex: 1,
  },
  modalStepHeading: {
    ...typography.bodyEmphasized,
    fontSize: 14,
    color: colors.navy[900],
    marginBottom: 4,
  },
  modalStepText: {
    ...typography.bodySmall,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.navy[600],
  },
  modalSuccessBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border.accentGreen,
    marginVertical: spacing.xs,
    gap: 8,
  },
  modalSuccessText: {
    ...typography.caption,
    color: colors.green[800],
    fontWeight: '600',
    flex: 1,
    fontSize: 12,
  },
});
