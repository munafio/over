import { Application } from "express";
import body_parser from "body-parser";
import Cors from "./Cors";
import ErrorHandling from "./ErrorHandling";
import NotFoundError from "./NotFoundError";

class Middleware {
  protected app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  /**
   * Register Middlewares
   *
   */
  public register() {
    this.app.use(
      new Cors().handle,
      new NotFoundError().handle,
      new ErrorHandling().handle
    );
  }

  /**
   * Middleware to be registered before the Router.
   *
   */
  public before() {
    this.app.use(
      body_parser.urlencoded({ extended: false }),
      body_parser.json()
    );
  }
}

export default Middleware;
