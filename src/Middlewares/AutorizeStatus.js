function authorizestatus() {
  return function (req, res, next) {

    const status = req.user.status;

    if (status !== "approved") {
      const error = new Error("you don't have the access");
      error.status = 401;
      return next(error); // 🔥 IMPORTANT
    }

    return next();
  };
}

module.exports = { authorizestatus };