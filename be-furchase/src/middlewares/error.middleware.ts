import { NextFunction, Request, Response } from "express";
import { appError } from "../utils/response";

export const pageNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorPage = new appError(`Page not found ${req.originalUrl}`, 404);
  next(errorPage);
};

export const errorHandler = (
  err: appError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof appError ? err.statusCode : 500;
  const message = err.message || "Internal server error";

  console.error(err.stack);
  res.status(statusCode).json({
    status: "error",
    message,
  });
};
