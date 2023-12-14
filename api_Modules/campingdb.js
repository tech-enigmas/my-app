// apiService.js
import axios from 'axios';

export const getCampgrounds = async (query) => {
  const campingUrl = `https://nomad-backend-ga8z.onrender.com/camping?query=${query}`;


  try {
    const response = await axios.get(
      campingUrl
    );
    console.log(response.data);
    return response.data;
    

  } catch (error) {
    console.error('Error fetching campgrounds:', error);
    throw error;
  }

};
