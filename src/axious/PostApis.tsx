import AxiosInstance from "./AxiousInstance"


export const LoginApi = async(data:any) =>{
    try {
        const response = await AxiosInstance.post('login',data);
        console.log(response);
    } catch (error) {
       throw error;
    }
};