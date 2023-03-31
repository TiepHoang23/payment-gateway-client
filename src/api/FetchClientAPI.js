import axios from 'axios';

const fetchData = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data.isSuccess) {
      throw new Error(response.data.message);
    }
    return response.data.myCard;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching data');
  }
};

export { fetchData };
