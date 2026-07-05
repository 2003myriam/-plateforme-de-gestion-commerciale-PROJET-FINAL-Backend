const {Planning} =require("../models/Planning")

class PlanningController {
   async addTime(req, res, next) {
    try {
      const { weekStart,weekEnd,schedule,note, assignTo} = req.body;
       

      
      const newTime = await Planning.create({
        weekStart,weekEnd,schedule,note,assignTo,
        companyId: req.user.companyId
        
      });

      res.status(201).json({
        message: " time slots created successfully",
        newTime
      });
    } catch (error) {
      next(error);
    }
  }
    /* ================================================= */
/* =====Getting all shedules  of same company ==== */
/* ================================================ */
async GetAllShedule(req, res, next) {
  try {
    const getALLshedule = await Planning.find({
      companyId: req.user.companyId
    });

    res.json({
      message: "All Shedule",
      getALLshedule
    });

  } catch (error) {
    next(error);
  }
}

}
module.exports = new PlanningController();