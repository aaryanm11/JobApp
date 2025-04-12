import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import JobCard from '../components/JobCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchJobs, Job } from '../api/jobs';
import { FontAwesome } from '@expo/vector-icons';

export default function JobsScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<Job[], Error>({
    queryKey: ['jobs'] as const,
    queryFn: ({ pageParam }) => fetchJobs(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: Job[], allPages: Job[][]) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  const jobs = (data?.pages.flat() || []).filter(
    (item): item is Job => item != null && typeof item.id === 'number' && !isNaN(item.id)
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <View style={styles.emptyContainer}>
        <FontAwesome name="exclamation-circle" size={40} color="#FF3B30" />
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  if (jobs.length === 0)
    return (
      <View style={styles.emptyContainer}>
        <FontAwesome name="search" size={40} color="#666666" />
        <Text style={styles.emptyText}>No jobs found</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item: Job, index: number) =>
          item.id != null ? item.id.toString() : `fallback-${index}`
        }
        renderItem={({ item }: { item: Job }) => <JobCard job={item} />}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <LoadingSpinner /> : null}
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
  errorText: {
    fontSize: 18,
    color: '#FF3B30',
    marginTop: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666666',
    marginTop: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});