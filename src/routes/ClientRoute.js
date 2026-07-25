const express=require("express");
 
const clientController = require("../controllers/ClientController");

const verifyToken = require("../Middlewares/VerifyToken");
const { authorize } = require("../Middlewares/AutorizeRole");
 
const router =express.Router();
 


 
router.post("/customer",verifyToken,authorize(["founder","customer_service"]),clientController.AddClient )
router.get("/customer",verifyToken,clientController.GetAllCustomers )
 
 

module.exports= router;