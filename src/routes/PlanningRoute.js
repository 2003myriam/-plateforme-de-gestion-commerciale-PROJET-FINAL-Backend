const express=require("express");
 
const PlanningController = require("../controllers/planningController");

const verifyToken = require("../Middlewares/VerifyToken");
const { authorize } = require("../Middlewares/AutorizeRole");
 
const router =express.Router();
 


 
router.post("/shedule",verifyToken,authorize(["founder","hr"]),PlanningController.addTime)

 
router.get("/shedule",verifyToken,PlanningController.GetAllShedule)
 
 

module.exports= router;