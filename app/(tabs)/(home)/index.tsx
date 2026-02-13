import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import {
  Search,
  Bell,
  MapPin,
  ChevronRight,
  Video,
  Building2,
  Brain,
  Stethoscope,
  Heart,
  Baby,
  Sparkles,
  Bone,
  HeartPulse,
  type LucideIcon,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { categories } from '@/mocks/categories';
import { doctors } from '@/mocks/doctors';
import { useApp } from '@/context/AppContext';

const { width } = Dimensions.get('window');

type GradientColors = readonly [string, string, ...string[]];

const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Heart,
  Baby,
  Sparkles,
  Bone,
  HeartPulse,
  Brain,
};

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useApp();
  const location = 'Mumbai, India';

  const quickActions: { id: string; title: string; subtitle: string; icon: React.ReactNode; gradient: GradientColors; onPress: () => void }[] = [
    {
      id: '1',
      title: 'Instant Online\nConsult',
      subtitle: 'Connect in 60s',
      icon: <Video size={28} color={Colors.white} />,
      gradient: ['#00A896', '#00D4AA'] as GradientColors,
      onPress: () => router.push('/(tabs)/(home)/category'),
    },
    {
      id: '2',
      title: 'Book Clinic\nVisit',
      subtitle: 'In-person care',
      icon: <Building2 size={28} color={Colors.white} />,
      gradient: ['#5E60CE', '#7B7FE8'] as GradientColors,
      onPress: () => router.push('/(tabs)/(home)/category'),
    },
    {
      id: '3',
      title: 'AI Symptom\nChecker',
      subtitle: 'Get suggestions',
      icon: <Brain size={28} color={Colors.white} />,
      gradient: ['#FF6B6B', '#FF8E8E'] as GradientColors,
      onPress: () => router.push('/(tabs)/ai-assist'),
    },
  ];

  const recentDoctors = doctors.slice(0, 3);

  const renderCategoryIcon = (iconName: string, color: string) => {
    const IconComponent = iconMap[iconName];
    if (IconComponent) {
      return <IconComponent size={24} color={color} />;
    }
    return <Stethoscope size={24} color={color} />;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.locationButton} activeOpacity={0.7}>
              <MapPin size={18} color={Colors.primary} />
              <Text style={styles.locationText}>{location}</Text>
            </TouchableOpacity>
            <Text style={styles.greeting}>
              Hello, {user?.fullName?.split(' ')[0] || 'there'} 👋
            </Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => router.push('/(tabs)/(home)/notifications')}
            activeOpacity={0.7}
          >
            <Bell size={22} color={Colors.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => router.push('/(tabs)/(home)/search')}
          activeOpacity={0.7}
        >
          <Search size={20} color={Colors.textMuted} />
          <Text style={styles.searchPlaceholder}>Search doctors, specialties...</Text>
        </TouchableOpacity>

        <View style={styles.quickActionsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsScroll}
          >
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                activeOpacity={0.9}
                onPress={action.onPress}
              >
                <LinearGradient
                  colors={action.gradient}
                  style={styles.quickActionCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.quickActionIcon}>{action.icon}</View>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                  <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/(home)/category')}
              activeOpacity={0.7}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesGrid}>
            {categories.slice(0, 8).map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/(home)/category',
                    params: { id: category.id, name: category.name },
                  })
                }
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: category.color + '20' },
                  ]}
                >
                  {renderCategoryIcon(category.icon, category.color)}
                </View>
                <Text style={styles.categoryName} numberOfLines={2}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Doctors</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentDoctors.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              style={styles.doctorCard}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/(home)/doctor',
                  params: { id: doctor.id },
                })
              }
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: doctor.avatar }}
                style={styles.doctorAvatar}
                contentFit="cover"
              />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <View style={styles.doctorMeta}>
                  <Text style={styles.doctorExperience}>
                    {doctor.experience} yrs exp
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>⭐ {doctor.rating}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.doctorRight}>
                <View
                  style={[
                    styles.onlineIndicator,
                    { backgroundColor: doctor.isOnline ? Colors.online : Colors.offline },
                  ]}
                />
                <Text style={styles.doctorFee}>₹{doctor.fee}</Text>
                <ChevronRight size={18} color={Colors.textMuted} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchPlaceholder: {
    fontSize: 15,
    color: Colors.textMuted,
  },
  quickActionsContainer: {
    marginTop: 20,
  },
  quickActionsScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  quickActionCard: {
    width: 140,
    height: 160,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
    lineHeight: 20,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: (width - 40 - 36) / 4,
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 14,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: Colors.border,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  doctorExperience: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
  },
  doctorRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  doctorFee: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
});
