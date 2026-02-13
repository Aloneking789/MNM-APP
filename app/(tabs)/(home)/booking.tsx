import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Calendar, Clock, Video, Building2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { getDoctorById } from '@/mocks/doctors';
import { generateTimeSlots, getUpcomingDates } from '@/mocks/appointments';

export default function BookingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { doctorId, type } = useLocalSearchParams<{ doctorId: string; type: string }>();

  const doctor = getDoctorById(doctorId || '1');
  const dates = useMemo(() => getUpcomingDates(), []);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const timeSlots = useMemo(() => generateTimeSlots(selectedDate), [selectedDate]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dateStr === today.toISOString().split('T')[0]) {
      return 'Today';
    }
    if (dateStr === tomorrow.toISOString().split('T')[0]) {
      return 'Tomorrow';
    }

    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDayNumber = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getDate();
  };

  if (!doctor) {
    return (
      <View style={styles.container}>
        <Text>Doctor not found</Text>
      </View>
    );
  }

  const isOnline = type === 'online';

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Select Slot',
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
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        <View style={styles.doctorCard}>
          <Image
            source={{ uri: doctor.avatar }}
            style={styles.doctorAvatar}
            contentFit="cover"
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
            <View style={styles.consultTypeBadge}>
              {isOnline ? (
                <Video size={14} color={Colors.primary} />
              ) : (
                <Building2 size={14} color={Colors.accent} />
              )}
              <Text style={[styles.consultTypeText, { color: isOnline ? Colors.primary : Colors.accent }]}>
                {isOnline ? 'Online Consultation' : 'Clinic Visit'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Select Date</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesScroll}
          >
            {dates.map((date) => (
              <TouchableOpacity
                key={date}
                style={[
                  styles.dateCard,
                  selectedDate === date && styles.dateCardActive,
                ]}
                onPress={() => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dateDayName,
                    selectedDate === date && styles.dateDayNameActive,
                  ]}
                >
                  {getDayName(date)}
                </Text>
                <Text
                  style={[
                    styles.dateDayNumber,
                    selectedDate === date && styles.dateDayNumberActive,
                  ]}
                >
                  {getDayNumber(date)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Available Slots</Text>
          </View>
          <Text style={styles.selectedDateText}>{formatDate(selectedDate)}</Text>

          <View style={styles.slotsGrid}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.slotCard,
                  !slot.available && styles.slotCardUnavailable,
                  selectedSlot === slot.id && styles.slotCardActive,
                ]}
                onPress={() => slot.available && setSelectedSlot(slot.id)}
                disabled={!slot.available}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.slotText,
                    !slot.available && styles.slotTextUnavailable,
                    selectedSlot === slot.id && styles.slotTextActive,
                  ]}
                >
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.footerInfo}>
          <Text style={styles.feeLabel}>Consultation Fee</Text>
          <Text style={styles.feeValue}>₹{doctor.fee}</Text>
        </View>
        <TouchableOpacity
          style={[styles.continueButton, !selectedSlot && styles.continueButtonDisabled]}
          onPress={() =>
            router.push({
              pathname: '/(tabs)/(home)/payment',
              params: {
                doctorId: doctor.id,
                date: selectedDate,
                time: timeSlots.find((s) => s.id === selectedSlot)?.time || '',
                type: type || 'online',
              },
            })
          }
          disabled={!selectedSlot}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={selectedSlot ? [Colors.primary, Colors.primaryDark] : [Colors.border, Colors.border]}
            style={styles.continueButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.continueButtonText, !selectedSlot && styles.continueButtonTextDisabled]}>
              Continue
            </Text>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    margin: 20,
    padding: 16,
    borderRadius: 16,
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
    marginLeft: 14,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  consultTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  consultTypeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  datesScroll: {
    gap: 10,
  },
  dateCard: {
    width: 60,
    height: 76,
    backgroundColor: Colors.white,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateCardActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dateDayName: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  dateDayNameActive: {
    color: 'rgba(255,255,255,0.8)',
  },
  dateDayNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  dateDayNumberActive: {
    color: Colors.white,
  },
  selectedDateText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  slotCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  slotCardUnavailable: {
    backgroundColor: Colors.borderLight,
    borderColor: Colors.borderLight,
  },
  slotCardActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  slotText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
  },
  slotTextUnavailable: {
    color: Colors.textMuted,
  },
  slotTextActive: {
    color: Colors.white,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerInfo: {
    flex: 1,
  },
  feeLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  feeValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  continueButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueButtonDisabled: {},
  continueButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: Colors.textMuted,
  },
});
