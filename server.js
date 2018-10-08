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
    host: process.env.MYSQL_SERVICE_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
    debug: false,
    multipleStatements: true
});

console.log("PRE DEBUG DES ENVIRONMENTS");
console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_PASSWORD);
console.log(process.env.MYSQL_DATABASE);
console.log(process.env.MYSQL_SERVICE_HOST);
console.log("END // PRE DEBUG DES ENVIRONMENTS");


connection.getConnection(function (err, conn) {
    if (err) {
        //connection.release();
        console.log("PB CONNECTING DB");
        console.log(err);
        return;
    } else {
        console.log("DEBUG: SEEMS TO WORK");
    }

});



app.get('/showdatabases', function (req, res) {

    console.log("INSIDE DATABASES FUNCTION")

    connection.getConnection(function (err, conn) {

        if (err) throw err;
        console.log(err);

        conn.query('SHOW DATABASES', function (err, results) {
            if (err) throw err;
            console.log(results);
            console.log('END OF QUERY');
        });

    });

});

app.listen(port,function(){
    console.log("Server is running on port: " + port);
});
