import Dexie from 'dexie';

// Database handles all database interactions for the web app.
class DB extends Dexie {
    // our Database constructor sets up an IndexedDB database with a
    // sticky notes object store, titled "notes".
    constructor() {
        super(process.env.REACT_APP_DB_NAME)
    }

    createTable(tableName, fields) {
        let table = {};
        table[tableName] = fields;
        this.version(1).stores(table);
    }

    getTable(tableName) {
        return this[tableName];
    }

}

export default new DB();