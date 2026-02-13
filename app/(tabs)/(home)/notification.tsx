import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ArrowLeft, Bell, Calendar, CreditCard, UserCheck } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';

interface Notification {
  id: string;
  type: 'appointment' | 'payment' | 'doctor' | 'general';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Appointment Reminder',
    message: 'Your appointment with Dr. Sarah Johnson is tomorrow at 10:00 AM',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Successful',
    message: 'Payment of ₹500 for consultation with Dr. Sarah Johnson was successful',
    time: '1 day ago',
    read: false,
  },
  {
    id: '3',
    type: 'doctor',
    title: 'Doctor Available',
    message: 'Dr. Michael Chen is now available for instant consultation',
    time: '2 days ago',
    read: true,
  },
  {
    id: '4',
    type: 'general',
    title: 'Health Tip',
    message: 'Remember to stay hydrated! Drink at least 8 glasses of water daily.',
    time: '3 days ago',
    read: true,
  },
  {
    id: '5',
    type: 'appointment',
    title: 'Appointment Completed',
    message: 'Your consultation with Dr. Priya Sharma has been completed',
    time: '5 days ago',
    read: true,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'appointment':
      return <Calendar size={22} color={Colors.primary} />;
    case 'payment':
      return <CreditCard size={22} color={Colors.success} />;
    case 'doctor':
      return <UserCheck size={22} color={Colors.accent} />;
    default:
      return <Bell size={22} color={Colors.warning} />;
  }
};

const getIconBg = (type: string) => {
  switch (type) {
    case 'appointment':
      return Colors.primaryLight;
    case 'payment':
      return Colors.successLight;
    case 'doctor':
      return Colors.accentLight;
    default:
      return Colors.warningLight;
  }
};

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Notifications',
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
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: insets.bottom + 20 },
          ]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.notificationCard,
                !item.read && styles.notificationCardUnread,
              ]}
              activeOpacity={0.7}
            >
              <View
                style={[styles.iconContainer, { backgroundColor: getIconBg(item.type) }]}
              >
                {getIcon(item.type)}
              </View>
              <View style={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.title}>{item.title}</Text>
                  {!item.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.message} numberOfLines={2}>
                  {item.message}
                </Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Bell size={48} color={Colors.textMuted} />
              <Text style={styles.emptyText}>No notifications yet</Text>
              <Text style={styles.emptySubtext}>
                We'll notify you about appointments and updates
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
  list: {
    padding: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  notificationCardUnread: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  message: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
  time: {
    fontSize: 12,
    color: Colors.textMuted,
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
});
