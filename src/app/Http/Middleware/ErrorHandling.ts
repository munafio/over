import express from "express";
import { ValidationError } from "express-validation";
import { ResponseError } from "local-types";

class ErrorHandling {
  /**
   * Handle an incoming request.
   *
   */
  handle(
    err: ResponseError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }

    res.status(err.status || 500).json({
      message: err.message,
      status: err.status,
    });
  }
}

export default ErrorHandling;
