const {Task} = require("../models/Tasks");
const { User } = require("../models/User");

class TaskController{
  async addtask(req, res, next) {
      try {
        const { title,description,priority,status,assignedTo} = req.body;
        const newTask = await Task.create({
          title,description,priority,status,assignedTo
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

}
module.exports = new TaskController();