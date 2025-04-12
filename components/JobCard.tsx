import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { addBookmark, removeBookmark, getBookmarks } from '../storage/bookmarks';
import { Job } from '../api/jobs';

const JobCard = ({ job }: { job: Job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkBookmark();
  }, []);

  const checkBookmark = async () => {
    try {
      const bookmarks = await getBookmarks();
      setIsBookmarked(bookmarks.some((b: Job) => b.id === job.id));
    } catch (error) {
      console.error('Error checking bookmark:', error);
    }
  };

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        console.log('Removing bookmark:', job.id);
        await removeBookmark(job.id);
      } else {
        console.log('Adding bookmark:', job.id);
        await addBookmark(job);
      }
      setIsBookmarked(!isBookmarked);
      const updatedBookmarks = await getBookmarks();
      console.log('Updated bookmarks:', updatedBookmarks);
    } catch (error) {
      console.error('Bookmark error:', error);
    }
  };

  if (job.id == null || isNaN(job.id)) {
    console.warn('Invalid job ID:', job);
    return null;
  }

  return (
    <View style={styles.cardContainer}>
      <Link
        href={{ pathname: '/job/[id]', params: { id: job.id.toString(), job: JSON.stringify(job) } }}
        asChild
      >
        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.detail}>📍 {job.primary_details?.Place || 'N/A'}</Text>
          <Text style={styles.detail}>💼 {job.primary_details?.Salary || 'N/A'}</Text>
          <Text style={styles.detail}>📞 {job.whatsapp_no || 'N/A'}</Text>
        </TouchableOpacity>
      </Link>
      <View style={styles.bookmarkButton}>
        <Button
          icon={
            <FontAwesome
              name={isBookmarked ? 'bookmark' : 'bookmark-o'}
              size={28}
              color={isBookmarked ? '#FFFFFF' : '#007AFF'}
            />
          }
          buttonStyle={isBookmarked ? styles.bookmarkActive : styles.bookmarkInactive}
          onPress={toggleBookmark}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 16,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    transform: [{ scale: 1 }],
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    color: '#666666',
    marginVertical: 4,
  },
  bookmarkButton: {
    marginLeft: 12,
  },
  bookmarkActive: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 8,
  },
  bookmarkInactive: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 8,
  },
});

export default JobCard;