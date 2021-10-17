import request from '../Utils/Request';

class CursosService {

    cursos() {
        return request({
            url: '/cursos/',
            method: 'get'
        });
    }

    crearCurso(data) {
        return request({
            url: '/crear/curso/',
            method: 'post',
            data: data
        });
    }

}

export default new CursosService();