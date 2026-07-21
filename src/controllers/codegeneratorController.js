const { Company } = require("../models/Company");
const generateCode = require("../Utils/generateCode");
class CodeController{


/* ==========generate code ============ */
  async regenerateCode(req, res, next) {
  try {
    const company = await Company.findById(req.user.companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    // Vérifie que l'utilisateur connecté est bien le propriétaire
    if (company.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only the founder of this company can regenerate the code."
      });
    }

    company.joinCode = generateCode();
company.expiresAt = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

await company.save();

    res.json({
      message: "Code regenerated",
      joinCode: company.joinCode
    });

  } catch (error) {
    next(error);
  }
}
}
module.exports = new CodeController();