import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Client } = pkg;

const db = new Client({
    host: 'localhost',
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect().catch(err => console.error('Error connecting to database', err));

export default db;