const express=require("express");
 
const commandeController = require("../controllers/commandeController");

const verifyToken = require("../Middlewares/VerifyToken");
const { authorize } = require("../Middlewares/AutorizeRole");
 
const router =express.Router();
 


 
router.post("/order",verifyToken,authorize(["founder","customer_service"]),commandeController.AddOrder )
 

module.exports= router;