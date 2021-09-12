
///code to connect to the database
const mysql = require('mysql2')

//conde that will connect the application to the MySQL database
//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //your username
        user: 'root',
        //your passowrd
        password:'LamaineroCoronado1!',
        database:'election'
    },
    console.log('Connected to the election database')
);


module.exports = db;