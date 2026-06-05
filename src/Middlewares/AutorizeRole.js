function authorize(authorizedRoles){

    return function (req,res,next){
        
        if(!req.user){
            const error=new Error("not authentified")
            error.status=401
            next(error)
        }
        console.log(req.user)
        const role=req.user.role
        if(!authorizedRoles.includes(role)){
            const error=new Error("forbidden, You don't have access for this route")

            error.status=403
            next(error) 
        }
        next() 
    }
}
module.exports={authorize}