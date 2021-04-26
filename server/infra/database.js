// Database connnection

const pgp = require('pg-promise')();
const bd = pgp({
   user: 'gustavoriedo',
   password: '137103',
   host: 'localhost',
   port: 5432,
   database: 'module2database',
});

// Exports
module.exports = bd;
