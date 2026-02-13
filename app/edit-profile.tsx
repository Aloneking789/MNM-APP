import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, User, Calendar, MapPin, Droplets, ChevronDown } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useApp } from '@/context/AppContext';

const genderOptions = ['Male', 'Female', 'Other'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function EditProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, updateUser } = useApp();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [gender, setGender] = useState(user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : '');
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || '');
  const [city, setCity] = useState(user?.city || '');
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || '');
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showBloodGroupPicker, setShowBloodGroupPicker] = useState(false);

  const isValid = fullName.trim() && gender && dateOfBirth && city.trim();

  const handleSave = () => {
    if (isValid && user) {
      const updatedUser = {
        ...user,
        fullName: fullName.trim(),
        gender: gender.toLowerCase() as 'male' | 'female' | 'other',
        dateOfBirth,
        city: city.trim(),
        bloodGroup: bloodGroup || undefined,
      };
      updateUser(updatedUser);
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 20 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <User size={20} color={Colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor={Colors.textMuted}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <TouchableOpacity
                style={styles.inputWrapper}
                onPress={() => setShowGenderPicker(!showGenderPicker)}
                activeOpacity={0.7}
              >
                <User size={20} color={Colors.textSecondary} />
                <Text style={[styles.inputText, !gender && styles.placeholder]}>
                  {gender || 'Select gender'}
                </Text>
                <ChevronDown size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
              {showGenderPicker && (
                <View style={styles.picker}>
                  {genderOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.pickerOption}
                      onPress={() => {
                        setGender(option);
                        setShowGenderPicker(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.pickerOptionText,
                          gender === option && styles.pickerOptionSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <View style={styles.inputWrapper}>
                <Calendar size={20} color={Colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor={Colors.textMuted}
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>City</Text>
              <View style={styles.inputWrapper}>
                <MapPin size={20} color={Colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your city"
                  placeholderTextColor={Colors.textMuted}
                  value={city}
                  onChangeText={setCity}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Blood Group{' '}
                <Text style={styles.optionalLabel}>(Optional)</Text>
              </Text>
              <TouchableOpacity
                style={styles.inputWrapper}
                onPress={() => setShowBloodGroupPicker(!showBloodGroupPicker)}
                activeOpacity={0.7}
              >
                <Droplets size={20} color={Colors.textSecondary} />
                <Text style={[styles.inputText, !bloodGroup && styles.placeholder]}>
                  {bloodGroup || 'Select blood group'}
                </Text>
                <ChevronDown size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
              {showBloodGroupPicker && (
                <View style={styles.picker}>
                  {bloodGroups.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.pickerOption}
                      onPress={() => {
                        setBloodGroup(option);
                        setShowBloodGroupPicker(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.pickerOptionText,
                          bloodGroup === option && styles.pickerOptionSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!isValid}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isValid ? [Colors.primary, Colors.primaryDark] : [Colors.border, Colors.border]}
              style={styles.saveButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={[styles.saveButtonText, !isValid && styles.saveButtonTextDisabled]}
              >
                Save Changes
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  form: {
    gap: 20,
    marginBottom: 32,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  optionalLabel: {
    fontWeight: '400',
    color: Colors.textMuted,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 16,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 16,
  },
  placeholder: {
    color: Colors.textMuted,
  },
  picker: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  pickerOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  pickerOptionText: {
    fontSize: 16,
    color: Colors.text,
  },
  pickerOptionSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  saveButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  saveButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
  },
  saveButtonTextDisabled: {
    color: Colors.textMuted,
  },
});
