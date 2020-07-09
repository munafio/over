import { config as dotenv } from "dotenv";
dotenv();

export default {
  /**
   * ----------------------------------------------------------------------
   * Database Connection Config
   * ----------------------------------------------------------------------
   *
   * All the configurations related to MySQL Database Connection.
   *
   */
  connectionConfig: {
    connectionLimit: 10,
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "over",
  },
};
