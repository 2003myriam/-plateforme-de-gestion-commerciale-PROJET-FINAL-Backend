function ErrorFunction(err,req,res,next) {
   const message=err.message || "internal error"
   const statusCode=err.status || 500
   return res.status(statusCode).json({message})   
}
module.exports={ErrorFunction}