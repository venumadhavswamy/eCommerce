const mongoose = require('mongoose');

const connectDB = function (){
    mongoose.connect(process.env.DB_URI)
        .then(()=>{
            console.log("mongodb connection established");
        })
        .catch((err)=>{
            console.error("Error:::",err.message);
        });
}

module.exports = connectDB