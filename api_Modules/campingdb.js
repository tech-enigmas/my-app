// apiService.js
import axios from 'axios';

export const getCampgrounds = async (query) => {
const campingUrl = 'http://localhost:3001/camping?query=moab';

  try {
    const response = await axios.get(
      campingUrl
    );
    return response.data;

  } catch (error) {
    console.error('Error fetching campgrounds:', error);
    throw error;
  }
};
