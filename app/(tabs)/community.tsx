import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, Image } from 'react-native';
import { ArrowLeft, Plus, Search, Users, Lock } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  icon: string;
  isPremium?: boolean;
  timeAgo: string;
}

const mockGroups: CommunityGroup[] = [
  {
    id: '1',
    name: 'FinTech Founders',
    description: 'Discussion for Fintech Founders. Trends, regulations, and funding.A Local events, coworking, and networking.',
    members: 8420,
    icon: 'https://via.placeholder.com/60/FF6B6B/FFFFFF?text=F',
    timeAgo: 'about 6 hours ago',
  },
  {
    id: '2',
    name: 'Y Combinator',
    description: 'Product Builders',
    members: 8420,
    icon: 'https://via.placeholder.com/60/FF8C42/FFFFFF?text=Y',
    isPremium: true,
    timeAgo: 'about 8 hours ago',
  },
];

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ArrowLeft size={24} color={Colors.white} />
          <Text style={styles.headerTitle}>Community</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color={Colors.primary} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>

          {mockGroups.map((group) => (
            <View key={group.id} style={styles.groupCard}>
              <Image 
                source={{ uri: group.icon }}
                style={styles.groupIcon}
              />
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.groupTime}>{group.timeAgo}</Text>
                <Text style={styles.groupDescription}>{group.description}</Text>
                <View style={styles.groupFooter}>
                  <View style={styles.membersContainer}>
                    <Users size={16} color={Colors.textMuted} />
                    <Text style={styles.membersText}>{group.members.toLocaleString()} members</Text>
                  </View>
                  {group.isPremium ? (
                    <TouchableOpacity style={styles.premiumButton}>
                      <Lock size={16} color={Colors.white} />
                      <Text style={styles.premiumButtonText}>Premium</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinButtonText}>Join Group</Text>
                    </TouchableOpacity>
                  )}
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: 16,
  },
  groupCard: {
    flexDirection: 'row',
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
  groupIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: 2,
  },
  groupTime: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  groupDescription: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
    marginBottom: 12,
  },
  groupFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  membersText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  joinButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.textDark,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  premiumButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
});
