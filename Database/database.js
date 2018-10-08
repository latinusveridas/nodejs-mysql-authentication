var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 100,
    host:'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
    debug: false,
    multipleStatements: true
});

module.exports.connection = connection;