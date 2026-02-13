import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { ArrowLeft, Star, Video, Building2, Filter, ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { categories } from '@/mocks/categories';
import { getDoctorsByCategory, doctors } from '@/mocks/doctors';

export default function CategoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id, name, type } = useLocalSearchParams<{ id?: string; name?: string; type?: string }>();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'online' | 'offline'>('all');

  const categoryDoctors = id ? getDoctorsByCategory(id) : doctors;
  const categoryName = name || 'All Doctors';

  const filteredDoctors = categoryDoctors.filter((doctor) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'online') return doctor.isOnline;
    return !doctor.isOnline;
  });

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'online', label: 'Online Now' },
    { id: 'offline', label: 'Clinic Visit' },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: categoryName,
          headerTitleStyle: { fontWeight: '600', fontSize: 17 },
          headerStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft size={22} color={Colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        {!id && (
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Select Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryChip}
                  onPress={() =>
                    router.push({
                      pathname: '/(tabs)/(home)/category',
                      params: { id: category.id, name: category.name },
                    })
                  }
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.categoryDot, { backgroundColor: category.color }]}
                  />
                  <Text style={styles.categoryChipText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  selectedFilter === filter.id && styles.filterChipActive,
                ]}
                onPress={() => setSelectedFilter(filter.id as any)}
                activeOpacity={0.7}
              >
                {filter.id === 'online' && (
                  <Video size={16} color={selectedFilter === filter.id ? Colors.white : Colors.textSecondary} />
                )}
                {filter.id === 'offline' && (
                  <Building2 size={16} color={selectedFilter === filter.id ? Colors.white : Colors.textSecondary} />
                )}
                <Text
                  style={[
                    styles.filterChipText,
                    selectedFilter === filter.id && styles.filterChipTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={filteredDoctors}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.doctorsList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: doctor }) => (
            <TouchableOpacity
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
                <View style={styles.doctorHeader}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: doctor.isOnline ? Colors.successLight : Colors.borderLight },
                    ]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: doctor.isOnline ? Colors.success : Colors.textMuted },
                      ]}
                    />
                    <Text
                      style={[
                        styles.statusText,
                        { color: doctor.isOnline ? Colors.success : Colors.textMuted },
                      ]}
                    >
                      {doctor.isOnline ? 'Online' : 'Offline'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <Text style={styles.doctorHospital}>{doctor.hospital}</Text>
                <View style={styles.doctorMeta}>
                  <View style={styles.metaItem}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.metaText}>
                      {doctor.rating} ({doctor.reviewCount})
                    </Text>
                  </View>
                  <Text style={styles.metaDivider}>•</Text>
                  <Text style={styles.metaText}>{doctor.experience} yrs</Text>
                </View>
                <View style={styles.doctorFooter}>
                  <Text style={styles.doctorFee}>₹{doctor.fee}</Text>
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() =>
                      router.push({
                        pathname: '/(tabs)/(home)/doctor',
                        params: { id: doctor.id },
                      })
                    }
                    activeOpacity={0.8}
                  >
                    <Text style={styles.bookButtonText}>Book Now</Text>
                    <ChevronRight size={16} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No doctors found</Text>
              <Text style={styles.emptySubtext}>
                Try changing the filter or category
              </Text>
            </View>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesSection: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
  },
  filterSection: {
    paddingVertical: 12,
  },
  filtersScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  filterChipTextActive: {
    color: Colors.white,
  },
  doctorsList: {
    padding: 20,
    gap: 16,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  doctorAvatar: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: Colors.border,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 14,
  },
  doctorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  doctorSpecialty: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  doctorHospital: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  metaDivider: {
    marginHorizontal: 8,
    color: Colors.textMuted,
  },
  doctorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorFee: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  bookButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
