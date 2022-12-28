const Pool = require('pg').Pool;
const connectionString = require('../settings');

const pool = new pool({
    connectionString
});

module.exports = pool;