const {Product} =require("../models/Product")
class ProductController{


 
  /* ================================================= */
/* ================Adding Product===================== */
/* ================================================ */
  async  AddProduct(req,res,next) {
    try{
    console.log(req.body);
    const {title, description,sku,image,stockQuantity,price,stockInitial,categoryId}=req.body
    const newProduct=await Product.insertOne({title, description,sku,image,stockQuantity,price,stockInitial,categoryId,companyId: req.user.companyId})
    res.json({
   "message" : `The Product ${title} is succesfuly create `,
    data:newProduct
  })
    }
    catch(error){
      console.log(error)
      next(error)
    }
  }
   /* ================================================= */
/* =====Getting all Products  of same company ==== */
/* ================================================ */
async GetAllProduct(req, res, next) {
  try {
    const getALLproduct = await Product.find({
      companyId: req.user.companyId
    }).populate("categoryId");

    res.json({
      message: "All Products",
      getALLproduct
    });

  } catch (error) {
    next(error);
  }
}
/* ================================================= */
/* =====Getting all Products of same  category==== */
/* ================================================ */
async  GetAllProductOfCategory(req,res,next){
  try {
   
    const categoryId = req.params.categoryId;
    console.log(`le id de la category est : ${categoryId}`);
    
    const getproduct = await Product.find({
      categoryId,
      companyId: req.user.companyId
    });
  
  res.json({
   "message" : `All Product in  this category`,
    getproduct
  })
  } catch (error) {
      next(error)
  }
}
/* ================================================= */
/* ===================Delete product=============== */
/* ================================================ */

async  DeletProduct(req,res,next) {
    try{
    const productId=req.params.id
    /* ____Chercher le Produit par son ID _______ */
    const findProductbyId=await Product.findOne({_id:productId,
       companyId: req.user.companyId
    })
    /* _______si Pas de ID donc produit n'existe pas ______ */
    if (!findProductbyId) {
      const error = new Error(" Product not found");
      error.status = 404;
       return next(error)
    }
    /* ___Supprimer le produit_____ */
    const deleteProduct=await Product.deleteOne({_id:productId,  companyId: req.user.companyId})
    res.json({
   "message" : `The Product  is succesfuly deleted `,
  })
    }
    catch(error){
       return next(error)
    }
  }

  

}


module.exports=new ProductController 