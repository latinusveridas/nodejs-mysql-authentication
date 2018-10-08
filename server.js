var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;
var database = require('../Database/database');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

var Users = require('./Routes/Users');

app.use('/users',Users);

app.get('/testdb', function (req, res) {

    database.connection.getConnection(function (err, connection) {
        if (err) {
            console.log("DATABASE PROBLEM");
        } else {
            console.log("Connection Successful !!!")

            connection.release();
        }
    });
});


app.listen(port,function(){
    console.log("Server is running on port: "+port);
});
