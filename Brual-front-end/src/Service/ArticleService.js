import axios from 'axios';

const PORT = process.env.PORT || 5000;
 // 👈 Update if needed

export const fetchArticles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};
