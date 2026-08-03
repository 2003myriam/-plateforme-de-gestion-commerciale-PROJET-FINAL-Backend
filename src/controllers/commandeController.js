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


      /* ============= calcul de sub total dans products ======== */
     for (let index = 0; index < products.length; index++) {
      const findproduct=await Product.findById(products[index].productId)
      products[index].unitPrice=findproduct.price
      products[index].subtotal =products[index].quantity*products[index].unitPrice
    }
    const newOrder=await Commande.create({clientId, status,canal,products,
      companyId: req.user.companyId})
    res.json({
   "message" : ` new order is add `,
    data:newOrder
  })
    }
    catch(error){
      console.log(error)
      next(error)
    }
  }

  }


module.exports=new CommandeController