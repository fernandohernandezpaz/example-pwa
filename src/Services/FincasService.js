import request from '../Utils/Request';
import Dexie from 'dexie';

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
        let db = new Dexie(process.env.REACT_APP_DB_NAME);
        db.version(1).stores({
            fincas: '++id, id_db, hectareas, user_id, activo, foto, syncro'
        });
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