import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { ArrowLeft, Star } from 'lucide-react-native';
import Colors from '@/constants/colors';

const SAMPLE_SKILLS = [
  'React', 'Node.js', 'Python', 'AI/ML', 'Product Strategy', 
  'Marketing', 'Business Development', 'Leadership', 'UX Design', 
  'Data Science', 'Blockchain', 'Sales', 'Finance', 'Operations'
];

export default function MasterSkillsScreen() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < 5) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleContinue = () => {
    if (selectedSkills.length > 0) {
      router.push('/onboarding/goals');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Master Skills</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '56%' }]} />
          </View>
          <Text style={styles.progressText}>Step 4 of 7</Text>
        </View>

        <View style={styles.iconContainer}>
          <Star size={48} color={Colors.primary} fill={Colors.primary} />
        </View>

        <Text style={styles.title}>What are your MASTER skills?</Text>
        <Text style={styles.subtitle}>
          Pick your top 5 skills that define your expertise ({selectedSkills.length}/5)
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            These skills will be prominently displayed on your profile and given higher priority in our matching algorithm.
          </Text>
        </View>

        <View style={styles.skillsGrid}>
          {SAMPLE_SKILLS.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            const rank = selectedSkills.indexOf(skill) + 1;
            const isDisabled = !isSelected && selectedSkills.length >= 5;
            
            return (
              <TouchableOpacity
                key={skill}
                style={[
                  styles.skillCard,
                  isSelected && styles.skillCardSelected,
                  isDisabled && styles.skillCardDisabled,
                ]}
                onPress={() => toggleSkill(skill)}
                disabled={isDisabled}
              >
                {isSelected && (
                  <View style={styles.rankBadge}>
                    <Text style={styles.rankText}>{rank}</Text>
                  </View>
                )}
                <Text
                  style={[
                    styles.skillText,
                    isSelected && styles.skillTextSelected,
                    isDisabled && styles.skillTextDisabled,
                  ]}
                >
                  {skill}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity 
          style={[styles.continueButton, selectedSkills.length === 0 && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={selectedSkills.length === 0}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 24,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textDark,
    lineHeight: 20,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  skillCard: {
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  skillCardSelected: {
    backgroundColor: '#F0F9FF',
    borderColor: Colors.primary,
  },
  skillCardDisabled: {
    opacity: 0.4,
  },
  rankBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.white,
  },
  skillText: {
    fontSize: 15,
    color: Colors.textDark,
    fontWeight: '500',
  },
  skillTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  skillTextDisabled: {
    color: Colors.textMuted,
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
  bottomSpace: {
    height: 40,
  },
});
