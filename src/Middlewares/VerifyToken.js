const jwt=require("jsonwebtoken")
require("dotenv").config()
function verifyToken(req,res,next){
    const authHeader=req.headers["authorization"]

    const token= authHeader && authHeader.split(" ")[1]
    if(!token){
        const error=new Error("access denied, no token provided")
        error.status=401
     return next(error)
    }
    console.log("authHeader",token);
    
    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET)

        req.user=decoded
        console.log(req.user);
          
        next()
    }
    catch(err){
    const error=new Error("invalid, or expired")
    error.status=403
     next(error)
    }

}
module.exports = verifyToken