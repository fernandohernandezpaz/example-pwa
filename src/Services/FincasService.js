import request from '../Utils/Request';
import db from "../Utils/DB";

class FincasService {

    fincas() {
        return request({
            url: '/fincas/',
            method: 'get'
        });
    }

    crearFinca(data) {
        return request({
            url: '/crear/finca/',
            method: 'post',
            data: data
        });
    }

    async recolectarFincas(data) {
        for (const finca of data) {
            const existeFincaDBLocal = await db.fincas.where({
                id_db: finca.id
            }).first();

            const registro = {
                id_db: finca.id,
                hectareas: finca.hectareas,
                foto: finca.foto,
                syncro: true
            };

            if (!existeFincaDBLocal) {
                db.fincas.add(registro);
            } else {
                registro['id'] = existeFincaDBLocal.id;
                db.fincas.put(registro);
            }
        }
    }
}

export default new FincasService();