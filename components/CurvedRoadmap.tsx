import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { radii } from '../theme/radii';
import { mockRoadmap, RoadmapMilestone } from '../data/prototypeData';
import { Check, Compass, Sun, Award, Wrench, TrendingUp, Sparkles } from 'lucide-react-native';

export const CurvedRoadmap: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const getMilestoneIcon = (id: string, status: string) => {
    if (status === 'completed') {
      return <Check size={14} color="#FFFFFF" strokeWidth={3} />;
    }
    switch (id) {
      case 'step_training':
        return <Sun size={16} color="#FFFFFF" strokeWidth={2.5} />;
      case 'step_cert':
        return <Award size={15} color={colors.navy[600]} strokeWidth={2.2} />;
      case 'step_apprentice':
        return <Wrench size={15} color={colors.navy[600]} strokeWidth={2.2} />;
      case 'step_livelihood':
        return <TrendingUp size={16} color={colors.navy[600]} strokeWidth={2.2} />;
      default:
        return <Sparkles size={14} color={colors.navy[600]} strokeWidth={2.2} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* S-Curve Continuous Organic Track (SVG Background) */}
      <View style={styles.svgTrack} pointerEvents="none">
        <Svg width="100%" height="100%" viewBox="0 0 320 540">
          <Defs>
            <SvgLinearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#16A34A" />
              <Stop offset="100%" stopColor="#22C55E" />
            </SvgLinearGradient>
            <SvgLinearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#FB923C" />
              <Stop offset="100%" stopColor="#EA580C" />
            </SvgLinearGradient>
          </Defs>

          {/* Background Guide Trace */}
          <Path
            d="M 40 40 
               C 40 100, 40 120, 40 140
               C 40 200, 40 220, 40 250
               C 40 320, 40 340, 40 360
               C 40 420, 40 440, 40 460
               C 40 490, 40 510, 40 520"
            stroke="#F0EBE0"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Completed Segment Glow (From 40 to 250) */}
          <Path
            d="M 40 40 L 40 250"
            stroke="url(#completedGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Upcoming Future Dotted Segment */}
          <Path
            d="M 40 250 L 40 520"
            stroke="#CBD5E1"
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
        </Svg>
      </View>

      {/* Roadmap Milestone Nodes */}
      <View style={styles.milestonesList}>
        {mockRoadmap.map((item: RoadmapMilestone, index: number) => {
          const isCompleted = item.status === 'completed';
          const isCurrent = item.status === 'current';

          return (
            <View key={item.id} style={styles.milestoneRow}>
              {/* Node Icon Container */}
              <View style={styles.nodeColumn}>
                {isCurrent && (
                  <Animated.View
                    style={[
                      styles.currentPulseRing,
                      { transform: [{ scale: pulseAnim }] },
                    ]}
                  />
                )}

                <View
                  style={[
                    styles.nodeCircle,
                    isCompleted && styles.nodeCircleCompleted,
                    isCurrent && styles.nodeCircleCurrent,
                    !isCompleted && !isCurrent && styles.nodeCircleUpcoming,
                  ]}
                >
                  {getMilestoneIcon(item.id, item.status)}
                </View>
              </View>

              {/* Milestone Content Card */}
              <View
                style={[
                  styles.contentCard,
                  isCurrent && styles.contentCardCurrent,
                  isCompleted && styles.contentCardCompleted,
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text
                    style={[
                      styles.milestoneTitle,
                      isCurrent && styles.milestoneTitleCurrent,
                    ]}
                  >
                    {item.title}
                  </Text>

                  {item.badge && (
                    <View
                      style={[
                        styles.nodeBadge,
                        isCurrent
                          ? styles.badgeCurrent
                          : isCompleted
                          ? styles.badgeCompleted
                          : styles.badgeUpcoming,
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          isCurrent && { color: colors.orange[700] },
                          isCompleted && { color: colors.green[700] },
                          !isCurrent && !isCompleted && { color: colors.navy[600] },
                        ]}
                      >
                        {item.badge}
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={styles.milestoneSubtitle}>{item.subtitle}</Text>

                {item.duration && (
                  <View style={styles.durationRow}>
                    <Compass size={12} color={isCurrent ? colors.orange[600] : colors.navy[600]} />
                    <Text
                      style={[
                        styles.durationText,
                        isCurrent && { color: colors.orange[700], fontWeight: '700' },
                      ]}
                    >
                      {item.duration}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 10,
    width: '100%',
  },
  svgTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 60,
  },
  milestonesList: {
    width: '100%',
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    position: 'relative',
  },
  nodeColumn: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  currentPulseRing: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(249, 115, 22, 0.22)',
    borderWidth: 1.5,
    borderColor: colors.orange[400],
  },
  nodeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    zIndex: 10,
  },
  nodeCircleCompleted: {
    backgroundColor: colors.green[600],
    borderColor: colors.green[600],
    shadowColor: colors.green[600],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  nodeCircleCurrent: {
    backgroundColor: colors.orange[600],
    borderColor: '#FFFFFF',
    shadowColor: colors.orange[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  nodeCircleUpcoming: {
    backgroundColor: '#F8FAF5',
    borderColor: '#CBD5E1',
  },
  contentCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: radii.lg,
    padding: 14,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ECE4D8',
    shadowColor: '#102A43',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contentCardCompleted: {
    borderColor: '#DCFCE7',
    backgroundColor: 'rgba(240, 253, 244, 0.55)',
  },
  contentCardCurrent: {
    borderColor: '#FED7AA',
    backgroundColor: '#FFFDF7',
    borderWidth: 1.5,
    shadowColor: colors.orange[500],
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
  },
  milestoneTitle: {
    ...typography.bodyEmphasized,
    fontSize: 14,
    color: colors.navy[900],
    flex: 1,
  },
  milestoneTitleCurrent: {
    color: colors.orange[700],
    fontWeight: '800',
  },
  nodeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeCompleted: {
    backgroundColor: colors.green[100],
  },
  badgeCurrent: {
    backgroundColor: '#FFEDD5',
  },
  badgeUpcoming: {
    backgroundColor: '#F1F5F9',
  },
  badgeText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
  },
  milestoneSubtitle: {
    ...typography.caption,
    fontSize: 12,
    color: colors.navy[600],
    marginTop: 4,
    lineHeight: 16,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 5,
  },
  durationText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.navy[600],
  },
});
