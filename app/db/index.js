let pgp    = require('pg-promise')();
let config = require('../config');
let connection = {
  host:     config.db_host,
  port:     config.db_port,
  database: config.db_name,
  user:     config.db_user,
  password: config.db_pass
};
let db = pgp(connection);
module.exports = db;
