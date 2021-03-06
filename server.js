var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var port = process.env.PORT || 3000;

//ADDED ON 09/10
var http = require('http');


app.use(bodyParser.json());
//app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));


/*
var Users = require('./Routes/Users');
app.use('/users', Users);
*/

var pool = mysql.createPool({
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


/*connection.getConnection(function (err, conn) {
    if (err) {
        //connection.release();
        console.log("PB CONNECTING DB");
        console.log(err);
        return;
    } else {
        console.log("DEBUG: SEEMS TO WORK");
    }

});*/


app.get('/', function (req, res) {
    res.send("Hello World !");
})


app.get('/showdatabases', function (req, res) {
console.log("INSIDE DATABASES FUNCTION");
    pool.getConnection(function (err, conn)
    {
        if (err)
        {
            throw err;
        }
        else
        {
            conn.query('SHOW DATABASES', function (err2, results)
            {
                if (err2) {
                    throw err2;
                } else {
                    console.log(results);
                    console.log('END OF QUERY');
                    res.json(results);
                }
                conn.release();
            })
        }
    })
})

app.get('/about', function (req, res) {
    res.render('about');
});

app.listen(port,function(){
    console.log("Server is running on port: " + port);
});
