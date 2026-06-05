const generateCode = require("../Utils/generateCode");
class CodeController{


/* ==========generate code ============ */
  async regenerateCode(req, res, next) {
  try {
    const { companyId } = req.body;

    const company = await Company.findById(companyId);
  
    if (!company) {
      return res.json({ message: "Company not found" });
    }

    company.joinCode = generateCode();
    company.expiresAt = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

    await company.save();

    return res.json({
      message: "Code regenerated",
      joinCode: company.joinCode
    });

  } catch (error) {
    next(error);
  }
}
}
module.exports = new CodeController();