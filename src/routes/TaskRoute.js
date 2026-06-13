const express=require("express");
const  TaskController = require("../controllers/taskController");
const verifyToken = require("../Middlewares/VerifyToken");
const { authorize } = require("../Middlewares/AutorizeRole");
 
const router =express.Router();
 


 
router.post("/task",verifyToken,authorize(["founder","hr"]),TaskController.addtask)
 

 

module.exports= router;