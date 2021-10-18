import Dexie from 'dexie';


const VERSION = Number(process.env.REACT_APP_DB_NAME_VERSION ?? 1);
const db = new Dexie(process.env.REACT_APP_DB_NAME);

db.version(VERSION).stores({
    user: "++id, username, token, email",
    cursos: "++id, id_db, nombre, slug, descripcion, foto, curso_temas, syncro",
    fincas: '++id, id_db, hectareas, user_id, activo, foto, syncro',
    media: '++id, id, binary_file'
});

export default db;
