import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from 'react-native-svg';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { radii } from '../theme/radii';
import { MapPin, Navigation, BookOpen, Award, Briefcase } from 'lucide-react-native';
import { mockOpportunities, OpportunityItem } from '../data/prototypeData';

interface MockMapVisualProps {
  selectedOpportunityId: string;
  onSelectOpportunity: (opp: OpportunityItem) => void;
}

export const MockMapVisual: React.FC<MockMapVisualProps> = ({
  selectedOpportunityId,
  onSelectOpportunity,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const pins = [
    { opp: mockOpportunities[0], x: 230, y: 70, color: colors.orange[600], icon: BookOpen },
    { opp: mockOpportunities[1], x: 80, y: 110, color: colors.cyan[600], icon: Award },
    { opp: mockOpportunities[2], x: 260, y: 185, color: colors.green[600], icon: Briefcase },
  ];

  return (
    <View style={styles.container}>
      {/* SVG Stylized Map Layout */}
      <View style={styles.svgMap}>
        <Svg width="100%" height="100%" viewBox="0 0 340 240">
          <Defs>
            <SvgLinearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#F9FBF7" />
              <Stop offset="100%" stopColor="#FFF9F2" />
            </SvgLinearGradient>

            <SvgLinearGradient id="greenZone" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#DCFCE7" stopOpacity="0.7" />
              <Stop offset="100%" stopColor="#BBF7D0" stopOpacity="0.3" />
            </SvgLinearGradient>
          </Defs>

          {/* Background Canvas */}
          <Rect x="0" y="0" width="340" height="240" fill="url(#mapBg)" rx="20" />

          {/* Abstract Green Farmlands & Open Ground Patches */}
          <Path
            d="M 10 20 C 50 10 90 40 100 80 C 110 130 50 160 20 140 Z"
            fill="url(#greenZone)"
          />
          <Path
            d="M 220 130 C 270 120 320 150 330 200 C 310 230 240 230 210 190 Z"
            fill="url(#greenZone)"
          />

          {/* Abstract Main Arterial Roadways (Smooth organic curves) */}
          <Path
            d="M 0 160 C 80 155 130 145 170 145 C 220 145 280 120 340 110"
            stroke="#FFFFFF"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <Path
            d="M 0 160 C 80 155 130 145 170 145 C 220 145 280 120 340 110"
            stroke="#E9DFD2"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Secondary Bypass Road connecting to training centers */}
          <Path
            d="M 170 145 C 170 100 200 80 230 70"
            stroke="#FFFFFF"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <Path
            d="M 170 145 C 170 100 200 80 230 70"
            stroke="#E9DFD2"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Connecting Branch Road Left */}
          <Path
            d="M 130 145 C 110 125 90 120 80 110"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <Path
            d="M 130 145 C 110 125 90 120 80 110"
            stroke="#E9DFD2"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Connecting Branch Road Right */}
          <Path
            d="M 220 145 C 240 160 250 170 260 185"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <Path
            d="M 220 145 C 240 160 250 170 260 185"
            stroke="#E9DFD2"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Distance Radius Circles from User */}
          <Circle cx="170" cy="145" r="45" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity={0.6} />
          <Circle cx="170" cy="145" r="90" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="5 5" fill="none" opacity={0.4} />
        </Svg>
      </View>

      {/* User Location Pulse Marker ("YOU") */}
      <View style={[styles.userMarkerWrapper, { left: 170 - 18, top: 145 - 18 }]}>
        <Animated.View
          style={[
            styles.userPulseRing,
            { transform: [{ scale: pulseAnim }] },
          ]}
        />
        <View style={styles.userDot}>
          <Navigation size={12} color="#FFFFFF" strokeWidth={3} />
        </View>
        <View style={styles.userBadge}>
          <Text style={styles.userBadgeText}>YOU</Text>
        </View>
      </View>

      {/* Opportunity Interactive Map Pins */}
      {pins.map(({ opp, x, y, color, icon: Icon }) => {
        const isSelected = selectedOpportunityId === opp.id;

        return (
          <TouchableOpacity
            key={opp.id}
            activeOpacity={0.85}
            onPress={() => onSelectOpportunity(opp)}
            style={[
              styles.pinWrapper,
              {
                left: x - 20,
                top: y - 36,
                zIndex: isSelected ? 30 : 20,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`${opp.title}, ${opp.distance}`}
          >
            {/* Callout Bubble */}
            <View
              style={[
                styles.pinCallout,
                {
                  borderColor: isSelected ? color : '#E2DCD2',
                  backgroundColor: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.92)',
                  shadowColor: isSelected ? color : '#102A43',
                  shadowOpacity: isSelected ? 0.3 : 0.1,
                },
              ]}
            >
              <Icon size={12} color={color} strokeWidth={2.4} />
              <Text style={[styles.pinDistanceText, { color }]}>{opp.distance}</Text>
            </View>

            {/* Pin Pointer Icon */}
            <View style={[styles.pinBase, { backgroundColor: color }]}>
              <MapPin size={14} color="#FFFFFF" strokeWidth={2.4} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 240,
    borderRadius: radii.xl,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ECE4D8',
    shadowColor: '#102A43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  svgMap: {
    width: '100%',
    height: '100%',
  },
  userMarkerWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    zIndex: 25,
  },
  userPulseRing: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(249, 115, 22, 0.25)',
    borderWidth: 1.5,
    borderColor: colors.orange[500],
  },
  userDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.orange[600],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.orange[600],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  userBadge: {
    position: 'absolute',
    top: 24,
    backgroundColor: colors.navy[900],
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
  },
  userBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  pinWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 4,
    marginBottom: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  pinDistanceText: {
    ...typography.caption,
    fontSize: 9.5,
    fontWeight: '800',
  },
  pinBase: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#102A43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
