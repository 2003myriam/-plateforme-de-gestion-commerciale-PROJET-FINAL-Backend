const express=require("express");
 
const categoryController = require("../controllers/categoryController");

const verifyToken = require("../Middlewares/VerifyToken");
const { authorize } = require("../Middlewares/AutorizeRole");
 
const router =express.Router();
 


 
router.post("/category",verifyToken,authorize(["founder"]),categoryController.addcategory )
router.get("/categories", verifyToken,categoryController.GetAllCategoryOfSamecompany)
 

module.exports= router;