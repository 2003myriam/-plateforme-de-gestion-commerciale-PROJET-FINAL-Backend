const express=require("express");
const  UserController = require("../controllers/userController");
const { authorizestatus } = require("../Middlewares/AutorizeStatus");
const verifyToken = require("../Middlewares/VerifyToken");
const router =express.Router();
 


router.post("/getstarted",UserController.founder)
router.post("/register",UserController.UserRegister)
router.post("/login",UserController.login)
router.get("/dashboard",verifyToken,authorizestatus(),(req,res)=> res.json({message:"welcome"}))

router.get("/users",verifyToken,UserController.AllUserOfSameCompny)

 

module.exports= router;