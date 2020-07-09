import db from "../database/connection";

/**
 * Escape method for data used in SQL queries without quotes.
 *
 * @param value any
 */
export function sqlQueryEscape(value: any) {
  return db.escape(value).replace(/['"]+/g, "");
}
