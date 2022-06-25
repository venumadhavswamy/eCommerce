module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    //Handles wrong mongodb id error
    // if(err.name === 'CastError'){
    //     err.message = "Resource not found";
    // }
    res.status(err.statusCode).json({
        message:err.message,success:false,error:err
    });
}