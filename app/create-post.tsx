import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, StatusBar } from 'react-native';
import { ArrowLeft, Image as ImageIcon, Video, BarChart3, Clock, Edit, X } from 'lucide-react-native';
import { router } from 'expo-router';
import { currentUser } from '@/mocks/data';
import Colors from '@/constants/colors';
import { useState } from 'react';

export default function CreatePostScreen() {
  const [postText, setPostText] = useState('');
  const [hasImage, setHasImage] = useState(true);

  const handlePost = () => {
    console.log('Post:', postText);
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: currentUser.photo }}
            style={styles.userPhoto}
          />
          <Text style={styles.userName}>{currentUser.name}</Text>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="What's on your mind?"
          placeholderTextColor={Colors.textMuted}
          multiline
          value={postText}
          onChangeText={setPostText}
        />

        {hasImage && (
          <View style={styles.imagePreview}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800' }}
              style={styles.previewImage}
            />
            <View style={styles.imageActions}>
              <TouchableOpacity style={styles.imageActionButton}>
                <Edit size={20} color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.imageActionButton}
                onPress={() => setHasImage(false)}
              >
                <X size={20} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.mediaOptions}>
          <TouchableOpacity style={styles.mediaButton}>
            <ImageIcon size={20} color={Colors.textDark} />
            <Text style={styles.mediaButtonText}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaButton}>
            <Video size={20} color={Colors.textDark} />
            <Text style={styles.mediaButtonText}>Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaButton}>
            <BarChart3 size={20} color={Colors.textDark} />
            <Text style={styles.mediaButtonText}>Polls</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.scheduleButton}>
            <Clock size={20} color={Colors.textDark} />
            <Text style={styles.scheduleButtonText}>Schedule Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.postButtonText}>Post</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textDark,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  userPhoto: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
  },
  textInput: {
    fontSize: 15,
    color: Colors.textDark,
    lineHeight: 22,
    minHeight: 120,
    textAlignVertical: 'top',
    paddingVertical: 8,
  },
  imagePreview: {
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: 240,
    backgroundColor: Colors.background,
  },
  imageActions: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
  },
  imageActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  mediaOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mediaButtonText: {
    fontSize: 14,
    color: Colors.textDark,
    fontWeight: '500',
  },
  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scheduleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scheduleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textDark,
  },
  postButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },
  postButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
