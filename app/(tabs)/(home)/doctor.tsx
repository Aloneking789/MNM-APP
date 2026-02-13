import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Star,
  Clock,
  GraduationCap,
  Languages,
  Video,
  Building2,
  Heart,
  Share2,
  MessageCircle,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { getDoctorById } from '@/mocks/doctors';

const { width } = Dimensions.get('window');

export default function DoctorProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState<'online' | 'offline'>('online');
  const [isFavorite, setIsFavorite] = useState(false);

  const doctor = getDoctorById(id || '1');

  if (!doctor) {
    return (
      <View style={styles.container}>
        <Text>Doctor not found</Text>
      </View>
    );
  }

  const tabs = [
    { id: 'online', label: 'Online Consult', icon: Video },
    { id: 'offline', label: 'Clinic Visit', icon: Building2 },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.headerButton}
            >
              <ArrowLeft size={22} color={Colors.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  size={22}
                  color={isFavorite ? Colors.secondary : Colors.text}
                  fill={isFavorite ? Colors.secondary : 'transparent'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Share2 size={22} color={Colors.text} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        <View style={[styles.profileHeader, { paddingTop: insets.top + 60 }]}>
          <Image
            source={{ uri: doctor.avatar }}
            style={styles.avatar}
            contentFit="cover"
          />
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
          <Text style={styles.doctorHospital}>{doctor.hospital}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: Colors.primaryLight }]}>
                <Clock size={18} color={Colors.primary} />
              </View>
              <Text style={styles.statValue}>{doctor.experience}+</Text>
              <Text style={styles.statLabel}>Years Exp.</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: Colors.warningLight }]}>
                <Star size={18} color={Colors.warning} fill={Colors.warning} />
              </View>
              <Text style={styles.statValue}>{doctor.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: Colors.accentLight }]}>
                <MessageCircle size={18} color={Colors.accent} />
              </View>
              <Text style={styles.statValue}>{doctor.reviewCount}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>{doctor.about}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Qualifications</Text>
            <View style={styles.infoRow}>
              <GraduationCap size={20} color={Colors.primary} />
              <Text style={styles.infoText}>{doctor.education}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.infoRow}>
              <Languages size={20} color={Colors.primary} />
              <Text style={styles.infoText}>{doctor.languages.join(', ')}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Consultation Type</Text>
            <View style={styles.tabsContainer}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = selectedTab === tab.id;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    style={[styles.tab, isActive && styles.tabActive]}
                    onPress={() => setSelectedTab(tab.id as any)}
                    activeOpacity={0.7}
                  >
                    <Icon
                      size={20}
                      color={isActive ? Colors.white : Colors.textSecondary}
                    />
                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.feeSection}>
            <View style={styles.feeInfo}>
              <Text style={styles.feeLabel}>Consultation Fee</Text>
              <Text style={styles.feeValue}>₹{doctor.fee}</Text>
            </View>
            <View
              style={[
                styles.availabilityBadge,
                { backgroundColor: doctor.isOnline ? Colors.successLight : Colors.warningLight },
              ]}
            >
              <View
                style={[
                  styles.availabilityDot,
                  { backgroundColor: doctor.isOnline ? Colors.success : Colors.warning },
                ]}
              />
              <Text
                style={[
                  styles.availabilityText,
                  { color: doctor.isOnline ? Colors.success : Colors.warning },
                ]}
              >
                {doctor.isOnline ? 'Available Now' : 'Available Later'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() =>
            router.push({
              pathname: '/(tabs)/(home)/booking',
              params: { doctorId: doctor.id, type: selectedTab },
            })
          }
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            style={styles.bookButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.bookButtonText}>Book Appointment</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  profileHeader: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: Colors.primaryLight,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  doctorHospital: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: Colors.border,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.white,
  },
  feeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
  },
  feeInfo: {},
  feeLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  feeValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  availabilityText: {
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  bookButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  bookButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
  },
});
