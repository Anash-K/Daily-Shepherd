import AxiosInstance from './AxiousInstance';

export const LoginApi = async (data: any) => {
  console.log(data, 'data');
  try {
    const response = await AxiosInstance.post('login', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const LogoutApi = async () => {
  try {
    const response = await AxiosInstance.post('logout');
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateProfile = async (data: any) => {
  console.log(data, 'request data');
  try {
    // Create FormData
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('profile', {
      uri: data.profile.uri, // Local file path or URI
      type: data.profile.type, // MIME type (e.g., 'image/jpeg')
      name: data.profile.name, // File name
    } as unknown as Blob); // Cast to Blob for compatibility in some environments

    console.log(formData, 'request formData');

    // Send PATCH request with FormData
    const response = await AxiosInstance.patch('update-profile', data);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
