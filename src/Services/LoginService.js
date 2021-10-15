import request from '../Utils/Request';

class LoginService {

    login(data) {
        return request({
            url: 'api-token-auth/',
            method: 'post',
            data: data
        });
    }


    setSession(data) {
        localStorage.setItem('sessionUser', JSON.stringify(data));
    }

    getSession() {
        if (localStorage.getItem('sessionUser')) {
            return JSON.parse(localStorage.getItem('sessionUser'))
        }
        return null;
    }

    getToken() {
        const data = this.getSession();

        if (data) {
            return data['token']
        }
        return null
    }

}

export default new LoginService();