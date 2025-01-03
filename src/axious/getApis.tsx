import AxiosInstance from './AxiousInstance';

export const GetScriptureOfTheDay = async () => {
  try {
    const response = AxiosInstance.get('scripture-of-the-day');
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetHistory = async () => {
  try {
    const response = AxiosInstance.get('scriptures-history');
    return response;
  } catch (error) {
    throw error;
  }
};
