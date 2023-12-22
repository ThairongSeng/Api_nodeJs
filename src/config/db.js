const mysql = require("mysql");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"school_db"
})

module.exports = db