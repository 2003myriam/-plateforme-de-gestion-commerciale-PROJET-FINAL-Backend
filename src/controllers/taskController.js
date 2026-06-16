const {Task} = require("../models/Tasks");
const { User } = require("../models/User");

class TaskController{
  async addtask(req, res, next) {
      try {
        const { title,description,priority,status,assignedTo} = req.body;
        const newTask = await Task.create({
          title,description,priority,status,assignedTo,
         companyId: req.user.companyId
        });
        const tasks = await Task.find().populate("assignedTo");
        console.log(tasks);
        console.log(newTask);
        
  
        res.status(201).json({
          message: "task created successfully",
          Task: newTask,
        });
      } catch (error) {
        next(error);
      }
    }
/* =======get tasks ============= */
 async gettask(req, res, next) {
      try {
        const getTask = await Task.find({
           companyId: req.user.companyId
        });
  
        res.json({
          message: "ALL task",
          getTask
        });
      } catch (error) {
        next(error);
      }
    }

}
module.exports = new TaskController();