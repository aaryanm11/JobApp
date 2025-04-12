import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import JobCard from '../components/JobCard';
import { getBookmarks } from '../storage/bookmarks';
import { Job } from '../api/jobs';
import { FontAwesome } from '@expo/vector-icons';

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState<Job[]>([]);

  const loadBookmarks = useCallback(async () => {
    try {
      const data = await getBookmarks();
      setBookmarks(data);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [loadBookmarks])
  );

  if (bookmarks.length === 0)
    return (
      <View style={styles.emptyContainer}>
        <FontAwesome name="bookmark-o" size={40} color="#666666" />
        <Text style={styles.emptyText}>No bookmarks found</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        keyExtractor={(item: Job, index: number) =>
          item.id != null ? item.id.toString() : `bookmark-${index}`
        }
        renderItem={({ item }: { item: Job }) => <JobCard job={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  emptyText: {
    fontSize: 18,
    color: '#666666',
    marginTop: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});