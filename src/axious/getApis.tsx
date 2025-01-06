import AxiosInstance from './AxiousInstance';

export const GetScriptureOfTheDay = async () => {
  try {
    const response = AxiosInstance.get('scripture-of-the-day');
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetHistory = async (keyword?: string) => {
  try {
    const response = AxiosInstance.get(`scriptures-history?text=${keyword}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetScriptureDetails = async ({id}: {id: string}) => {
  try {
    const response = await AxiosInstance.get(`scriptures/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching scripture details:', error);
    throw error; // Re-throw the error for upstream handling
  }
};

export const GetFavoriteScripture = async () => {
  try {
    const response = await AxiosInstance.get(`favorite-scriptures`);
    return response.data;
  } catch (error) {
    console.error('Error fetching scripture details:', error);
    throw error; // Re-throw the error for upstream handling
  }
};
