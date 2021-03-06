import request from '../Utils/Request';
import db from "../Utils/DB";

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

    async recolectarDatosCursos(data) {
        if (navigator.onLine) {
            db.cursos.where('syncro').equals('true').delete();
        }

        for (const curso of data) {
            const existeCursoDBLocal = await db.cursos.where({
                id_db: curso.id
            }).first();

            const registro = {
                id_db: curso.id,
                nombre: curso.nombre,
                slug: curso.slug,
                curso_temas: curso.curso_temas,
                descripcion: curso.descripcion,
                foto: curso.foto,
                syncro: 'true'
            };

            if (!existeCursoDBLocal) {
                db.cursos.add(registro);
            } else {
                registro['id'] = existeCursoDBLocal.id;
                db.cursos.put(registro);
            }
        }
    }
}

export default new CursosService();