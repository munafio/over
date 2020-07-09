import { Request, Response, NextFunction } from "express";
import AppConfig from "../../../config/app";

class Cors {
  /**
   * Handle an incoming request.
   *
   */
  handle(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", AppConfig.CORS.origin);
    res.header("Access-Control-Allow-Methods", AppConfig.CORS.methods);
    res.header("Access-Control-Allow-Headers", AppConfig.CORS.headers);
    if (req.method === "OPTIONS") {
      res.status(200).send();
    } else {
      next();
    }
  }
}

export default Cors;
