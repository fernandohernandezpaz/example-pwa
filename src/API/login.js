import request from '../Utils/request';

export function login(data) {
    return request({
        url: 'api-token-auth/',
        method: 'post',
        data: data
    });
}