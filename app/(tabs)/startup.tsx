import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, Image } from 'react-native';
import { ArrowLeft, Plus, Search, SlidersHorizontal } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface Startup {
  id: string;
  name: string;
  description: string;
  stage: string;
  category: string;
  location: string;
  logo: string;
  tags: string[];
}

const mockStartups: Startup[] = [
  {
    id: '1',
    name: 'Bay Area Startups',
    description: 'Enterprise AI that actually works...',
    stage: 'Idea Stage',
    category: 'Enterprise AI',
    location: 'San Francisco, CA',
    logo: 'https://via.placeholder.com/60/4A90E2/FFFFFF?text=BA',
    tags: ['Idea Stage', 'Enterprise AI', 'San Francisco, CA'],
  },
  {
    id: '2',
    name: 'NeuralFlow AI',
    description: 'Your next co-founder is waiting for you',
    stage: 'Seed',
    category: 'Logistic',
    location: 'San Francisco, CA',
    logo: 'https://via.placeholder.com/60/FF6B6B/FFFFFF?text=N',
    tags: ['Seed', 'Logistic', 'San Francisco, CA'],
  },
  {
    id: '3',
    name: 'GreenRoute',
    description: 'Sustainable logistics for the last mile',
    stage: 'Pre-Seed',
    category: 'Enterprise AI',
    location: 'Portland, OR',
    logo: 'https://via.placeholder.com/60/4CAF50/FFFFFF?text=GR',
    tags: ['Pre-Seed', 'Enterprise AI', 'Portland, OR'],
  },
  {
    id: '4',
    name: 'MedSync',
    description: 'Clinical trial matching in minutes, not months',
    stage: 'Series A',
    category: 'HealthTech',
    location: 'Boston, MA',
    logo: 'https://via.placeholder.com/60/9C27B0/FFFFFF?text=MS',
    tags: ['Series A', 'HealthTech', 'Boston, MA'],
  },
  {
    id: '5',
    name: 'Stackly',
    description: 'No-code internal tools that scale',
    stage: 'Seed',
    category: 'SaaS',
    location: 'Austin, TX',
    logo: 'https://via.placeholder.com/60/00BCD4/FFFFFF?text=S',
    tags: ['Seed', 'SaaS', 'Austin, TX'],
  },
];

export default function StartupScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <ArrowLeft size={24} color={Colors.white} />
            <Text style={styles.headerTitle}>My Startup</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color={Colors.primary} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>All Startup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={20} color={Colors.textDark} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search startup..."
            placeholderTextColor={Colors.textMuted}
          />
        </View>

        <View style={styles.startupsList}>
          {mockStartups.map((startup) => (
            <View key={startup.id} style={styles.startupCard}>
              <View style={styles.startupHeader}>
                <Image 
                  source={{ uri: startup.logo }}
                  style={styles.startupLogo}
                />
                <View style={styles.startupInfo}>
                  <Text style={styles.startupName}>{startup.name}</Text>
                  <Text style={styles.startupDescription}>{startup.description}</Text>
                  <View style={styles.tags}>
                    {startup.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.textDark,
  },
  startupsList: {
    paddingHorizontal: 16,
  },
  startupCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  startupHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  startupLogo: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  startupInfo: {
    flex: 1,
  },
  startupName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: 4,
  },
  startupDescription: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
    marginBottom: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: Colors.textDark,
    fontWeight: '500',
  },
});
