const {Product} =require("../models/Product")
class ProductController{


  /* ______Adding Product_________ */
  async  AddProduct(req,res,next) {
    try{
    console.log(req.body);
    const {title, description,sku,image,stockQuantity,price,stockMin,categoryId}=req.body
    const newProduct=await Product.insertOne({title, description,sku,image,stockQuantity,price,stockMin,categoryId,companyId: req.user.companyId})
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
async  GetAllProduct(req,res,next){
  try {
  const getALLproduct = await Product.find({companyId: req.user.companyId})
 console.log(getALLproduct);
 
  res.json({
   "message" : `All Product  `,
    getALLproduct
  })
  } catch (error) {
      next(error)
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

}


module.exports=new ProductController 