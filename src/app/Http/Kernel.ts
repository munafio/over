import express from "express";
import http, { createServer } from "http";
import appConfig from '../../config/app'

class Kernel {
  public static readonly PORT: string | number = appConfig.port;
  protected app: express.Application;
  protected server: http.Server;

  /**
   * Create application.
   *
   */
  createApp(): void {
    this.app = express();
  }

  /**
   * Get the application.
   *
   */
  getApp(): express.Application {
    return this.app;
  }

  /**
   * Get the application.
   *
   */
  getPORT(): number | string {
    return process.env.PORT || Kernel.PORT;
  }

  /**
   * Create a server.
   *
   * @param app express.Application
   */
  createServer(app: express.Application): void {
    this.server = createServer(app);
  }

  /**
   * Listen on the server at a specific port.
   *
   * @param port number | string
   */
  listen(port: number | string): void {
    this.server.listen(port, (): void => {
      console.log(`Server running at ${appConfig.url}:${port}`);
    });
  }
}

export default Kernel;
