import AxiosInstance from './AxiousInstance';

export const GetScriptureOfTheDay = async () => {
  try {
    const response = AxiosInstance.get('scripture-of-the-day');
    console.log(response,"api r3esponse")
    return response;
  } catch (error) {
    throw error;
  }
};
