import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { GlassCard } from '../components/GlassCard';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { MockMapVisual } from '../components/MockMapVisual';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { radii } from '../theme/radii';
import { mockOpportunities, OpportunityItem } from '../data/prototypeData';
import {
  MapPin,
  Clock,
  Sparkles,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Navigation,
} from 'lucide-react-native';

interface NearbyOpportunitiesScreenProps {
  onBack: () => void;
  onContinueToRoadmap: () => void;
}

export const NearbyOpportunitiesScreen: React.FC<NearbyOpportunitiesScreenProps> = ({
  onBack,
  onContinueToRoadmap,
}) => {
  const [selectedOpp, setSelectedOpp] = useState<OpportunityItem>(mockOpportunities[0]);

  return (
    <ScreenContainer
      title="Nearby Opportunities"
      stepIndicator="Step 07 / 08"
      onBack={onBack}
    >
      {/* Title & Introduction */}
      <AnimatedEntrance delay={100} distance={15}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>Opportunities near you</Text>
          <Text style={styles.subtitle}>
            Explore training and livelihood opportunities around your area.
          </Text>
        </View>
      </AnimatedEntrance>

      {/* Stylized Abstract Location Map Visual */}
      <AnimatedEntrance delay={200} distance={20}>
        <MockMapVisual
          selectedOpportunityId={selectedOpp.id}
          onSelectOpportunity={setSelectedOpp}
        />
      </AnimatedEntrance>

      {/* Map Hint */}
      <View style={styles.mapHintRow}>
        <Navigation size={13} color={colors.orange[600]} />
        <Text style={styles.mapHintText}>
          Tap any pin on the map to inspect details
        </Text>
      </View>

      {/* Selected Opportunity Detail Card */}
      <AnimatedEntrance key={selectedOpp.id} delay={100} distance={15} style={styles.detailCardWrap}>
        <GlassCard tint="warm" style={styles.opportunityCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.titleCol}>
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>{selectedOpp.type}</Text>
              </View>
              <Text style={styles.oppTitle}>{selectedOpp.title}</Text>
              <Text style={styles.oppAddress}>{selectedOpp.address}</Text>
            </View>

            <View style={styles.distanceBadge}>
              <MapPin size={13} color={colors.orange[600]} />
              <Text style={styles.distanceText}>{selectedOpp.distance}</Text>
            </View>
          </View>

          {/* Quick Details */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailRow}>
              <Clock size={13} color={colors.navy[500]} />
              <Text style={styles.detailText}>{selectedOpp.timing}</Text>
            </View>
            <View style={styles.detailRow}>
              <ShieldCheck size={13} color={colors.green[600]} />
              <Text style={[styles.detailText, { color: colors.green[800], fontWeight: '700' }]}>
                {selectedOpp.stipend}
              </Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            {selectedOpp.tags.map((tag, idx) => (
              <View key={idx} style={styles.tagPill}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
            <View style={[styles.tagPill, { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }]}>
              <Text style={[styles.tagText, { color: '#92400E', fontWeight: '700' }]}>
                {selectedOpp.seatsRemaining} seats left
              </Text>
            </View>
          </View>

          {/* Action Row */}
          <View style={styles.cardActions}>
            <PrimaryButton
              label="Select This Centre & View Roadmap"
              subtitle="Map to your personal livelihood path"
              icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} />}
              onPress={onContinueToRoadmap}
            />
          </View>
        </GlassCard>
      </AnimatedEntrance>

      {/* Prototype Notice */}
      <View style={styles.prototypeNotice}>
        <Text style={styles.prototypeNoticeText}>
          * Sample opportunities simulated for your demo. Integrated with PM-AJAY GIA verified training providers.
        </Text>
      </View>
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
  mapHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
  },
  mapHintText: {
    ...typography.caption,
    fontSize: 11.5,
    color: colors.navy[500],
  },
  detailCardWrap: {
    marginTop: spacing.md,
  },
  opportunityCard: {
    padding: 16,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    backgroundColor: '#FFFDF9',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleCol: {
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
  },
  typeBadgeText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: colors.orange[800],
    textTransform: 'uppercase',
  },
  oppTitle: {
    ...typography.h3,
    fontSize: 16,
    color: colors.navy[900],
    fontWeight: '700',
  },
  oppAddress: {
    ...typography.caption,
    fontSize: 12,
    color: colors.navy[500],
    marginTop: 2,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FED7AA',
    gap: 4,
  },
  distanceText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: colors.orange[700],
  },
  detailsGrid: {
    gap: 6,
    marginVertical: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    ...typography.bodySmall,
    fontSize: 12,
    color: colors.navy[700],
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 10,
  },
  tagPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tagText: {
    ...typography.caption,
    fontSize: 10.5,
    color: colors.navy[700],
    fontWeight: '600',
  },
  cardActions: {
    marginTop: spacing.sm,
  },
  prototypeNotice: {
    marginVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  prototypeNoticeText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.navy[400],
    textAlign: 'center',
  },
});
