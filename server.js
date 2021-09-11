//import express
const express = require('express');
//connect to the MYSQL DATABASE
const mysql = require('mysql2');

//add port designation and the app expression
const PORT = process.env.PORT || 3001;
const app = express();


//express middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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





// confirm connection with express.js / ONE OF THE FIRST STEPS WHEN USING EXPRESS
// app.get('/', (req, res) => {
//     res.json({
//       message: 'Hello World'
//     });
// });


// Let's query the database to test the connection. I
db.query('SELECT * FROM candidates',(err, rows)=>{
    console.log(rows);
})


//default response for any othe rrequest (not found)
app.use((req,res) =>{
    res.status(404).end();
});

// function that will start the Express.js server on port 3001.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

