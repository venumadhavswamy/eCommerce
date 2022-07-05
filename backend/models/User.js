const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please enter your name"],
        maxLength:[30,"Name should not exceed 30 characters"],
        minLength:[2,"Name should be atleast of 2 characters length"]
    },
    email:{
        type:String,
        required: [true,"Please enter your email"],
        unique: true,
        validate:[validator.isEmail,"Enter valid email"]
    },
    password:{
        type: String,
        required: [true,"Please enter password"],
        minLength:[2,"Password should be atleast of 2 characters length"],
        select: false
    },
    profilePic:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            url: true
        }
    },
    role:{
        type: String,
        default: "user"
    },
    createdOn:{
        type: Date,
        default: Date.now,
        set: (createdOn)=>{
            console.log("in set");
            if(!this.updatedOn){
                console.log("in created on");
                return Date.now
            }
            return createdOn;
        }
    },
    updatedOn:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

module.exports = mongoose.model("user",UserSchema);