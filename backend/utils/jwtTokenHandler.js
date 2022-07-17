//Sends token through cookie
exports.sendResponseWithToken = (user, statusCode, response)=>{
    const token = user.getJWTToken();
    const cookieOptions = {
        //Converting days in milliseconds and adding them to current time
        expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly: true
    }
    response.status(statusCode).cookie("token",token,cookieOptions).json({
        success:true,
        user,
        token
    });
}