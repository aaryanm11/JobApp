import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Redirect } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Job } from '../../api/jobs';

export default function JobDetails() {
  const { id, job } = useLocalSearchParams();

  console.log('StyleSheet:', StyleSheet);

  if (!id || !job || typeof id !== 'string' || typeof job !== 'string') {
    console.warn('Invalid job params:', { id, job });
    return <Redirect href="/" />;
  }

  let jobData: Job;
  try {
    jobData = JSON.parse(job);
    if (!jobData.id || isNaN(jobData.id) || !jobData.title) {
      throw new Error('Invalid job data');
    }
  } catch (error) {
    console.warn('Error parsing job data:', error);
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{jobData.title}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="map-marker" size={20} color="#007AFF" />
          <Text style={styles.detailText}>Location: {jobData.primary_details?.Place || 'N/A'}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="money" size={20} color="#007AFF" />
          <Text style={styles.detailText}>Salary: {jobData.primary_details?.Salary || 'N/A'}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="phone" size={20} color="#007AFF" />
          <Text style={styles.detailText}>Phone: {jobData.whatsapp_no || 'N/A'}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="building" size={20} color="#007AFF" />
          <Text style={styles.detailText}>Company: {jobData.company_name || 'N/A'}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="briefcase" size={20} color="#007AFF" />
          <Text style={styles.detailText}>
            Experience: {jobData.primary_details?.Experience || 'N/A'}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="graduation-cap" size={20} color="#007AFF" />
          <Text style={styles.detailText}>
            Qualification: {jobData.primary_details?.Qualification || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 16,
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    padding: 20,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
});