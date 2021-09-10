//import express
const express = require('express');

//add port designation and the app expression
const PORT = process.env.PORT || 3001;
const app = express();


//express middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());






// confirm connection with express.js / ONE OF THE FIRST STEPS WHEN USING EXPRESS
// app.get('/', (req, res) => {
//     res.json({
//       message: 'Hello World'
//     });
// });




//default response for any othe rrequest (not found)
app.use((req,res) =>{
    res.status(404).end();
});

// function that will start the Express.js server on port 3001.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

