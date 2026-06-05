const express=require("express");
const  CodeGeneratorController = require("../controllers/codegeneratorController");
 
const router =express.Router();
 


 
router.post("/generatecode", CodeGeneratorController.regenerateCode)
 

 

module.exports= router;