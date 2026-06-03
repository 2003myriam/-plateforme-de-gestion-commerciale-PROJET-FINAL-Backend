const jwt= require("jsonwebtoken")
require("dotenv").config()
function generateToken(payload){
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn:"3h"}  /* apres cette durée le paylond codé change  */
    )
}
module.exports={generateToken}