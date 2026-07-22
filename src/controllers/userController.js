const { User } = require("../models/User");
const { Company } = require("../models/Company");
const { generateToken } = require("../Utils/Jwt");
const generateCode = require("../Utils/generateCode");

 
class UserController {
  /* ======== GET STARTED (Founder + Company) ======== */
  async founder(req, res, next) {
    try {
      console.log(req.body);
      
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

       res.json({
        "message": "Founder and Company created successfully",
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
    console.log(req.body);

    const { name, email, password, phone, role, joinCode } = req.body;

    const company = await Company.findOne({ joinCode });

    if (!company) {
      return res.status(400).json({ message: "Invalid code" });
    }

    if (new Date() > company.expiresAt) {
      return res.status(400).json({ message: "Expired code" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      phone,
      role,
      status: "pending",
      companyId: company._id
    });

    return res.json({
      message: "waiting approval",
      newUser
    });

  } catch (error) {
    next(error);
  }
}

/* ========== User login ============= */
  async  login(req,res,next){
  try {
  console.log(req.body);
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
/* ======= get all user of same company========== */
async  AllUserOfSameCompny(req,res,next){
  try {
  const findUsers=await User.find({companyId: req.user.companyId}) 
  res.json({
    data:findUsers   
  })
  } catch (error) { 
    next(error)
  }
}
/* ======= get all user of same company & status == "pending"========== */
async AllPendingUsers(req, res, next) {
  try {

    const findUsers = await User.find({
      companyId: req.user.companyId,
      status: "pending"
    });

    res.json({
      data: findUsers
    });

  } catch (error) {
    next(error);
  }
}
/* ======= get all user of same company & status == "approved"========== */
async AllApprovedUsers(req, res, next) {
  try {

    const findUsers = await User.find({
      companyId: req.user.companyId,
      status: "approved"
    });

    res.json({
      data: findUsers
    });

  } catch (error) {
    next(error);
  }
}

/* ==========Update user status============ */
  async UpdateUser(req, res, next) {
  try {
  const { status } = req.body
  const Userid=req.params.id
     const userUpdated=await User.findByIdAndUpdate({_id:Userid},{status})
     res.json({

    "message":"User is succesfully  updated",
     data: userUpdated,
    
  })
  } 
  catch (error) {
    next(error)
  }}
}





module.exports = new UserController();