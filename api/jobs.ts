import axios from 'axios';

export interface Job {
  id: number;
  title: string;
  primary_details?: {
    Place?: string;
    Salary?: string;
    Experience?: string;
    Qualification?: string;
  };
  whatsapp_no?: string;
  company_name?: string;
}

const BASE_URL = 'https://testapi.getlokalapp.com/common/jobs';

export const fetchJobs = async (page: number): Promise<Job[]> => {
  try {
    const response = await axios.get(`${BASE_URL}?page=${page}`);
    const results = response.data.results || [];
    return results.filter(
      (item: unknown): item is Job =>
        item != null &&
        typeof item === 'object' &&
        'id' in item &&
        typeof item.id === 'number' &&
        !isNaN(item.id) &&
        'title' in item &&
        typeof item.title === 'string'
    );
  } catch (error) {
    throw new Error('Failed to fetch jobs');
  }
};