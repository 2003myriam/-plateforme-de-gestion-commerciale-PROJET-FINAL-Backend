const { Client } = require("../models/Client")

class ClientController{
  /* ajouter un client */
 async  AddClient(req,res,next) {
    try{
    const {name, email,phone,wilaya,badge}=req.body
    const newClient=await Client.insertOne({
      name, email,phone,wilaya,badge,companyId: req.user.companyId

    })
    res.json({
   "message" : `The Client ${name} is succesfuly create `,
    data:newClient
  })
    }
    catch(error){
      console.log(error)
      next(error)
    }
  }

    /* getting all customers */
    async GetAllCustomers(req, res, next) {
      try {
        const getALLcustomer = await Client.find({
          companyId: req.user.companyId
        })
    
        res.json({
          message: "All Customers",
          getALLcustomer
        });
    
      } catch (error) {
        next(error);
      }
    }
    /* filtring customers by name or wilaya */
    async filterCustomers(req, res, next) {
      try {
        const name=req.query.name
        const wilaya=req.query.wilaya
        const filtercustomer = await Client.find({
          companyId: req.user.companyId
        })
    
        res.json({
          message: "All Customers",
          getALLcustomer
        });
    
      } catch (error) {
        next(error);
      }}

}
module.exports=new ClientController 