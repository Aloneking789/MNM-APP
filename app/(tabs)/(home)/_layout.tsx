import { Stack } from 'expo-router';
import React from 'react';
import Colors from '@/constants/colors';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="category" />
      <Stack.Screen name="doctor" />
      <Stack.Screen name="booking" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="search" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}
