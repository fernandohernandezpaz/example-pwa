import axios from 'axios';
import LoginService from '../Services/LoginService';
// create an axios instance
const service = axios.create({
    baseURL: process.env.REACT_APP_API_DOMAIN, // url = base url + request url
});

// request interceptor
service.interceptors.request.use(
    config => {

        if (LoginService.isAuthenticated()) {
            config.headers['Authorization'] = 'Token ' + LoginService.getToken();
        }
        return config;
    },
    error => {

        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    (response) => {

        return response;
    },
    error => {
        // console.log('err' + error); // for debug

        return Promise.reject(error);
    }
);

export default service;