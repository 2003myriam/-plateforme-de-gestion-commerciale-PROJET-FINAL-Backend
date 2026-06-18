const express=require("express");
const  PersonnelTaskController = require("../controllers/personnelTaskController");
const verifyToken = require("../Middlewares/VerifyToken");
const { authorize } = require("../Middlewares/AutorizeRole");
 
const router =express.Router();
 


 
 
router.post("/persotask",verifyToken,PersonnelTaskController.addPersotask)
router.get("/persotask",verifyToken,PersonnelTaskController.gettaskPerso)
router.delete("/persotask/:id",verifyToken,PersonnelTaskController.DeletTaskPerso)

  

 

 

module.exports= router;