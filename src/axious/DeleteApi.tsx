import AxiosInstance from './AxiousInstance';

export const DeleteAccount = async () => {
  try {
    const response = await AxiosInstance.delete('delete-account');
    return response;
  } catch (error) {
    throw error;
  }
};
