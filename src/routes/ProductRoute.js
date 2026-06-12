
const express=require("express");
const ProductController = require("../controllers/productController");
const verifyToken = require("../Middlewares/VerifyToken");
const { authorize } = require("../Middlewares/AutorizeRole");
const router =express.Router();
 
router.post("/product",verifyToken,authorize(["founder","product_manager"]),ProductController.AddProduct)
 router.get("/product",verifyToken,ProductController.GetAllProduct)
/*router.put("/product/:id", verifyToken,ProductController.ModifyProduct)*/
router.delete("/product/:id", verifyToken,authorize(["founder","product_manager"]),ProductController.DeletProduct)
router.get("/category/:categoryId",verifyToken,authorize(["founder","product_manager"]),ProductController.GetAllProductOfCategory) 
 
module.exports= router;