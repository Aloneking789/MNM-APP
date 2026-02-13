import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Calendar,
  Clock,
  Video,
  Building2,
  ChevronRight,
  X,
  ExternalLink,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useApp } from '@/context/AppContext';
import { Appointment } from '@/types';

const tabs = ['Upcoming', 'Completed', 'Cancelled'];

const statusConfig = {
  upcoming: { color: Colors.primary, bgColor: Colors.primaryLight },
  completed: { color: Colors.success, bgColor: Colors.successLight },
  cancelled: { color: Colors.error, bgColor: Colors.errorLight },
};

export default function AppointmentsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { appointments, cancelAppointment } = useApp();
  const [activeTab, setActiveTab] = useState(0);

  const filteredAppointments = useMemo(() => {
    const statusFilter = tabs[activeTab].toLowerCase();
    return appointments.filter((apt) => apt.status === statusFilter);
  }, [appointments, activeTab]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleCancel = (appointment: Appointment) => {
    Alert.alert(
      'Cancel Appointment',
      `Are you sure you want to cancel your appointment with ${appointment.doctor.name}?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => cancelAppointment(appointment.id),
        },
      ]
    );
  };

  const handleJoin = (zoomLink: string) => {
    Alert.alert('Join Meeting', 'This would open the Zoom meeting link in a real app.');
  };

  const renderAppointment = ({ item }: { item: Appointment }) => {
    const isUpcoming = item.status === 'upcoming';
    const isOnline = item.type === 'online';

    return (
      <View style={styles.appointmentCard}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.typeBadge,
              { backgroundColor: isOnline ? Colors.primaryLight : Colors.accentLight },
            ]}
          >
            {isOnline ? (
              <Video size={14} color={Colors.primary} />
            ) : (
              <Building2 size={14} color={Colors.accent} />
            )}
            <Text style={[styles.typeText, { color: isOnline ? Colors.primary : Colors.accent }]}>
              {isOnline ? 'Online' : 'Clinic'}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusConfig[item.status].bgColor },
            ]}
          >
            <Text style={[styles.statusText, { color: statusConfig[item.status].color }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.doctorRow}>
          <Image
            source={{ uri: item.doctor.avatar }}
            style={styles.doctorAvatar}
            contentFit="cover"
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{item.doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{item.doctor.specialty}</Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Calendar size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.feeText}>₹{item.fee}</Text>
          
          {isUpcoming && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancel(item)}
                activeOpacity={0.7}
              >
                <X size={16} color={Colors.error} />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              {isOnline && item.zoomLink && (
                <TouchableOpacity
                  style={styles.joinButton}
                  onPress={() => handleJoin(item.zoomLink!)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[Colors.primary, Colors.primaryDark]}
                    style={styles.joinButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <ExternalLink size={16} color={Colors.white} />
                    <Text style={styles.joinButtonText}>Join</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          )}

          {item.status === 'completed' && (
            <TouchableOpacity
              style={styles.rebookButton}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/(home)/doctor',
                  params: { id: item.doctor.id },
                })
              }
              activeOpacity={0.7}
            >
              <Text style={styles.rebookButtonText}>Book Again</Text>
              <ChevronRight size={16} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Appointments</Text>
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === index && styles.tabActive]}
            onPress={() => setActiveTab(index)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === index && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointment}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Calendar size={48} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No {tabs[activeTab].toLowerCase()} appointments</Text>
            <Text style={styles.emptySubtext}>
              {activeTab === 0 ? 'Book an appointment to get started' : 'Your past appointments will appear here'}
            </Text>
            {activeTab === 0 && (
              <TouchableOpacity
                style={styles.bookNowButton}
                onPress={() => router.push('/(tabs)/(home)/category')}
                activeOpacity={0.8}
              >
                <Text style={styles.bookNowText}>Book Now</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.white,
  },
  list: {
    paddingHorizontal: 20,
  },
  appointmentCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.border,
  },
  doctorInfo: {
    marginLeft: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  doctorSpecialty: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 14,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  feeText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.error,
    gap: 4,
  },
  cancelButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.error,
  },
  joinButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  joinButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  joinButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
  rebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rebookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  bookNowButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  bookNowText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
