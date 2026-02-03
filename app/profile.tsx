import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { ArrowLeft, Settings, MapPin, Mail, Briefcase, Award, Users } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/colors';
import { currentUser } from '@/mocks/data';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => console.log('Settings')}>
          <Settings size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: currentUser.photo }}
            style={styles.profilePhoto}
          />
          <Text style={styles.profileName}>{currentUser.name}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>{currentUser.role}</Text>
          </View>
          <Text style={styles.profileBio}>{currentUser.bio}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>120</Text>
              <Text style={styles.statLabel}>Connections</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>92%</Text>
              <Text style={styles.statLabel}>Match Rate</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <MapPin size={20} color={Colors.textMuted} />
            <Text style={styles.infoText}>San Francisco, CA</Text>
          </View>
          <View style={styles.infoItem}>
            <Mail size={20} color={Colors.textMuted} />
            <Text style={styles.infoText}>john.deo@example.com</Text>
          </View>
          <View style={styles.infoItem}>
            <Briefcase size={20} color={Colors.textMuted} />
            <Text style={styles.infoText}>Founder at TechStartup Inc.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Master Skills</Text>
          </View>
          <View style={styles.skillsGrid}>
            {currentUser.skills.map((skill, index) => (
              <View key={index} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Looking For</Text>
          </View>
          <View style={styles.skillsGrid}>
            {currentUser.lookingFor.map((item, index) => (
              <View key={index} style={[styles.skillChip, styles.lookingForChip]}>
                <Text style={styles.lookingForText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            Passionate entrepreneur with 5+ years of experience in building and scaling startups. 
            Currently focused on AI-powered solutions for enterprise. Looking to connect with 
            like-minded founders and potential co-founders who share the vision of creating 
            impactful technology.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <View style={styles.experienceItem}>
            <View style={styles.experienceIcon}>
              <Briefcase size={16} color={Colors.primary} />
            </View>
            <View style={styles.experienceInfo}>
              <Text style={styles.experienceRole}>Founder & CEO</Text>
              <Text style={styles.experienceCompany}>TechStartup Inc.</Text>
              <Text style={styles.experienceDate}>2020 - Present</Text>
            </View>
          </View>
          <View style={styles.experienceItem}>
            <View style={styles.experienceIcon}>
              <Briefcase size={16} color={Colors.primary} />
            </View>
            <View style={styles.experienceInfo}>
              <Text style={styles.experienceRole}>Product Manager</Text>
              <Text style={styles.experienceCompany}>Big Tech Corp</Text>
              <Text style={styles.experienceDate}>2018 - 2020</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpace} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.primary,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  roleBadgeText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  profileBio: {
    fontSize: 15,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  editButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },
  shareButton: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textDark,
  },
  infoSection: {
    backgroundColor: Colors.white,
    marginTop: 12,
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textDark,
  },
  section: {
    backgroundColor: Colors.white,
    marginTop: 12,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: 16,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillChip: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  skillText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '500',
  },
  lookingForChip: {
    backgroundColor: Colors.background,
    borderColor: Colors.border,
  },
  lookingForText: {
    fontSize: 13,
    color: Colors.textDark,
    fontWeight: '500',
  },
  aboutText: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 22,
  },
  experienceItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  experienceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  experienceInfo: {
    flex: 1,
  },
  experienceRole: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: 4,
  },
  experienceCompany: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 2,
  },
  experienceDate: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  bottomSpace: {
    height: 40,
  },
});
