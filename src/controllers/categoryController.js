const { Category } = require("../models/Category");
const { Company } = require("../models/Company");

class CategoryController {
  /* ========add category selon la company========= */
  async addcategory(req, res, next) {
    try {
      const { name } = req.body;
       

      
      const newCategory = await Category.create({
        name,
        companyId: req.user.companyId
        
      });

      res.status(201).json({
        message: "Category created successfully",
        category: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }
/* ===========getting all category of same company ======= */
async GetAllCategoryOfSamecompany(req, res, next) {
  try {

    const categories = await Category.find({
      companyId: req.user.companyId
    });
    console.log("USER FULL:", req.user);
    console.log("COMPANY ID FROM USER:", req.user.companyId);

    res.json({
      message: "All categories of this company",
      data: categories
    });

  } catch (error) {
    next(error);
  }
}
}
module.exports = new CategoryController();