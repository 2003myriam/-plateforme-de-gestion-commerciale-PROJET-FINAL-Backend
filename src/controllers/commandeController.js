const {Commande} =require("../models/Commande")
const {Product} =require("../models/Product")
class CommandeController{
/* ================================================= */
/* ================Adding  Order ===================== */
/* ================================================ */
  async  AddOrder(req,res,next) {
    try{
    console.log(req.body);
    const {clientId, status,canal,products}=req.body
   


      /* ============= calcul de sub total et total  dans products ======== */
     let total=0
     for (let index = 0; index < products.length; index++) {
      const findproduct=await Product.findById(products[index].productId)
      /* ========= verifier si le produit existe ===== */
       if (!findproduct) {
       const error = new Error("Product not found");
       error.status = 404;
      return next(error);
      }
      /* ====== verifie si le produit appartient a cette entreprise====== */
        
       if (!findproduct.companyId.equals(req.user.companyId)) {
       const error = new Error("Product not in this company ");
       error.status = 403;
      return next(error);
    }
     /* ====== verifie si le  stock est suffisant ====== */
       if (findproduct.stockQuantity < products[index].quantity) {
       const error = new Error("Insufficient stock");
       error.status = 422 ;
      return next(error);

       }
      products[index].unitPrice=findproduct.price
      products[index].subtotal =products[index].quantity*products[index].unitPrice
      
      total=total+products[index].subtotal
    
  }
    const newOrder=await Commande.create({clientId, status,canal,products,total,
      companyId: req.user.companyId})
    res.json({
   "message" : ` new order is add `,
    data:newOrder
  })
  console.log( newOrder.products.length);
  
  
  /* =========== Reglage du stock apres creation de la commande ====== */
  for (let index = 0; index < products.length; index++) {
    const findproduct=await Product.findById(products[index].productId)
    findproduct.stockQuantity=findproduct.stockQuantity-products[index].quantity 
    await findproduct.save()
  }
  

}
    catch(error){
      console.log(error)
      next(error)
    }
  }

  }


module.exports=new CommandeController