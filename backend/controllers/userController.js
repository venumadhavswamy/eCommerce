const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');

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
        console.log(typeof(user),user);
        res.status(201).json({user,success:true});
    }
    catch(err){
        console.log(err.stack);
        next(new ErrorHandler(err.message,400));
    }
}
