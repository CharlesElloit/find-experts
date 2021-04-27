const protectedRoute = (req, res, next) => res.status(200).json({
  message: "Protected Content!",
});

module.exports = protectedRoute;
