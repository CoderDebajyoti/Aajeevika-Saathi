import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './theme/colors';

import { DashboardScreen } from './screens/DashboardScreen';
import { RecommendationsScreen } from './screens/RecommendationsScreen';
import { ProblemStatement } from './types';

export type ScreenName = 'dashboard' | 'recommendations';

export default function App() {
  const [screenStack, setScreenStack] = useState<ScreenName[]>(['dashboard']);

  const currentScreen = screenStack[screenStack.length - 1];

  // Navigation helpers
  const navigateTo = (screen: ScreenName) => {
    setScreenStack(stack => [...stack, screen]);
  };

  const goBack = () => {
    setScreenStack(stack => (stack.length > 1 ? stack.slice(0, -1) : stack));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              onNavigateToRecommendations={() => navigateTo('recommendations')}
            />
          )}

          {currentScreen === 'recommendations' && (
            <RecommendationsScreen
              onBack={goBack}
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
