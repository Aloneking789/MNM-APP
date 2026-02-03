import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useState } from 'react';
import { X, Rocket, Handshake, CheckCircle2 } from 'lucide-react-native';
import { mockMatches } from '@/mocks/data';
import Colors from '@/constants/colors';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;

export default function CoFounderScreen() {
  const [matches] = useState(mockMatches);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSkip = () => {
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSuperInterest = () => {
    console.log('Super Interest:', matches[currentIndex].name);
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleConnect = () => {
    console.log('Connect:', matches[currentIndex].name);
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentMatch = matches[currentIndex];

  if (!currentMatch) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No more matches</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Co-Founder</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: currentMatch.photo }}
              style={styles.profilePhoto}
              resizeMode="cover"
            />
            <View style={styles.matchBadge}>
              <Text style={styles.matchBadgeText}>🔥 {currentMatch.matchPercentage}% Match</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{currentMatch.name}</Text>
              {currentMatch.verified && (
                <CheckCircle2 size={20} color={Colors.primary} fill={Colors.primary} />
              )}
              <View style={[styles.roleBadge, { 
                backgroundColor: currentMatch.role === 'Investor' ? Colors.investor : Colors.entrepreneur 
              }]}>
                <Text style={styles.roleBadgeText}>{currentMatch.role}</Text>
              </View>
            </View>

            <Text style={styles.bio}>{currentMatch.bio}</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Looking For</Text>
              <View style={styles.tags}>
                {currentMatch.lookingFor.map((item, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skill Set</Text>
              <View style={styles.tags}>
                {currentMatch.skills.map((skill, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{skill}</Text>
                  </View>
                ))}
                {currentMatch.additionalSkills > 0 && (
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>+{currentMatch.additionalSkills}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.skipButton]}
          onPress={handleSkip}
        >
          <X size={32} color="#FF5252" strokeWidth={2.5} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.superInterestButton]}
          onPress={handleSuperInterest}
        >
          <Rocket size={28} color={Colors.white} strokeWidth={2} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.connectButton]}
          onPress={handleConnect}
        >
          <Handshake size={32} color={Colors.white} strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: 280,
    position: 'relative',
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FF8C42',
  },
  matchBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  matchBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textDark,
  },
  infoContainer: {
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  bio: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textLight,
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: Colors.background,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textDark,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 30,
    paddingBottom: 40,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  skipButton: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: '#FFE0E0',
  },
  superInterestButton: {
    backgroundColor: Colors.primary,
  },
  connectButton: {
    backgroundColor: Colors.connect,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: Colors.textMuted,
  },
});
