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
    throw error; // Re-throw the error for upstream handling
  }
};

export const GetFavoriteScripture = async () => {
  try {
    const response = await AxiosInstance.get(`favorite-scriptures`);
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error for upstream handling
  }
};

export const GetPodcast = async ({keyword}: {keyword?: string}) => {
  try {
    let response = await AxiosInstance.get(`podcasts?text=${keyword}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetVerseComments = async ({verseId}: {verseId: string}) => {
  try {
    const response = await AxiosInstance.get(`scriptures/${verseId}/comments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
