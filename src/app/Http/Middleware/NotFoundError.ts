import express from "express";
import { ResponseError } from "local-types";

class NotFoundError {
  /**
   * Handle an incoming request.
   *
   */
  handle(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const error: ResponseError = new Error("Oops! Request Not Found.");
    error.status = 404;
    next(error);
  }
}

export default NotFoundError;
