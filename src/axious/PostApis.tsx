import AxiosInstance from './AxiousInstance';

export const LoginApi = async (data: any) => {
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
  try {
    const formData = new FormData();

    formData.append('name', data?.name);
    formData.append('_method', 'patch');

    if (
      data.profile &&
      data.profile.uri &&
      data.profile.type &&
      data.profile.name
    ) {
      formData.append('profile', {
        uri: data.profile.uri,
        type: data.profile.type,
        name: data.profile.name,
      });
    } else {
      formData.append('profile', null); // Optional field
    }

    const response = await AxiosInstance.post('update-profile', formData);

    return response;
  } catch (error: any) {
    throw error;
  }
};
