import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Path, Circle, Defs, RadialGradient as SvgRadialGradient, Stop } from 'react-native-svg';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { VoiceOrb, VoiceState } from './VoiceOrb';
import { Compass, Sparkles, TrendingUp } from 'lucide-react-native';

interface HeroVisualProps {
  voiceState: VoiceState;
  onVoicePress: () => void;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({
  voiceState,
  onVoicePress,
}) => {
  // Floating animation for skill chips
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createFloat = (val: Animated.Value, distance: number, dur: number, delay = 0) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, {
            toValue: -distance,
            duration: dur / 2,
            delay,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: distance,
            duration: dur / 2,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      );

    const f1 = createFloat(floatAnim1, 7, 3400, 0);
    const f2 = createFloat(floatAnim2, 8, 4200, 400);
    const f3 = createFloat(floatAnim3, 6, 3800, 200);

    f1.start();
    f2.start();
    f3.start();

    return () => {
      f1.stop();
      f2.stop();
      f3.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Background SVG Canvas: Soft Organic Petals & Resonant Waves */}
      <View style={styles.svgBackground}>
        <Svg width="100%" height="100%" viewBox="0 0 360 320" fill="none">
          <Defs>
            <SvgRadialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#FFF2DE" stopOpacity="0.8" />
              <Stop offset="70%" stopColor="#F8FAF5" stopOpacity="0.4" />
              <Stop offset="100%" stopColor="#FFFDF9" stopOpacity="0" />
            </SvgRadialGradient>
          </Defs>

          {/* Central Warm Ambient Glow */}
          <Circle cx="180" cy="160" r="140" fill="url(#sunGlow)" />

          {/* Abstract Growth Leaves / Uplift Curves (Green) */}
          <Path
            d="M 60 250 C 90 200 130 180 180 160 C 230 180 270 200 300 250"
            stroke="#DCFCE7"
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
          <Path
            d="M 100 270 C 130 220 180 200 260 270"
            stroke="#BBF7D0"
            strokeWidth="2"
            opacity={0.6}
          />

          {/* Resonant Voice Arcs (Saffron) */}
          <Path
            d="M 40 140 C 70 80 120 60 180 60 C 240 60 290 80 320 140"
            stroke="#FED7AA"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            strokeLinecap="round"
          />

          {/* Decorative Natural Sprout Dots */}
          <Circle cx="180" cy="50" r="3.5" fill={colors.orange[400]} />
          <Circle cx="70" cy="100" r="3" fill={colors.green[500]} />
          <Circle cx="290" cy="100" r="3" fill={colors.cyan[500]} />
        </Svg>
      </View>

      {/* Floating Micro-Chip 1: NSQF Alignment */}
      <Animated.View
        style={[
          styles.floatingChip,
          styles.chipLeft,
          { transform: [{ translateY: floatAnim1 }] },
        ]}
      >
        <View style={[styles.chipIcon, { backgroundColor: colors.green[100] }]}>
          <TrendingUp size={13} color={colors.green[700]} />
        </View>
        <Text style={styles.chipText}>NSQF Skilling</Text>
      </Animated.View>

      {/* Floating Micro-Chip 2: PM-AJAY Pathways */}
      <Animated.View
        style={[
          styles.floatingChip,
          styles.chipRight,
          { transform: [{ translateY: floatAnim2 }] },
        ]}
      >
        <View style={[styles.chipIcon, { backgroundColor: colors.orange[100] }]}>
          <Compass size={13} color={colors.orange[600]} />
        </View>
        <Text style={styles.chipText}>Local Livelihood</Text>
      </Animated.View>

      {/* Floating Micro-Chip 3: Voice-First AI */}
      <Animated.View
        style={[
          styles.floatingChip,
          styles.chipBottomRight,
          { transform: [{ translateY: floatAnim3 }] },
        ]}
      >
        <View style={[styles.chipIcon, { backgroundColor: colors.cyan[100] }]}>
          <Sparkles size={13} color={colors.cyan[600]} />
        </View>
        <Text style={styles.chipText}>Voice Powered</Text>
      </Animated.View>

      {/* The Central Interactive Voice Orb */}
      <VoiceOrb
        state={voiceState}
        onPress={onVoicePress}
        size={168}
        showStatusLabel={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 4,
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingChip: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F0EBE1',
    shadowColor: '#102A43',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  chipIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  chipText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.navy[800],
  },
  chipLeft: {
    top: 30,
    left: 12,
  },
  chipRight: {
    top: 40,
    right: 12,
  },
  chipBottomRight: {
    bottom: 24,
    left: 20,
  },
});
