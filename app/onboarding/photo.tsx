import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { ArrowLeft, Camera, Upload } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function PhotoScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handleContinue = () => {
    router.push('/onboarding/complete');
  };

  const handleSkip = () => {
    router.push('/onboarding/complete');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Photo</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '84%' }]} />
          </View>
          <Text style={styles.progressText}>Step 6 of 7</Text>
        </View>

        <Text style={styles.title}>Add your photo</Text>
        <Text style={styles.subtitle}>
          A great photo increases your connection rate by 3x
        </Text>

        <View style={styles.photoContainer}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Camera size={64} color={Colors.primary} strokeWidth={1.5} />
              <Text style={styles.photoPlaceholderText}>No photo yet</Text>
            </View>
          )}
        </View>

        <View style={styles.guidelines}>
          <Text style={styles.guidelinesTitle}>Photo Guidelines</Text>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>✓</Text>
            <Text style={styles.guidelineText}>Clear face photo</Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>✓</Text>
            <Text style={styles.guidelineText}>Good lighting</Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>✓</Text>
            <Text style={styles.guidelineText}>Professional appearance</Text>
          </View>
          <View style={styles.guidelineItem}>
            <Text style={styles.guidelineBullet}>✓</Text>
            <Text style={styles.guidelineText}>Solo photo (no groups)</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              setPhotoUri('https://i.pravatar.cc/400?img=12');
            }}
          >
            <Camera size={24} color={Colors.primary} />
            <Text style={styles.actionButtonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              setPhotoUri('https://i.pravatar.cc/400?img=12');
            }}
          >
            <Upload size={24} color={Colors.primary} />
            <Text style={styles.actionButtonText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.continueButton, !photoUri && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!photoUri}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  skipText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  progressContainer: {
    paddingTop: 24,
    marginBottom: 24,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 8,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: Colors.primary,
  },
  photoPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#F0F9FF',
    borderWidth: 3,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 12,
  },
  guidelines: {
    backgroundColor: '#F0F9FF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: 12,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  guidelineBullet: {
    fontSize: 16,
    color: Colors.primary,
    marginRight: 12,
    fontWeight: 'bold',
  },
  guidelineText: {
    fontSize: 14,
    color: Colors.textDark,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonDisabled: {
    backgroundColor: Colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
