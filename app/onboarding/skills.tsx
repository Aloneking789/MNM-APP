import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, TextInput } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { ArrowLeft, Search, X } from 'lucide-react-native';
import Colors from '@/constants/colors';

const SKILL_CATEGORIES = {
  Technical: ['React', 'Node.js', 'Python', 'AI/ML', 'Blockchain', 'Cloud Architecture', 'DevOps', 'Data Science'],
  Business: ['Product Strategy', 'Marketing', 'Sales', 'Business Development', 'Finance', 'Operations'],
  'Soft Skills': ['Leadership', 'Communication', 'Problem Solving', 'Team Management', 'Negotiation'],
  Industry: ['FinTech', 'HealthTech', 'EdTech', 'E-commerce', 'SaaS', 'Enterprise AI'],
};

export default function SkillsScreen() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<keyof typeof SKILL_CATEGORIES>('Technical');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < 10) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleContinue = () => {
    if (selectedSkills.length > 0) {
      router.push('/onboarding/master-skills');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Skills</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.topSection}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '42%' }]} />
            </View>
            <Text style={styles.progressText}>Step 3 of 7</Text>
          </View>

          <Text style={styles.title}>What are your skills?</Text>
          <Text style={styles.subtitle}>Select up to 10 skills ({selectedSkills.length}/10)</Text>

          <View style={styles.searchContainer}>
            <Search size={20} color={Colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search skills..."
              placeholderTextColor={Colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {selectedSkills.length > 0 && (
            <View style={styles.selectedContainer}>
              <Text style={styles.selectedTitle}>Selected Skills</Text>
              <View style={styles.selectedSkills}>
                {selectedSkills.map((skill) => (
                  <View key={skill} style={styles.selectedSkillChip}>
                    <Text style={styles.selectedSkillText}>{skill}</Text>
                    <TouchableOpacity onPress={() => toggleSkill(skill)}>
                      <X size={16} color={Colors.white} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categories}
          >
            {Object.keys(SKILL_CATEGORIES).map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTab,
                  activeCategory === category && styles.categoryTabActive,
                ]}
                onPress={() => setActiveCategory(category as keyof typeof SKILL_CATEGORIES)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === category && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView 
          style={styles.skillsScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.skillsContent}
        >
          <View style={styles.skillsGrid}>
            {SKILL_CATEGORIES[activeCategory].map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              const isDisabled = !isSelected && selectedSkills.length >= 10;
              
              return (
                <TouchableOpacity
                  key={skill}
                  style={[
                    styles.skillChip,
                    isSelected && styles.skillChipSelected,
                    isDisabled && styles.skillChipDisabled,
                  ]}
                  onPress={() => toggleSkill(skill)}
                  disabled={isDisabled}
                >
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
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.continueButton, selectedSkills.length === 0 && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={selectedSkills.length === 0}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
  },
  topSection: {
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
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.textDark,
  },
  selectedContainer: {
    marginBottom: 20,
  },
  selectedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: 12,
  },
  selectedSkills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedSkillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectedSkillText: {
    fontSize: 13,
    color: Colors.white,
    fontWeight: '500',
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categories: {
    gap: 12,
    paddingRight: 24,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textDark,
  },
  categoryTextActive: {
    color: Colors.white,
  },
  skillsScroll: {
    flex: 1,
  },
  skillsContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  skillChipSelected: {
    backgroundColor: '#F0F9FF',
    borderColor: Colors.primary,
  },
  skillChipDisabled: {
    opacity: 0.4,
  },
  skillText: {
    fontSize: 14,
    color: Colors.textDark,
  },
  skillTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  skillTextDisabled: {
    color: Colors.textMuted,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
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
