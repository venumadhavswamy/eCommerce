const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');

//Route imports
const productRoute = require('./routes/producRoute');
const userRoute = require('./routes/userRoute');


const app = express();

//Config
dotenv.config({path:'config/config.env'});

//Connect database
connectDB(); 

//Close the server if there are uncaught exceptions
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);
})

//Parse data into json format
app.use(bodyParser.json());

app.use(cookieParser());

//Using routes
app.use('/product',productRoute);
app.use('/user',userRoute);

//Middleware for errors
app.use(errorMiddleware);

app.get('/',(req,res)=>{
    res.status(200).send("Welcome");
    //res.attachment('sample.pdf');
});

const port = process.env.PORT || 8000;
const server = app.listen(port,()=>console.log(`Server running on port ${port}`));

//Close the server if there are unhandled promise rejections
process.on('unhandledRejection',(err)=>{
    console.log("Error:",err.message);
    console.log("Shutting down the server due to unhandled promise rejections");
    server.close(()=>{
        process.exit(1);
    })
});