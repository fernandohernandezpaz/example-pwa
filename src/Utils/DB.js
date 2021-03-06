import Dexie from 'dexie';


const VERSION = Number(process.env.REACT_APP_DB_NAME_VERSION ?? 1);
const db = new Dexie(process.env.REACT_APP_DB_NAME);

db.version(1).stores({
    user: "++id, username, token, email",
    cursos: "++id, id_db, nombre, slug, descripcion, foto, curso_temas, syncro",
    fincas: '++id, id_db, hectareas, user_id, activo, foto, syncro',
    media: '++id, id, binary_file',
    documentacionLeida: '++id, curso_id, tema_id, timestamp, posicion'
});

export default db;
