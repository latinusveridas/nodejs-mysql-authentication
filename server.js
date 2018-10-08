var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();
var mysql = require("mysql");
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));


///////
var Users = require('./Routes/Users');

app.use('/users', Users);

var connection = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
    debug: false,
    multipleStatements: true
});

console.log("PRE DEBUG DES ENVIRONMENTS")
console.log(MYSQL_USER);
console.log(MYSQL_PASSWORD);
console.log(MYSQL_DATABASE);
console.log("END // PRE DEBUG DES ENVIRONMENTS")

connection.getConnection(function (err, connection) {
    if (err) {
        //connection.release();
        console.log("PB CONNECTING DB");
        console.log(err);
        return;
    } else {
        console.log("DEBUG: SEEMS TO WORK");
    }

});

app.listen(port,function(){
    console.log("Server is running on port: "+port);
});