const {PersoTask} = require("../models/PersoTask");
const { User } = require("../models/User");

class PersonnelTaskController{
  
/* ===================================== */
/* =========Personnel task ============= */
/* ===================================== */
async addPersotask(req, res, next) {
      try {
        const { title,description,priority,status,deadline} = req.body;
        const newTask = await PersoTask.create({
          title,description,status,priority,deadline, 
           userId: req.user._id
        });
        res.status(201).json({
          message: "task created successfully",
          Task: newTask,
        });
      } catch (error) {
        next(error);
      }
    }
/* =======get tasks ============= */
 async gettaskPerso(req, res, next) {
      try {
        const userId = req.user._id; // utilisateur connecté 
        const getTask = await PersoTask.find({
           userId
        });
  
        res.json({
          message: "ALL task",
          getTask
        });
      } catch (error) {
        next(error);
      }
    }
/* =======delete tasks personnel ============= */
async  DeletTaskPerso(req,res,next) {
    try{
    const taskId=req.params.id
    /* ____Chercher le Produit par son ID _______ */
    const findtaskbyId=await PersoTask.findOne({_id:taskId,
    })
    
    /* ___Supprimer la tache_____ */
    const deleteTask=await PersoTask.deleteOne({_id:taskId})
    res.json({
   "message" : `The task  is succesfuly deleted `,
  })
    }
    catch(error){
       return next(error)
    }
  }


}
module.exports = new PersonnelTaskController();