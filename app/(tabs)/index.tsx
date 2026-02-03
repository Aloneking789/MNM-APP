import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Search, MoreVertical, ThumbsUp, MessageCircle, Share2 } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { mockPosts, currentUser } from '@/mocks/data';
import Colors from '@/constants/colors';
import { Post } from '@/types';

export default function HomeScreen() {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.userName}>{currentUser.name}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.searchButton}>
              <Search size={24} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/profile')}>
              <Image 
                source={{ uri: currentUser.photo }} 
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.postInputContainer}>
          <Image 
            source={{ uri: currentUser.photo }} 
            style={styles.postInputImage}
          />
          <View style={styles.postInput}>
            <Text style={styles.postInputText}>Share your thoughts...</Text>
          </View>
          <View style={styles.postInputDot} />
        </View>

        {posts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLike={handleLike}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function PostCard({ post, onLike }: { post: Post; onLike: (id: string) => void }) {
  const roleColor = post.user.role === 'Investor' ? Colors.investor : Colors.entrepreneur;

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image 
          source={{ uri: post.user.photo }} 
          style={styles.postUserImage}
        />
        <View style={styles.postUserInfo}>
          <View style={styles.postUserNameRow}>
            <Text style={styles.postUserName}>{post.user.name}</Text>
            <View style={[styles.roleBadge, { backgroundColor: roleColor }]}>
              <Text style={styles.roleBadgeText}>{post.user.role}</Text>
            </View>
          </View>
          <Text style={styles.postTimestamp}>{post.timestamp}</Text>
        </View>
        <TouchableOpacity>
          <MoreVertical size={20} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      {post.hashtags.length > 0 && (
        <View style={styles.hashtagContainer}>
          {post.hashtags.map((tag, index) => (
            <Text key={index} style={styles.hashtag}>{tag}</Text>
          ))}
        </View>
      )}

      <View style={styles.postStats}>
        <View style={styles.likesContainer}>
          <ThumbsUp size={16} color={Colors.primary} fill={Colors.primary} />
          <Text style={styles.likesText}>{post.likes}</Text>
        </View>
        <Text style={styles.commentsText}>{post.comments} comments</Text>
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onLike(post.id)}
        >
          <ThumbsUp 
            size={20} 
            color={post.liked ? Colors.primary : Colors.textMuted}
            fill={post.liked ? Colors.primary : 'transparent'}
          />
          <Text style={[styles.actionText, post.liked && styles.actionTextActive]}>Like</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color={Colors.textMuted} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={20} color={Colors.textMuted} />
          <Text style={styles.actionText}>Share</Text>
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
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: Colors.white,
    fontSize: 16,
    opacity: 0.9,
  },
  userName: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  content: {
    flex: 1,
  },
  postInputContainer: {
    backgroundColor: Colors.white,
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  postInputImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postInput: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
  },
  postInputText: {
    color: Colors.textMuted,
    fontSize: 15,
  },
  postInputDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textDark,
  },
  postCard: {
    backgroundColor: Colors.white,
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postUserImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  postUserInfo: {
    flex: 1,
    marginLeft: 12,
  },
  postUserNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  roleBadgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '600',
  },
  postTimestamp: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textDark,
    marginBottom: 12,
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  hashtag: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginBottom: 12,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  likesText: {
    fontSize: 14,
    color: Colors.textDark,
    fontWeight: '500',
  },
  commentsText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionText: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  actionTextActive: {
    color: Colors.primary,
  },
});
