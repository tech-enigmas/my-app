// apiService.js
import axios from 'axios';

export const getCampgrounds = async (query) => {
  const campingUrl = `http://localhost:3001/camping?query=${query}`;
  // const campingUrl = 'http://localhost:3001/camping?query=seattle';


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
