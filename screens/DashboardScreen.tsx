import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Linking,
  Platform
} from 'react-native';
import { ProblemStatement } from '../types';
import { filterAndSort, SortBy, CategoryFilter } from '../utils/filters';
import { colors } from '../theme/colors';
import { ExternalLink, Search, Download, AlertCircle } from 'lucide-react-native';

// Using require to load the JSON file synchronously for simplicity in this demo.
// In a real app with large data, this might be loaded asynchronously.
let rawSihData: any[] = [];
try {
  rawSihData = require('../data/sih_data.json');
} catch (e) {
  console.log("No data found, starting empty");
}

interface DashboardScreenProps {
  onNavigateToRecommendations: () => void;
}

export function DashboardScreen({ onNavigateToRecommendations }: DashboardScreenProps) {
  const [data, setData] = useState<ProblemStatement[]>(rawSihData);

  // Default workflow: Software, < 20, Ascending
  const [category, setCategory] = useState<CategoryFilter>('Software');
  const [maxSubmissionsText, setMaxSubmissionsText] = useState('20');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('lowest_submissions');

  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleString());

  const maxSubmissions = useMemo(() => {
    if (!maxSubmissionsText) return undefined;
    const parsed = parseInt(maxSubmissionsText, 10);
    return isNaN(parsed) ? undefined : parsed;
  }, [maxSubmissionsText]);

  const filteredData = useMemo(() => {
    return filterAndSort(
      data,
      { category, maxSubmissions, searchQuery },
      sortBy
    );
  }, [data, category, maxSubmissions, searchQuery, sortBy]);

  const handleExportCSV = () => {
    if (Platform.OS === 'web') {
      const header = ['Rank', 'PS ID', 'Title', 'Organization', 'Category', 'Submitted Ideas', 'Official URL'].join(',');
      const rows = filteredData.map((item, index) => {
        return [
          index + 1,
          `"${item.id}"`,
          `"${item.title.replace(/"/g, '""')}"`,
          `"${item.organization.replace(/"/g, '""')}"`,
          `"${item.category}"`,
          item.submittedIdeas !== null ? item.submittedIdeas : 'Unknown',
          `"${item.officialDetailUrl}"`
        ].join(',');
      });
      const csv = [header, ...rows].join('\n');

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('url');
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'sih_problem_statements.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // In a real app, use expo-file-system and expo-sharing
      console.log("CSV Export is fully supported on web. On native, implement using expo-file-system and expo-sharing.");
      alert("CSV export requires web platform or expo-sharing plugin on native.");
    }
  };

  const renderItem = ({ item, index }: { item: ProblemStatement; index: number }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.badgeContainer}>
           <Text style={styles.badgeText}>#{index + 1}</Text>
        </View>
        <Text style={styles.psId}>{item.id}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(item.officialDetailUrl)}>
            <ExternalLink size={20} color={colors.orange[500]} />
        </TouchableOpacity>
      </View>

      <Text style={styles.cardTitle}>{item.title}</Text>

      <View style={styles.cardDetails}>
        <Text style={styles.detailText}><Text style={styles.bold}>Org:</Text> {item.organization}</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Category:</Text> {item.category}</Text>

        <View style={styles.submissionContainer}>
            <Text style={styles.bold}>Submissions: </Text>
            <Text style={[styles.submissionCount, item.submittedIdeas !== null && item.submittedIdeas < 20 ? styles.lowSubmissions : null]}>
                {item.submittedIdeas !== null ? item.submittedIdeas : 'Unknown'}
            </Text>
        </View>
        <Text style={styles.sourceStatusText}>Source: {item.retrievalStatus === 'third_party' ? 'Third Party / Fallback' : item.retrievalStatus}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SIH 2026 Problem Statement Explorer</Text>
        <Text style={styles.headerSubtitle}>Find promising problem statements using verified submission data.</Text>

        <View style={styles.statsContainer}>
            <Text style={styles.statText}>Total: {data.length}</Text>
            <Text style={styles.statText}>Software: {data.filter(d => d.category === 'Software').length}</Text>
            <Text style={styles.statText}>Hardware: {data.filter(d => d.category === 'Hardware').length}</Text>
            <Text style={styles.statText}>Showing: {filteredData.length}</Text>
        </View>

        <View style={styles.statusContainer}>
           <AlertCircle size={16} color={data.length === 0 || data[0]?.retrievalStatus !== 'live_official' ? colors.orange[600] : colors.green[600]} />
           <Text style={styles.statusText}>
             {data.length === 0 ? 'No Data. Run collection script.' :
               (data[0]?.retrievalStatus === 'live_official' ? 'Official Data (Live)' : 'Using Fallback Data (Official API 403)')
             }
           </Text>
           <Text style={styles.timeText}>Last Check: {lastRefreshed}</Text>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Search size={20} color={colors.text.secondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search ID or Title..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.filterRow}>
          <View style={styles.filterGroup}>
             <Text style={styles.filterLabel}>Category:</Text>
             <View style={styles.buttonRow}>
               {(['All', 'Software', 'Hardware'] as CategoryFilter[]).map(c => (
                 <TouchableOpacity
                   key={c}
                   style={[styles.filterButton, category === c && styles.filterButtonActive]}
                   onPress={() => setCategory(c)}
                 >
                   <Text style={[styles.filterButtonText, category === c && styles.filterButtonTextActive]}>{c}</Text>
                 </TouchableOpacity>
               ))}
             </View>
          </View>

          <View style={styles.filterGroup}>
             <Text style={styles.filterLabel}>Max Submissions:</Text>
             <TextInput
                style={styles.numberInput}
                keyboardType="numeric"
                value={maxSubmissionsText}
                onChangeText={setMaxSubmissionsText}
                placeholder="e.g. 20"
             />
          </View>
        </View>

        <View style={styles.actionsRow}>
           <TouchableOpacity style={styles.actionButton} onPress={handleExportCSV}>
              <Download size={18} color="#fff" />
              <Text style={styles.actionButtonText}>Export CSV</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.secondaryButton} onPress={onNavigateToRecommendations}>
              <Text style={styles.secondaryButtonText}>Try Suitability Analysis</Text>
           </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No problem statements match your filters.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  statText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.orange[500],
    backgroundColor: colors.orange.soft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface.card,
    padding: 8,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    marginLeft: 6,
    flex: 1,
    color: colors.text.secondary,
  },
  timeText: {
    fontSize: 11,
    color: colors.text.secondary,
  },
  filtersContainer: {
    padding: 16,
    backgroundColor: colors.surface.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  searchRow: {
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    height: '100%',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  filterGroup: {
    flex: 1,
    minWidth: 150,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text.secondary,
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
    backgroundColor: '#fff',
  },
  filterButtonActive: {
    backgroundColor: colors.orange[500],
    borderColor: colors.orange[500],
  },
  filterButtonText: {
    fontSize: 13,
    color: colors.text.primary,
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  numberInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 36,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.orange[500],
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.orange[500],
  },
  secondaryButtonText: {
    color: colors.orange[500],
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeContainer: {
    backgroundColor: colors.surface.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text.secondary,
  },
  psId: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.orange[500],
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
    lineHeight: 22,
  },
  cardDetails: {
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  bold: {
    fontWeight: '600',
    color: colors.text.primary,
  },
  submissionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  submissionCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  lowSubmissions: {
    color: colors.green[600],
  },
  sourceStatusText: {
    fontSize: 11,
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginTop: 8,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.text.secondary,
    fontSize: 15,
  },
});
