import express, {
  IRouter,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import getPath from "path";
import { RouterRequestHandlers } from "local-types";

class Router {
  // Initializing express router
  private router: IRouter = express.Router();

  /**
   * Filter Route's handlers to return
   * (express.RequestHandler) if it was a string.
   *
   * @param handlers RouterRequestHandlers
   */
  private filterHandlers(handlers: RouterRequestHandlers): RequestHandler[] {
    return handlers.map(
      (handler: string | RequestHandler): RequestHandler => {
        if (typeof handler === "string") {
          const ControllerAndMethod: string[] = handler.split("@");
          try {
            const controller = new (require(getPath.join(
              __dirname,
              `../Controllers/${ControllerAndMethod[0]}`
            )).default)();
            return controller[ControllerAndMethod[1]];
          } catch (error) {
            console.log(error);
            return (req: Request, res: Response, next: NextFunction) =>
              next(
                new Error(`An error occured with your controller [${handler}]`)
              );
          }
        }
        return handler;
      }
    );
  }

  /**
   * Get router property.
   *
   */
  public getRouter() {
    return this.router;
  }

  /**
   * Dynamic route method.
   *
   * @param method string
   * @param path string
   * @param handlers RouterRequestHandlers
   */
  private route(method: string, path: string, handlers: RouterRequestHandlers) {
    return this.router[method](path, this.filterHandlers(handlers));
  }

  /**
   * This method is just like the Router.METHOD() methods,
   * except that it matches all HTTP methods (verbs).
   *
   * @param path string
   * @param handlers RouterRequestHandlers
   */
  public all(path: string, ...handlers: RouterRequestHandlers): IRouter {
    return this.route("all", path, handlers);
  }

  /**
   * GET method.
   *
   * @param path string
   * @param handlers RouterRequestHandlers
   */
  public get(path: string, ...handlers: RouterRequestHandlers): IRouter {
    return this.route("get", path, handlers);
  }

  /**
   * POST method.
   *
   * @param path string
   * @param handlers RouterRequestHandlers
   */
  public post(path: string, ...handlers: RouterRequestHandlers): IRouter {
    return this.route("post", path, handlers);
  }

  /**
   * PUT method.
   *
   * @param path string
   * @param handlers RouterRequestHandlers
   */
  public put(path: string, ...handlers: RouterRequestHandlers): IRouter {
    return this.route("put", path, handlers);
  }

  /**
   * PATCH method.
   *
   * @param path string
   * @param handlers RouterRequestHandlers
   */
  public patch(path: string, ...handlers: RouterRequestHandlers): IRouter {
    return this.route("patch", path, handlers);
  }

  /**
   * DELETE method.
   *
   * @param path string
   * @param handlers RouterRequestHandlers
   */
  public delete(path: string, ...handlers: RouterRequestHandlers): IRouter {
    return this.route("delete", path, handlers);
  }

  /**
   * OPTIONS method.
   *
   * @param path string
   * @param handlers RouterRequestHandlers
   */
  public options(path: string, ...handlers: RouterRequestHandlers): IRouter {
    return this.route("options", path, handlers);
  }

  /**
   * Group multiple routes by a prefix.
   *
   * @param prefix string
   * @param routes IRouter[]
   */
  public prefix(prefix: string, routes: IRouter[]): void {
    this.router.use(prefix, routes);
  }
}

export default Router;
