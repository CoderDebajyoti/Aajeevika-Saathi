import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, G } from 'react-native-svg';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { Mic, Sparkles, Volume2, Waves } from 'lucide-react-native';

export type VoiceState = 'idle' | 'listening' | 'thinking' | 'responding';

interface VoiceOrbProps {
  state?: VoiceState;
  onPress?: () => void;
  size?: number;
  showStatusLabel?: boolean;
}

const STATE_CONFIG = {
  idle: {
    label: 'Tap to speak your thoughts',
    badge: 'Voice Assistant Ready',
    coreColors: ['#FB923C', '#EA580C'] as [string, string],
    outerGlow: 'rgba(249, 115, 22, 0.18)',
    ringBorder: 'rgba(249, 115, 22, 0.28)',
    accentColor: colors.orange[500],
    icon: Mic,
    speedMultiplier: 1,
  },
  listening: {
    label: 'Listening carefully...',
    badge: 'Listening to You',
    coreColors: ['#4ADE80', '#16A34A'] as [string, string],
    outerGlow: 'rgba(34, 197, 94, 0.22)',
    ringBorder: 'rgba(34, 197, 94, 0.35)',
    accentColor: colors.green[600],
    icon: Waves,
    speedMultiplier: 1.6,
  },
  thinking: {
    label: 'Analyzing skills & pathways...',
    badge: 'Connecting Pathways',
    coreColors: ['#38BDF8', '#0284C7'] as [string, string],
    outerGlow: 'rgba(56, 189, 248, 0.25)',
    ringBorder: 'rgba(56, 189, 248, 0.35)',
    accentColor: colors.cyan[600],
    icon: Sparkles,
    speedMultiplier: 2.2,
  },
  responding: {
    label: 'Aajeevika Saathi is speaking...',
    badge: 'Guiding Your Future',
    coreColors: ['#F97316', '#16A34A'] as [string, string],
    outerGlow: 'rgba(249, 115, 22, 0.28)',
    ringBorder: 'rgba(22, 163, 74, 0.35)',
    accentColor: colors.orange[600],
    icon: Volume2,
    speedMultiplier: 1.4,
  },
};

export const VoiceOrb: React.FC<VoiceOrbProps> = ({
  state = 'idle',
  onPress,
  size = 170,
  showStatusLabel = true,
}) => {
  const currentConfig = STATE_CONFIG[state];
  const IconComponent = currentConfig.icon;

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const outerPulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const waveBar1 = useRef(new Animated.Value(12)).current;
  const waveBar2 = useRef(new Animated.Value(22)).current;
  const waveBar3 = useRef(new Animated.Value(30)).current;
  const waveBar4 = useRef(new Animated.Value(18)).current;
  const waveBar5 = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    // Core Breathing Pulse
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1800 / currentConfig.speedMultiplier,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.96,
          duration: 1800 / currentConfig.speedMultiplier,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Subtle Outer Ring Expansion
    const outerPulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(outerPulseAnim, {
          toValue: 1.15,
          duration: 2400 / currentConfig.speedMultiplier,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(outerPulseAnim, {
          toValue: 1,
          duration: 2400 / currentConfig.speedMultiplier,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ])
    );

    // Slow orbital rotation for technology aura
    const rotateLoop = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 16000 / currentConfig.speedMultiplier,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Audio frequency waveform bar variations
    const makeWaveAnim = (val: Animated.Value, minH: number, maxH: number, dur: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, {
            toValue: maxH,
            duration: dur,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: false,
          }),
          Animated.timing(val, {
            toValue: minH,
            duration: dur,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: false,
          }),
        ])
      );

    const waveAnim1 = makeWaveAnim(waveBar1, 8, 28, 450);
    const waveAnim2 = makeWaveAnim(waveBar2, 14, 38, 380);
    const waveAnim3 = makeWaveAnim(waveBar3, 16, 44, 520);
    const waveAnim4 = makeWaveAnim(waveBar4, 12, 34, 410);
    const waveAnim5 = makeWaveAnim(waveBar5, 8, 26, 490);

    pulseLoop.start();
    outerPulseLoop.start();
    rotateLoop.start();
    waveAnim1.start();
    waveAnim2.start();
    waveAnim3.start();
    waveAnim4.start();
    waveAnim5.start();

    return () => {
      pulseLoop.stop();
      outerPulseLoop.stop();
      rotateLoop.stop();
      waveAnim1.stop();
      waveAnim2.stop();
      waveAnim3.stop();
      waveAnim4.stop();
      waveAnim5.stop();
    };
  }, [state]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const coreSize = size * 0.54;
  const midRingSize = size * 0.8;
  const outerRingSize = size;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onPress}
        style={[styles.container, { width: size + 30, height: size + 30 }]}
        accessibilityRole="button"
        accessibilityLabel={`Aajeevika Saathi voice assistant in ${state} mode`}
      >
        {/* Layer 1: Outermost Translucent Ambient Aura (Light Theme compatible) */}
        <Animated.View
          style={[
            styles.outerHalo,
            {
              width: outerRingSize,
              height: outerRingSize,
              backgroundColor: currentConfig.outerGlow,
              borderColor: currentConfig.ringBorder,
              transform: [{ scale: outerPulseAnim }],
            },
          ]}
        />

        {/* Layer 2: Rotating Organic Arcs (Waveform/Human Resonance) */}
        <Animated.View
          style={[
            styles.rotatingArcContainer,
            {
              width: midRingSize,
              height: midRingSize,
              transform: [{ rotate: spin }],
            },
          ]}
        >
          <Svg width={midRingSize} height={midRingSize} viewBox="0 0 100 100">
            {/* Saffron arc */}
            <Path
              d="M 20 50 A 30 30 0 0 1 80 50"
              stroke={colors.orange[400]}
              strokeWidth="2.5"
              strokeDasharray="8 6"
              strokeLinecap="round"
              fill="none"
              opacity={0.7}
            />
            {/* Green growth arc */}
            <Path
              d="M 80 50 A 30 30 0 0 1 20 50"
              stroke={colors.green[500]}
              strokeWidth="2.5"
              strokeDasharray="12 8"
              strokeLinecap="round"
              fill="none"
              opacity={0.7}
            />
            {/* Cyan spark nodes */}
            <Circle cx="80" cy="50" r="3.5" fill={colors.cyan[500]} />
            <Circle cx="20" cy="50" r="3.5" fill={colors.orange[500]} />
          </Svg>
        </Animated.View>

        {/* Layer 3: Middle Soft Frosted Ring */}
        <View
          style={[
            styles.middleRing,
            {
              width: midRingSize - 10,
              height: midRingSize - 10,
              borderColor: 'rgba(255, 255, 255, 0.9)',
            },
          ]}
        />

        {/* Layer 4: Animated Glowing Core */}
        <Animated.View
          style={[
            styles.coreGlowWrapper,
            {
              width: coreSize,
              height: coreSize,
              transform: [{ scale: pulseAnim }],
              shadowColor: currentConfig.accentColor,
            },
          ]}
        >
          <LinearGradient
            colors={currentConfig.coreColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.coreGradient, { borderRadius: coreSize / 2 }]}
          >
            {/* Interactive Audio Waveform Bars (Communicates voice & resonance) */}
            <View style={styles.waveBarsContainer}>
              <Animated.View
                style={[
                  styles.waveBar,
                  { height: waveBar1, backgroundColor: 'rgba(255, 255, 255, 0.85)' },
                ]}
              />
              <Animated.View
                style={[
                  styles.waveBar,
                  { height: waveBar2, backgroundColor: 'rgba(255, 255, 255, 0.95)' },
                ]}
              />
              <Animated.View
                style={[
                  styles.waveBar,
                  { height: waveBar3, backgroundColor: '#FFFFFF', width: 4.5 },
                ]}
              />
              <Animated.View
                style={[
                  styles.waveBar,
                  { height: waveBar4, backgroundColor: 'rgba(255, 255, 255, 0.95)' },
                ]}
              />
              <Animated.View
                style={[
                  styles.waveBar,
                  { height: waveBar5, backgroundColor: 'rgba(255, 255, 255, 0.85)' },
                ]}
              />
            </View>

            {/* Subtle Core Shimmer Overlay */}
            <View style={styles.shimmerBadge}>
              <IconComponent size={14} color="#FFFFFF" strokeWidth={2.5} />
            </View>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>

      {/* Status indicator and accessibility feedback */}
      {showStatusLabel && (
        <View style={styles.labelBlock}>
          <View style={styles.statusPill}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: currentConfig.accentColor },
              ]}
            />
            <Text style={styles.statusBadgeText}>{currentConfig.badge}</Text>
          </View>
          <Text style={styles.hintText}>{currentConfig.label}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  outerHalo: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 1.5,
  },
  rotatingArcContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleRing: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    ...Platform.select({
      ios: {
        shadowColor: '#102A43',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  coreGlowWrapper: {
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  coreGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  waveBarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 50,
  },
  waveBar: {
    width: 3.5,
    borderRadius: 4,
  },
  shimmerBadge: {
    position: 'absolute',
    bottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  labelBlock: {
    alignItems: 'center',
    marginTop: 10,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: '#102A43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },
  statusBadgeText: {
    ...typography.badge,
    fontSize: 12,
    color: colors.navy[800],
    fontWeight: '700',
  },
  hintText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.navy[600],
    marginTop: 6,
    fontWeight: '500',
  },
});
