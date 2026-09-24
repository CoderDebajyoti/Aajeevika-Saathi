import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './theme/colors';
import { PathwayItem, mockPathways } from './data/prototypeData';

import {
  WelcomeScreen,
  VoiceOnboardingScreen,
  ConversationScreen,
  ProfileScreen,
  SkillLandscapeScreen,
  RecommendationsScreen,
  PathwayDetailScreen,
  NearbyOpportunitiesScreen,
  LivelihoodRoadmapScreen,
} from './screens';

export type ScreenName =
  | 'welcome'
  | 'voice-onboarding'
  | 'conversation'
  | 'profile'
  | 'skills'
  | 'recommendations'
  | 'pathway-detail'
  | 'opportunities'
  | 'roadmap';

export default function App() {
  const [screenStack, setScreenStack] = useState<ScreenName[]>(['welcome']);
  const [selectedPathway, setSelectedPathway] = useState<PathwayItem>(mockPathways[0]);

  const currentScreen = screenStack[screenStack.length - 1];

  // Navigation helpers
  const navigateTo = (screen: ScreenName) => {
    setScreenStack(stack => [...stack, screen]);
  };

  const goBack = () => {
    setScreenStack(stack => (stack.length > 1 ? stack.slice(0, -1) : stack));
  };

  const restartJourney = () => {
    setScreenStack(['welcome']);
  };

  const handleSelectPathway = (pathway: PathwayItem) => {
    setSelectedPathway(pathway);
    navigateTo('pathway-detail');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          {currentScreen === 'welcome' && (
            <WelcomeScreen
              onStartJourney={() => navigateTo('voice-onboarding')}
            />
          )}

          {currentScreen === 'voice-onboarding' && (
            <VoiceOnboardingScreen
              onBack={goBack}
              onContinue={() => navigateTo('conversation')}
            />
          )}

          {currentScreen === 'conversation' && (
            <ConversationScreen
              onBack={goBack}
              onComplete={() => navigateTo('profile')}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              onBack={goBack}
              onContinue={() => navigateTo('skills')}
            />
          )}

          {currentScreen === 'skills' && (
            <SkillLandscapeScreen
              onBack={goBack}
              onContinue={() => navigateTo('recommendations')}
            />
          )}

          {currentScreen === 'recommendations' && (
            <RecommendationsScreen
              onBack={goBack}
              onSelectPathway={handleSelectPathway}
            />
          )}

          {currentScreen === 'pathway-detail' && (
            <PathwayDetailScreen
              pathway={selectedPathway}
              onBack={goBack}
              onFindOpportunities={() => navigateTo('opportunities')}
            />
          )}

          {currentScreen === 'opportunities' && (
            <NearbyOpportunitiesScreen
              onBack={goBack}
              onContinueToRoadmap={() => navigateTo('roadmap')}
            />
          )}

          {currentScreen === 'roadmap' && (
            <LivelihoodRoadmapScreen
              onBack={goBack}
              onRestart={restartJourney}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  container: {
    flex: 1,
  },
});
