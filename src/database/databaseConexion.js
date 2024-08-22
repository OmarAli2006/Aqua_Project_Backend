const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'dangerous',
    database: 'aqua',
    port: '5432'
});

module.exports = pool;