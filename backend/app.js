const express = require('express');
const dotenv = require('dotenv');
//Route imports
const product = require('./routes/producRoute');

const app = express();

//Config
dotenv.config({path:'config/config.env'});

app.use('/',product)

app.get('/',(req,res)=>{
    res.status(200).send("Welcome");
    //res.attachment('sample.pdf');
});

const port = process.env.PORT || 8000;
app.listen(port,()=>console.log(`Server running on port ${port}`));