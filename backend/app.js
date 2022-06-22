const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
//Route imports
const product = require('./routes/producRoute');

const app = express();

//Config
dotenv.config({path:'config/config.env'});

//Connect database
connectDB(); 

//Parse data into json format
app.use(bodyParser.json());

//Products route
app.use('/',product);

app.get('/',(req,res)=>{
    res.status(200).send("Welcome");
    //res.attachment('sample.pdf');
});

const port = process.env.PORT || 8000;
app.listen(port,()=>console.log(`Server running on port ${port}`));