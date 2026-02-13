import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Brain,
  Send,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useApp } from '@/context/AppContext';
import { SymptomResult } from '@/types';

const urgencyConfig = {
  low: {
    color: Colors.success,
    bgColor: Colors.successLight,
    icon: CheckCircle,
    label: 'Low Urgency',
  },
  medium: {
    color: Colors.warning,
    bgColor: Colors.warningLight,
    icon: AlertCircle,
    label: 'Moderate Urgency',
  },
  high: {
    color: Colors.error,
    bgColor: Colors.errorLight,
    icon: AlertTriangle,
    label: 'High Urgency',
  },
};

export default function AIAssistScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useApp();
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SymptomResult | null>(null);

  const analyzeSymptoms = () => {
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const symptomLower = symptoms.toLowerCase();
      let mockResult: SymptomResult;

      if (symptomLower.includes('headache') || symptomLower.includes('fever') || symptomLower.includes('cold')) {
        mockResult = {
          category: 'General Physician',
          categoryId: '1',
          confidence: 89,
          urgency: 'low',
          description: 'Based on your symptoms, a General Physician can help diagnose and treat common conditions like fever, cold, or headaches.',
        };
      } else if (symptomLower.includes('skin') || symptomLower.includes('rash') || symptomLower.includes('acne')) {
        mockResult = {
          category: 'Dermatology',
          categoryId: '4',
          confidence: 92,
          urgency: 'low',
          description: 'Skin-related symptoms are best evaluated by a Dermatologist who specializes in skin conditions.',
        };
      } else if (symptomLower.includes('chest') || symptomLower.includes('heart') || symptomLower.includes('breathing')) {
        mockResult = {
          category: 'Cardiology',
          categoryId: '6',
          confidence: 85,
          urgency: 'high',
          description: 'Chest pain or breathing difficulties may require immediate attention from a Cardiologist.',
        };
      } else if (symptomLower.includes('stress') || symptomLower.includes('anxiety') || symptomLower.includes('depression')) {
        mockResult = {
          category: 'Psychiatry',
          categoryId: '8',
          confidence: 94,
          urgency: 'medium',
          description: 'Mental health concerns should be addressed by a Psychiatrist who can provide proper evaluation and support.',
        };
      } else {
        mockResult = {
          category: 'General Physician',
          categoryId: '1',
          confidence: 75,
          urgency: 'low',
          description: 'A General Physician can evaluate your symptoms and refer you to a specialist if needed.',
        };
      }

      setResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const UrgencyIcon = result ? urgencyConfig[result.urgency].icon : CheckCircle;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <LinearGradient
            colors={[Colors.secondary, '#FF8E8E']}
            style={styles.iconContainer}
          >
            <Brain size={32} color={Colors.white} />
          </LinearGradient>
          <Text style={styles.title}>AI Symptom Checker</Text>
          <Text style={styles.subtitle}>
            Describe your symptoms and our AI will suggest the right specialist
          </Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Describe your symptoms</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="E.g., I have been experiencing headache and mild fever for 2 days..."
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={5}
              value={symptoms}
              onChangeText={setSymptoms}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.userInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>
                {user?.dateOfBirth ? '28 years' : 'Not set'}
              </Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>
                {user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not set'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.analyzeButton, !symptoms.trim() && styles.analyzeButtonDisabled]}
            onPress={analyzeSymptoms}
            disabled={!symptoms.trim() || isAnalyzing}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={symptoms.trim() ? [Colors.secondary, '#FF8E8E'] : [Colors.border, Colors.border]}
              style={styles.analyzeButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {isAnalyzing ? (
                <>
                  <Sparkles size={20} color={Colors.white} />
                  <Text style={styles.analyzeButtonText}>Analyzing...</Text>
                </>
              ) : (
                <>
                  <Send size={20} color={symptoms.trim() ? Colors.white : Colors.textMuted} />
                  <Text style={[styles.analyzeButtonText, !symptoms.trim() && styles.analyzeButtonTextDisabled]}>
                    Analyze Symptoms
                  </Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {result && (
          <View style={styles.resultSection}>
            <Text style={styles.resultTitle}>AI Analysis Result</Text>
            
            <View style={styles.resultCard}>
              <View style={styles.confidenceRow}>
                <View style={styles.confidenceCircle}>
                  <Text style={styles.confidenceValue}>{result.confidence}%</Text>
                  <Text style={styles.confidenceLabel}>Match</Text>
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.suggestedLabel}>Suggested Specialist</Text>
                  <Text style={styles.categoryName}>{result.category}</Text>
                </View>
              </View>

              <View
                style={[
                  styles.urgencyBadge,
                  { backgroundColor: urgencyConfig[result.urgency].bgColor },
                ]}
              >
                <UrgencyIcon size={18} color={urgencyConfig[result.urgency].color} />
                <Text
                  style={[styles.urgencyText, { color: urgencyConfig[result.urgency].color }]}
                >
                  {urgencyConfig[result.urgency].label}
                </Text>
              </View>

              <Text style={styles.resultDescription}>{result.description}</Text>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.consultButton}
                  onPress={() =>
                    router.push({
                      pathname: '/(tabs)/(home)/category',
                      params: { id: result.categoryId, name: result.category },
                    })
                  }
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[Colors.primary, Colors.primaryDark]}
                    style={styles.consultButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.consultButtonText}>Consult Now</Text>
                    <ChevronRight size={18} color={Colors.white} />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.viewDoctorsButton}
                  onPress={() =>
                    router.push({
                      pathname: '/(tabs)/(home)/category',
                      params: { id: result.categoryId, name: result.category },
                    })
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.viewDoctorsText}>View Doctors</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.disclaimer}>
              <AlertCircle size={16} color={Colors.textMuted} />
              <Text style={styles.disclaimerText}>
                This AI analysis is for informational purposes only and should not replace professional medical advice.
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: insets.bottom + 20 }} />
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  inputSection: {
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },
  textAreaContainer: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  textArea: {
    padding: 16,
    fontSize: 15,
    color: Colors.text,
    minHeight: 120,
    lineHeight: 22,
  },
  userInfo: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  analyzeButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  analyzeButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  analyzeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  analyzeButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
  },
  analyzeButtonTextDisabled: {
    color: Colors.textMuted,
  },
  resultSection: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  confidenceCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  confidenceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  confidenceLabel: {
    fontSize: 11,
    color: Colors.primary,
  },
  categoryInfo: {
    flex: 1,
  },
  suggestedLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
  },
  urgencyText: {
    fontSize: 13,
    fontWeight: '600',
  },
  resultDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  actionButtons: {
    gap: 12,
  },
  consultButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  consultButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  consultButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  viewDoctorsButton: {
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  viewDoctorsText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    paddingHorizontal: 4,
    gap: 8,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 18,
  },
});
