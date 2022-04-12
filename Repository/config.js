const mysql = require('mysql');

const con = mysql.createConnection({
    host:"localhost",
    database:"users",
    user:"root",
    password:"Amer123@@"
});
con.connect(err=>{
    if(err) throw err;
    console.log("connected");

});

module.exports = con;