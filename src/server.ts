import Kernel from "./app/Http/Kernel";
import { config as dotenvConfig } from "dotenv";
import Middleware from "./app/Http/Middleware";
import apiRoutes from "./routes/api";

class Server extends Kernel {
  constructor() {
    super();
    dotenvConfig();
    this.run();
    this.registerMiddlewares().before();
    this.registerRoutes();
    this.registerMiddlewares().register();
  }

  /**
   * Run the server.
   *
   */
  run(): void {
    this.createApp();
    this.createServer(this.app);
    this.listen(this.getPORT());
  }

  /**
   * Register the Routes of the application.
   *
   */
  registerRoutes(): void {
    this.app.use("/", (req, res) =>
      res.status(200).json({
        message: "Welcome to OVER!",
        status: 200,
      })
    );
    this.app.use("/api", apiRoutes);
  }

  /**
   * Register the Middlewares of the application.
   *
   */
  registerMiddlewares(): Middleware {
    return new Middleware(this.app);
  }
}

export default new Server().getApp();
