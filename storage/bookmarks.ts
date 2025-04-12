import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from '../api/jobs';

const BOOKMARKS_KEY = '@bookmarks';

export const addBookmark = async (job: Job) => {
  if (!job.id || isNaN(job.id) || !job.title) {
    console.warn('Invalid job for bookmark:', job);
    return;
  }
  try {
    const existingBookmarks = await getBookmarks();
    if (existingBookmarks.some((b: Job) => b.id === job.id)) {
      console.log('Bookmark already exists:', job.id);
      return;
    }
    const updatedBookmarks = [...existingBookmarks, job];
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    console.log('Bookmark added:', job.id);
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw error;
  }
};

export const removeBookmark = async (id: number) => {
  if (isNaN(id)) {
    console.warn('Invalid bookmark ID:', id);
    return;
  }
  try {
    const existingBookmarks = await getBookmarks();
    const updatedBookmarks = existingBookmarks.filter((b: Job) => b.id !== id);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    console.log('Bookmark removed:', id);
  } catch (error) {
    console.error('Error removing bookmark:', error);
    throw error;
  }
};

export const getBookmarks = async (): Promise<Job[]> => {
  try {
    const bookmarksJson = await AsyncStorage.getItem(BOOKMARKS_KEY);
    const bookmarks = bookmarksJson ? JSON.parse(bookmarksJson) : [];
    const filtered = bookmarks.filter(
      (item: unknown): item is Job =>
        item != null &&
        typeof item === 'object' &&
        'id' in item &&
        typeof item.id === 'number' &&
        !isNaN(item.id) &&
        'title' in item &&
        typeof item.title === 'string'
    );
    console.log('Retrieved bookmarks:', filtered);
    return filtered;
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
};

export const clearBookmarks = async () => {
  try {
    await AsyncStorage.removeItem(BOOKMARKS_KEY);
    console.log('Bookmarks cleared');
  } catch (error) {
    console.error('Error clearing bookmarks:', error);
  }
};