import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Svg, { Line, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { mockSkills, SkillItem } from '../data/prototypeData';
import { Award, Zap, Sprout, Smartphone, Briefcase } from 'lucide-react-native';

interface SkillConstellationProps {
  onSelectSkill?: (skill: SkillItem) => void;
  selectedSkillId?: string;
}

export const SkillConstellation: React.FC<SkillConstellationProps> = ({
  onSelectSkill,
  selectedSkillId,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.95,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    const floatLoop1 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: -5,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim1, {
          toValue: 5,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    );

    const floatLoop2 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: 6,
          duration: 2600,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim2, {
          toValue: -6,
          duration: 2600,
          useNativeDriver: true,
        }),
      ])
    );

    pulseLoop.start();
    floatLoop1.start();
    floatLoop2.start();

    return () => {
      pulseLoop.stop();
      floatLoop1.stop();
      floatLoop2.stop();
    };
  }, []);

  const getSkillIcon = (id: string, color: string) => {
    switch (id) {
      case 'agriculture':
        return <Sprout size={16} color={color} />;
      case 'electrical':
        return <Zap size={16} color={color} />;
      case 'problem_solving':
        return <Award size={16} color={color} />;
      case 'digital':
        return <Smartphone size={16} color={color} />;
      case 'entrepreneurship':
        return <Briefcase size={16} color={color} />;
      default:
        return <Award size={16} color={color} />;
    }
  };

  // Node positions on the 320x300 constellation field
  const nodes = [
    { skill: mockSkills[0], x: 70, y: 70, anim: floatAnim1, size: 76 },     // Agriculture (Top Left)
    { skill: mockSkills[1], x: 250, y: 65, anim: floatAnim2, size: 74 },    // Electrical (Top Right)
    { skill: mockSkills[2], x: 55, y: 220, anim: floatAnim2, size: 68 },    // Problem Solving (Bottom Left)
    { skill: mockSkills[3], x: 265, y: 205, anim: floatAnim1, size: 66 },   // Digital (Bottom Right)
    { skill: mockSkills[4], x: 160, y: 245, anim: floatAnim2, size: 64 },   // Entrepreneurship (Bottom Center)
  ];

  return (
    <View style={styles.container}>
      {/* SVG Connecting Constellation Lines */}
      <View style={styles.svgOverlay} pointerEvents="none">
        <Svg width="100%" height="100%" viewBox="0 0 320 300">
          <Defs>
            <RadialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#FFF2DE" stopOpacity="0.9" />
              <Stop offset="100%" stopColor="#FFFDF9" stopOpacity="0" />
            </RadialGradient>
          </Defs>

          {/* Ambient Glow */}
          <Circle cx="160" cy="140" r="100" fill="url(#coreGlow)" />

          {/* Constellation web lines from center (160, 140) to nodes */}
          <Line x1="160" y1="140" x2="70" y2="70" stroke="#BBF7D0" strokeWidth="2" strokeDasharray="4 4" />
          <Line x1="160" y1="140" x2="250" y2="65" stroke="#FED7AA" strokeWidth="2.5" />
          <Line x1="160" y1="140" x2="55" y2="220" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="5 5" />
          <Line x1="160" y1="140" x2="265" y2="205" stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="4 4" />
          <Line x1="160" y1="140" x2="160" y2="245" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Cross interconnection between related skills (Electrical to Agriculture & Entrepreneurship) */}
          <Line x1="70" y1="70" x2="250" y2="65" stroke="#E2E8F0" strokeWidth="1.2" opacity={0.6} />
          <Line x1="250" y1="65" x2="160" y2="245" stroke="#FED7AA" strokeWidth="1.5" strokeDasharray="3 3" />
        </Svg>
      </View>

      {/* Central Identity Core */}
      <Animated.View
        style={[
          styles.centralCore,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <View style={styles.centralCoreInner}>
          <Text style={styles.coreTitle}>YOU</Text>
          <Text style={styles.coreSubtitle}>Core Aptitude</Text>
        </View>
      </Animated.View>

      {/* Interactive Skill Bubbles */}
      {nodes.map(({ skill, x, y, anim, size }) => {
        const isSelected = selectedSkillId === skill.id;

        return (
          <Animated.View
            key={skill.id}
            style={[
              styles.nodeWrapper,
              {
                left: x - size / 2,
                top: y - size / 2,
                transform: [{ translateY: anim }],
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onSelectSkill && onSelectSkill(skill)}
              style={[
                styles.skillBubble,
                {
                  width: size,
                  height: size,
                  borderColor: isSelected ? skill.color : 'rgba(230, 220, 205, 0.9)',
                  borderWidth: isSelected ? 2.5 : 1.5,
                  shadowColor: skill.color,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`${skill.name} - ${skill.strength}`}
            >
              <View style={[styles.iconWrap, { backgroundColor: `${skill.color}15` }]}>
                {getSkillIcon(skill.id, skill.color)}
              </View>

              <Text numberOfLines={1} style={styles.skillName}>
                {skill.name}
              </Text>

              <View
                style={[
                  styles.strengthPill,
                  { backgroundColor: `${skill.color}20` },
                ]}
              >
                <Text style={[styles.strengthText, { color: skill.color }]}>
                  {skill.strength}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 310,
    position: 'relative',
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  centralCore: {
    position: 'absolute',
    top: 140 - 36,
    left: '50%',
    marginLeft: -36,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: colors.orange[400],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.orange[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 10,
  },
  centralCoreInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coreTitle: {
    ...typography.badge,
    fontSize: 13,
    fontWeight: '800',
    color: colors.orange[600],
    letterSpacing: 0.5,
  },
  coreSubtitle: {
    ...typography.caption,
    fontSize: 9,
    fontWeight: '600',
    color: colors.navy[600],
  },
  nodeWrapper: {
    position: 'absolute',
    zIndex: 15,
  },
  skillBubble: {
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  iconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  skillName: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.navy[900],
    textAlign: 'center',
    maxWidth: 62,
  },
  strengthPill: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 8,
    marginTop: 2,
  },
  strengthText: {
    fontSize: 8.5,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
