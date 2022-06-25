const ErrorHandler = require("../utils/errorHandler");

exports.catchAsyncError = async (execFunction,req,res,next)=>{
    try{
        await execFunction(req,res,next);
    }
    catch(err){
        next(new ErrorHandler("Bad request",400));
    }
}

//TODO
exports.catchAsyncErrorrrr = function (execFunction){
    return function(req,res,next){
        try{

        }
        catch(err){

        }
    }
}