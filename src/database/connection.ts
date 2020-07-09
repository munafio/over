import mysql from "mysql";
import config from "../config/database";

const pool = mysql.createPool(config.connectionConfig);

export default pool;
