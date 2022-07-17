const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const jwtTokenHandler = require('../utils/jwtTokenHandler');

exports.getUserDetails = async (req,res,next)=>{
    try{
        const email = req.params.email;
        const user = await User.findOne(email);
        res.status(200).json({...user,success: true})
    }
    catch(err){
        next(new ErrorHandler(err.message,400));
    }
}

exports.registerUser = async (req,res,next)=>{
    const {name, password, email} = req.body;
    try{
        const user = await User.create({
            name: name,
            email: email,
            password: password,
            profilePic:{
                public_id:"sample id",
                url:"sample url"
            }
        });

        jwtTokenHandler.sendResponseWithToken(user,201,res);
    }
    catch(err){
        console.log(err.stack);
        next(new ErrorHandler(err.message,400));
    }
}

exports.loginUser = async(req,res,next)=>{
    const {email, password} = req.body;
    if(!email && !password){
        return next(new ErrorHandler("Please enter email and password",400));
    }
    try{
        const user = await User.findOne({email:email}).select("+password");
        if(!user){
            return next(new ErrorHandler("Invalid email or password",401));
        }
        const isPasswordMatched = await user.isValidPassword(password);
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid email or password",401));
        }

        jwtTokenHandler.sendResponseWithToken(user,200,res);
    }
    catch(err){
        next(new ErrorHandler(err.message,400));
    }
}

exports.logoutUser = async(req,res,next)=>{
    
}