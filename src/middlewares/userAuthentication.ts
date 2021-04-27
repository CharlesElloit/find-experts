import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<T> => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      const [_x, y] = req.headers.authorization.split(" ");
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
    if (error.message === "jwt expired") {
      res.status(400).json({
        success: false,
        message: "Access token expires",
      });
    } else {
      console.loe(error);
      res.status(403).json({
        error,
        message: "Your authentication fail please try again!",
      });
    }
  }
};

export default auth;
