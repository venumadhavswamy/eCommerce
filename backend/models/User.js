const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

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
        enum: ["user","supplier"],
        default: "user"
    },
    updatedOn:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

UserSchema.pre("save",async function(next){
    //Run this function only when password was modified, not on other update functions
    if(this.isModified('password')){
        const hashedPassword = await bcrypt.hash(this.password,10);
        this.set({password: hashedPassword});
    }
    next();
});


UserSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

UserSchema.methods.isValidPassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("user",UserSchema);