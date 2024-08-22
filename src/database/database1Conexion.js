const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'dangerous',
    database: 'tuberias1',
    port: '5432'
});

module.exports = pool;