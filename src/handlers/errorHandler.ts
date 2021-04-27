import { Request, Response, NextFunction } from "express";
// checkError
// eslint-disable-next-line consistent-return
export const catchErrorsHandler = (func: Function) => (
  req: Request,
  res: Response,
  next: NextFunction,
) =>
  func(req, res, next).catch((error) => {
    if (typeof error === "string") {
      return res.status(400).json({
        errorMessage: error,
      });
    }
    next(error);
  });

// development errors handler middleware
export const developmentErrorsHandler = (
  error: object,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode: number = res.statusCode !== 200 ? 400 : res.statusCode;
  res.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === "development" && error.stack,
  });
};

// Production Error handler middleware
export const productionErrorsHandler = (
  error: object,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.status || 500);
  res.render("error", {
    message: error.message,
    error: {},
  });
};

// Not Found error handler
export const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = new Error("Not Found! auh");
  res.status(404);
  error.status = 404;
  next(error);
};
