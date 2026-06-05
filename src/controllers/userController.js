const { User } = require("../models/User");
const { Company } = require("../models/Company");
const { generateToken } = require("../Utils/Jwt");
const generateCode = require("../Utils/generateCode");

 
class UserController {
  /* ======== GET STARTED (Founder + Company) ======== */
  async founder(req, res, next) {
    try {

      const { name, email, password, phone, companyName, companyEmail} = req.body;
      // 1. Create founder
      const newFounder = await User.create({
        name,
        email,
        password,
        phone,
        role: "founder",
       
      });
 
      
      // 2. Create company linked to founder
      const newCompany = await Company.create({
        companyName,
        companyEmail,
        ownerId: newFounder._id,
        joinCode: generateCode(),
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      });

    
      // 3. Update founder with companyId
      newFounder.companyId = newCompany._id;
      await newFounder.save();

      return res.json({
        message: "Founder and Company created successfully",
        founder: newFounder,
        company: newCompany
      });

    } catch (error) {
      next(error);
    }
  }

  
/* ========== User register ============= */
  async UserRegister(req, res, next) {
      try {
        const { name, email, password, phone,role,joinCode} = req.body; // ce qui remplis l'utilisateur 
        const company=await Company.findOne({joinCode}); //trouver company avec ce joincode
        if (!company) {
        return res.json({
        message: " invalide code ",
      });}
       if (new Date() > company.expiresAt) {
        return res.json({
        message: " expeer code  ",
      });}
        else{
        // 1. Create user
        const newUser = await User.create({
          name,
          email,
          password,
          phone,
          role,
          status:"pending",
          companyId:company._id
        })
        return res.json({
        message: "waiting approval",
        newUser
      });
        }
       
      } catch (error) {
        next(error);
      }
    }

/* ========== User login ============= */
  async  login(req,res,next){
  try {
  const{email,password}=req.body
   /* ______Trouver un user deja existant de notre BDD avec findOne _______ */
  const findUser=await User.findOne({email,password}) 
  if(!findUser){
  const error = new Error("user not found");
  error.status = 404;
  next(error)
  }
   
   const payload={
     _id:findUser._id,
      email:email,
      status:findUser.status
  }
  const token=generateToken(payload)
 
  res.json({
   "message" : `${email} is logged`,
    data:findUser || undefined,
    token
    
  })
  } catch (error) {
    console.log(error); 
    next(error)
  }
}

}





module.exports = new UserController();