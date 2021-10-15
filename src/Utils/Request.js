import axios from 'axios';
// create an axios instance
const service = axios.create({
    baseURL: process.env.REACT_APP_API_DOMAIN, // url = base url + request url
});

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

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