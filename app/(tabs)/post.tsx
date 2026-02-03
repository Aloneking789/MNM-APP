import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, StatusBar } from 'react-native';
import { ArrowLeft, Image as ImageIcon, Video, BarChart3, Clock, Edit, X } from 'lucide-react-native';
import { router, useNavigation } from 'expo-router';
import { currentUser } from '@/mocks/data';
import Colors from '@/constants/colors';
import { useState, useEffect } from 'react';

export default function PostScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      e.preventDefault();
      router.push('/create-post');
    });

    return unsubscribe;
  }, [navigation]);
  const [postText, setPostText] = useState('');
  const [hasImage, setHasImage] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      <View style={styles.content}>
        <Text style={styles.message}>This is a placeholder tab.</Text>
        <Text style={styles.message}>Tap the + button to create a post.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  message: {
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 8,
  },
});
