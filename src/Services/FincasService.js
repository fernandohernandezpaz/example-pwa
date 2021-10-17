import request from '../Utils/Request';

class FincasService {

    fincas() {
        return request({
            url: '/fincas/',
            method: 'get'
        });
    }

    creafFinca(data) {
        return request({
            url: '/crear/finca/',
            method: 'post',
            data: data
        });
    }

}

export default new FincasService();