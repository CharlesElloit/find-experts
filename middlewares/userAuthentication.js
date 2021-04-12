const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      const [x, y] = req.headers.authorization.split(" ");
      token = y;
    } else {
      return res.status(401).json({
        error: "Unauthorized Access",
      });
    }
    // varify the token
    const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY);
    if (!verifiedToken) {
      return res.status(403).json({
        error: "Sorry you are unauthorized to access this resources!",
      });
    }
    req.user = verifiedToken;
    // pass it on to the next middleware in the chain or stack.
    next();
  } catch (error) {
    res.status(500).json({
      authenticationError: "Your authentication fail please try again!",
    });
  }
};
