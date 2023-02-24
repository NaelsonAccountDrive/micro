const mysql = require('mysql');

exports.conn = mysql.createConnection({
    host: "",
    user: "",
    database: "",
    password: "",
});