//import express
const express = require('express');
//connect to the MYSQL DATABASE
const mysql = require('mysql2');

//in order to crate the NEW CANDIDATE, with the input we require to import the module first
const inputCheck = require ('./utils/inputCheck');




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


// --------------------------------------------------------------------------------------//
// confirm connection with express.js / ONE OF THE FIRST STEPS WHEN USING EXPRESS
// app.get('/', (req, res) => {
//     res.json({
//       message: 'Hello World'
//     });
// });
// --------------------------------------------------------------------------------------//


// Get all candidates. End point "/api/cnadidates"

app.get('/api/candidates',(req,res)=>{
    const sql = `SELECT * FROM candidates`;

    db.query(sql,(err,rows) =>{
        if(err){
            res.status(500).json({error:err.message});
            return;
        }
        //instead of logging teh result ,rows, from the database, we will send this response as a JSON object to the browser using the res in teh Express.js route callback
        res.json({
            message:'success',
            data:rows
        });
    });
});




// --------------------------------------------------------------------------------------//
// //single candidate
// db.query('SELECT * FROM candidates WHERE id= 1',(err,row) => {
//     if (err){
//         console.log(err)
//     }
//     console.log(row)
// })
// --------------------------------------------------------------------------------------//

//get a single candidate
app.get('/api/candidate/:id',(req, res) =>{
    const sql = `SELECT * FROM  candidates WHERE id =?`;
    const params = [req.params.id];
    
    db.query(sql,params,(err,row) =>{
        if(err){
            res.status(400).json({error: err.message});
        }
        res.json({
            message:'success',
            data: row
        });
    });
});




// --------------------------------------------------------------------------------------//
//delete candidate
// db.query('DELETE FROM candidates WHERE id=?',1,(err,result)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log(result);
// })
// --------------------------------------------------------------------------------------//

//Delete candidate, we need to use the http requeste method delete()

app.delete('/api/candidate/:id', (req,res) =>{
    const sql = 'DELETE FROM candidates WHERE id=?';
    const params = [req.params.id];

    db.query(sql, params, (err,result)=>{
        if(err){
            res.statusMessage(400).json({error:res.message});
        }else if (!result.affectedRows){
            res.json({
                message: 'Candidate not found'
            });
        }else{
            res.json({
                message:'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});




// --------------------------------------------------------------------------------------//
//Create a candidate
// const sql = `INSERT INTO candidates(id, first_name, last_name, industry_connected)
//              VALUES (?,?,?,?)`;
// const params = [1, 'Ronald','Firbank',1];
// db.query(sql,params,(err,result)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log(result);
// });
// --------------------------------------------------------------------------------------//

// CREATE CANDIDATE - we need to import the module first. 
app.post('/api/candidate',({body},res)=>{
    const errors = inputCheck(
        body,
        'first_name',
        'last_name',
        'industry_connected'
    );
    if (errors){
        res.status(400).json({error:errors});
        return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
     VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result)=>{
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message:'success',
            data: body
        });
    });
})




//default response for any othe rrequest (not found)
app.use((req,res) =>{
    res.status(404).end();
});

// function that will start the Express.js server on port 3001.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

