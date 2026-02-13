import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';
import { User, Appointment } from '@/types';
import { appointments as mockAppointments } from '@/mocks/appointment';

const STORAGE_KEYS = {
  HAS_ONBOARDED: 'has_onboarded',
  USER: 'user_data',
  APPOINTMENTS: 'appointments',
};

export const [AppProvider, useApp] = createContextHook(() => {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const initQuery = useQuery({
    queryKey: ['appInit'],
    queryFn: async () => {
      const [onboarded, userData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.HAS_ONBOARDED),
        AsyncStorage.getItem(STORAGE_KEYS.USER),
      ]);
      return {
        hasOnboarded: onboarded === 'true',
        user: userData ? JSON.parse(userData) : null,
      };
    },
  });

  useEffect(() => {
    if (initQuery.data) {
      setHasOnboarded(initQuery.data.hasOnboarded);
      if (initQuery.data.user) {
        setUser(initQuery.data.user);
        setIsAuthenticated(true);
      }
    }
  }, [initQuery.data]);

  const completeOnboardingMutation = useMutation({
    mutationFn: async () => {
      await AsyncStorage.setItem(STORAGE_KEYS.HAS_ONBOARDED, 'true');
      return true;
    },
    onSuccess: () => {
      setHasOnboarded(true);
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (userData: User) => {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      return userData;
    },
    onSuccess: (userData) => {
      setUser(userData);
      setIsAuthenticated(true);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      return true;
    },
    onSuccess: () => {
      setUser(null);
      setIsAuthenticated(false);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (userData: User) => {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      return userData;
    },
    onSuccess: (userData) => {
      setUser(userData);
    },
  });

  const addAppointment = useCallback((appointment: Appointment) => {
    setAppointments(prev => [appointment, ...prev]);
  }, []);

  const cancelAppointment = useCallback((appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt
      )
    );
  }, []);

  return {
    hasOnboarded,
    isAuthenticated,
    user,
    appointments,
    isLoading: initQuery.isLoading,
    completeOnboarding: () => completeOnboardingMutation.mutate(),
    login: (userData: User) => loginMutation.mutate(userData),
    logout: () => logoutMutation.mutate(),
    updateUser: (userData: User) => updateUserMutation.mutate(userData),
    addAppointment,
    cancelAppointment,
  };
});
