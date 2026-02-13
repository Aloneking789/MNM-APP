import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { ArrowLeft, Search, Star, X } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { doctors } from '@/mocks/doctors';
import { categories } from '@/mocks/categories';

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const filteredDoctors = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(lowerQuery) ||
        doctor.specialty.toLowerCase().includes(lowerQuery) ||
        doctor.hospital.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const recentSearches = ['General Physician', 'Dermatologist', 'Dr. Sarah'];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft size={22} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={Colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search doctors, specialties..."
              placeholderTextColor={Colors.textMuted}
              value={query}
              onChangeText={setQuery}
              autoFocus
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')}>
                <X size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {!query.trim() ? (
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            {recentSearches.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentItem}
                onPress={() => setQuery(item)}
              >
                <Search size={18} color={Colors.textMuted} />
                <Text style={styles.recentText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <FlatList
            data={[...filteredCategories, ...filteredDoctors]}
            keyExtractor={(item) => ('categoryId' in item ? `cat-${item.id}` : `doc-${item.id}`)}
            contentContainerStyle={styles.resultsList}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              filteredCategories.length > 0 ? (
                <Text style={styles.sectionTitle}>Categories</Text>
              ) : null
            }
            renderItem={({ item, index }) => {
              if ('description' in item) {
                return (
                  <TouchableOpacity
                    style={styles.categoryItem}
                    onPress={() =>
                      router.push({
                        pathname: '/(tabs)/(home)/category',
                        params: { id: item.id, name: item.name },
                      })
                    }
                  >
                    <View
                      style={[styles.categoryDot, { backgroundColor: item.color }]}
                    />
                    <View style={styles.categoryInfo}>
                      <Text style={styles.categoryName}>{item.name}</Text>
                      <Text style={styles.categoryDesc}>{item.description}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }

              const showDoctorsHeader =
                index === filteredCategories.length && filteredDoctors.length > 0;

              return (
                <>
                  {showDoctorsHeader && (
                    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                      Doctors
                    </Text>
                  )}
                  <TouchableOpacity
                    style={styles.doctorItem}
                    onPress={() =>
                      router.push({
                        pathname: '/(tabs)/(home)/doctor',
                        params: { id: item.id },
                      })
                    }
                  >
                    <Image
                      source={{ uri: item.avatar }}
                      style={styles.doctorAvatar}
                      contentFit="cover"
                    />
                    <View style={styles.doctorInfo}>
                      <Text style={styles.doctorName}>{item.name}</Text>
                      <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
                      <View style={styles.doctorMeta}>
                        <Star size={12} color="#F59E0B" fill="#F59E0B" />
                        <Text style={styles.doctorRating}>{item.rating}</Text>
                        <Text style={styles.doctorExp}>
                          • {item.experience} yrs
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.doctorFee}>₹{item.fee}</Text>
                  </TouchableOpacity>
                </>
              );
            }}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No results found</Text>
                <Text style={styles.emptySubtext}>
                  Try a different search term
                </Text>
              </View>
            }
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    paddingVertical: 12,
  },
  recentSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  recentText: {
    fontSize: 15,
    color: Colors.text,
  },
  resultsList: {
    padding: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
  },
  categoryDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  doctorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 12,
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
  },
  doctorSpecialty: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  doctorRating: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
  },
  doctorExp: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  doctorFee: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
