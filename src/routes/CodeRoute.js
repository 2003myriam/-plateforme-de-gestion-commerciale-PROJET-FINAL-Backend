const express=require("express");
const  CodeGeneratorController = require("../controllers/codegeneratorController");
const verifyToken = require("../Middlewares/VerifyToken");
const { authorize } = require("../Middlewares/AutorizeRole");
 
const router =express.Router();
 


 
router.post("/generatecode",verifyToken,authorize(["founder","product_manager"]), CodeGeneratorController.regenerateCode)
 
 
 

module.exports= router;