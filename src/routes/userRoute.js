const express=require("express");
const  UserController = require("../controllers/userController");
const { authorizestatus } = require("../Middlewares/AutorizeStatus");
const verifyToken = require("../Middlewares/VerifyToken");
const { authorize } = require("../Middlewares/AutorizeRole");
const router =express.Router();
 
router.post("/getstarted",UserController.founder)
router.post("/register",UserController.UserRegister)
router.post("/login",UserController.login)
router.get("/dashboard",verifyToken,authorizestatus(),(req,res)=> res.json({message:"welcome"}))
router.get("/users",verifyToken,UserController.AllUserOfSameCompny)
router.get("/pendingusers",verifyToken,UserController.AllPendingUsers)
router.get("/approvedusers",verifyToken,UserController.AllApprovedUsers)
router.put("/updateusers/:id",verifyToken,authorize(["founder"]),UserController.UpdateUser)
 

module.exports= router;