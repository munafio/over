import { config as dotenv } from "dotenv";
dotenv();

export default {
  /**
   * ----------------------------------------------------------------------
   * Application Name
   * ----------------------------------------------------------------------
   *
   * You can use this value anywhere in your application that requires
   * the name of your app.
   *
   */
  name: process.env.APP_NAME || "Over",

  /**
   * ----------------------------------------------------------------------
   * Application's Server Port
   * ----------------------------------------------------------------------
   *
   * This is the default application's server port.
   *
   */
  port: process.env.APP_PORT || 8000,

  /**
   * ----------------------------------------------------------------------
   * Application URL
   * ----------------------------------------------------------------------
   *
   * You can use this value anywhere in your application that requires
   * the URL of your app.
   *
   */
  url: process.env.APP_URL || "http://127.0.0.1",

  /**
   * ----------------------------------------------------------------------
   * Cross-Origin Resource Sharing (CORS)
   * ----------------------------------------------------------------------
   *
   * This is the default configurations for CORS which is a mechanism
   * that uses additional HTTP headers to tell browsers to give a
   * web application running at one origin, access to selected resources
   * from a different origin.
   *
   */
  CORS: {
    origin: "*",
    methods: "GET,PUT,POST,DELETE,OPTIONS",
    headers: "Content-Type, Authorization, Content-Length, X-Requested-With",
  },
};
