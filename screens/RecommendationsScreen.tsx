import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, CheckCircle, Brain, Code, Database, Shield, Monitor, Map, Cloud, Cpu } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { ProblemStatement } from '../types';

let rawSihData: ProblemStatement[] = [];
try {
  rawSihData = require('../data/sih_data.json');
} catch (e) {
  console.log("No data found");
}

const INTERESTS = [
  { id: 'ai', name: 'AI/ML & GenAI', icon: Brain },
  { id: 'web', name: 'Web Dev', icon: Monitor },
  { id: 'mobile', name: 'Mobile Dev', icon: Code },
  { id: 'backend', name: 'Python/Backend', icon: Database },
  { id: 'cyber', name: 'Cybersecurity', icon: Shield },
  { id: 'gis', name: 'GIS and Maps', icon: Map },
  { id: 'cloud', name: 'Cloud/DevOps', icon: Cloud },
  { id: 'hardware', name: 'IoT & Hardware', icon: Cpu },
];

interface Props {
  onBack: () => void;
}

export function RecommendationsScreen({ onBack }: Props) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const runAnalysis = () => {
    setAnalyzing(true);

    // Simulate processing time
    setTimeout(() => {
      // Very basic keyword matching for demo purposes
      const keywords: Record<string, string[]> = {
        'ai': ['ai', 'ml', 'machine learning', 'artificial intelligence', 'llm', 'generative', 'predict', 'model'],
        'web': ['web', 'portal', 'dashboard', 'frontend', 'react', 'angular', 'website'],
        'mobile': ['mobile', 'app', 'android', 'ios', 'flutter', 'react native'],
        'backend': ['backend', 'api', 'python', 'django', 'node', 'java', 'microservices'],
        'cyber': ['security', 'cyber', 'encryption', 'vulnerability', 'blockchain', 'authentication'],
        'gis': ['gis', 'map', 'spatial', 'geo', 'satellite', 'location'],
        'cloud': ['cloud', 'aws', 'azure', 'docker', 'kubernetes', 'scale'],
        'hardware': ['iot', 'sensor', 'hardware', 'arduino', 'raspberry', 'drone', 'device']
      };

      const selectedKeywords = selectedInterests.flatMap(id => keywords[id] || []);

      const results = rawSihData.map(ps => {
        let matchCount = 0;
        const lowerDesc = (ps.description + ' ' + ps.title).toLowerCase();

        selectedKeywords.forEach(kw => {
          if (lowerDesc.includes(kw)) matchCount++;
        });

        // Estimate difficulty based on complex keywords
        let difficulty = 'Medium';
        if (lowerDesc.includes('real-time') || lowerDesc.includes('blockchain') || lowerDesc.includes('llm') || lowerDesc.includes('hardware')) {
          difficulty = 'High';
        } else if (matchCount === 0 || lowerDesc.length < 100) {
          difficulty = 'Low'; // Simple or undefined
        }

        return {
          ps,
          matchScore: matchCount,
          difficulty,
          reason: matchCount > 0
            ? `Matches ${matchCount} keyword(s) related to your selected skills.`
            : 'General application of basic principles.',
        };
      })
      .filter(r => r.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5); // Top 5

      setRecommendations(results);
      setAnalyzing(false);
    }, 800);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suitability Analysis</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Select Your Technical Interests</Text>
        <Text style={styles.sectionSubtitle}>We&apos;ll analyze the problem descriptions to find the best fit for your team&apos;s skills. (Note: These are system-generated estimates, not official SIH assessments).</Text>

        <View style={styles.interestsGrid}>
          {INTERESTS.map(interest => {
            const isSelected = selectedInterests.includes(interest.id);
            const Icon = interest.icon;
            return (
              <TouchableOpacity
                key={interest.id}
                style={[styles.interestCard, isSelected && styles.interestCardSelected]}
                onPress={() => toggleInterest(interest.id)}
              >
                <Icon size={24} color={isSelected ? '#fff' : colors.orange[500]} />
                <Text style={[styles.interestName, isSelected && styles.interestNameSelected]}>
                  {interest.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.analyzeButton, selectedInterests.length === 0 && styles.analyzeButtonDisabled]}
          disabled={selectedInterests.length === 0 || analyzing}
          onPress={runAnalysis}
        >
          <Text style={styles.analyzeButtonText}>
            {analyzing ? 'Analyzing Descriptions...' : 'Find Suitable Problem Statements'}
          </Text>
        </TouchableOpacity>

        {recommendations.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Top Recommendations</Text>

            {recommendations.map((rec, idx) => (
              <View key={rec.ps.id} style={styles.resultCard}>
                <View style={styles.resultHeader}>
                   <Text style={styles.psId}>{rec.ps.id}</Text>
                   <View style={styles.difficultyBadge}>
                      <Text style={styles.difficultyText}>Est. Difficulty: {rec.difficulty}</Text>
                   </View>
                </View>
                <Text style={styles.psTitle}>{rec.ps.title}</Text>

                <View style={styles.analysisBox}>
                  <View style={styles.analysisRow}>
                    <CheckCircle size={16} color={colors.green[600]} />
                    <Text style={styles.analysisText}><Text style={styles.bold}>Why it fits:</Text> {rec.reason}</Text>
                  </View>
                  <View style={styles.analysisRow}>
                    <CheckCircle size={16} color={colors.orange[600]} />
                    <Text style={styles.analysisText}><Text style={styles.bold}>Requires Verification:</Text> Specific tech stack limitations should be verified on the official portal.</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  interestCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  interestCardSelected: {
    backgroundColor: colors.orange[500],
    borderColor: colors.orange[500],
  },
  interestName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
  },
  interestNameSelected: {
    color: '#fff',
  },
  analyzeButton: {
    backgroundColor: colors.orange[500],
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  analyzeButtonDisabled: {
    backgroundColor: colors.border.light,
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    gap: 16,
    paddingBottom: 40,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  psId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.orange[500],
  },
  difficultyBadge: {
    backgroundColor: colors.surface.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  psTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  analysisBox: {
    backgroundColor: colors.surface.card,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  analysisRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  analysisText: {
    flex: 1,
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
    color: colors.text.primary,
  },
});
