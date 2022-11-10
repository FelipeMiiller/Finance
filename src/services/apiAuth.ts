import axios from 'axios';








const baseURL = 'https://wms-auth-prd.azurewebsites.net/api/v1/';


const initialState = {
    user: { name: '', email: '' },
    list: []
}


const apiWmsAuth = axios.create({
    baseURL,
    
});

export default apiWmsAuth;

