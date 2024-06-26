const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const { catchAsyncError } = require("./catchAsyncErrors");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  req.id = id;
  next(); 
});
