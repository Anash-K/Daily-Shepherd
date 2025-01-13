import AxiosInstance from './AxiousInstance';

export const DeleteAccount = async () => {
  try {
    const response = await AxiosInstance.delete('delete-account');
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteComment = async({commentId} :{commentId : string }) =>{
  try {
    const response =  await AxiosInstance.delete(`comments/${commentId}`);
    return response;
  } catch (error) {
    throw error;
  }
} 
