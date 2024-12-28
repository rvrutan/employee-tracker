import pkg from 'pg';
const { Client } = pkg;

const db = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '16492211778',
    database: 'employees_db'
});

db.connect().catch(err => console.error('Error connecting to database', err));

export default db;