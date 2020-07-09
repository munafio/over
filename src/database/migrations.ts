import db from "./connection";

const migrations: string[][] = [
  /**
   * ---------------------------------------------------------
   * Comments Table
   * ---------------------------------------------------------
   *
   */

  [
    "comments",
    `
  CREATE TABLE IF NOT EXISTS comments (
      id varchar(255) NOT NULL PRIMARY KEY,
      commentable_key varchar(255) NOT NULL,
      commentable_id varchar(255) NOT NULL,
      name varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
      body varchar(255) NOT NULL,
      rating int(11) NOT NULL DEFAULT 0,
      reply_id varchar(255) NULL DEFAULT NULL,
      created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    `,
  ],
];

// ---------------------------------------------------------
// Migrate
// ---------------------------------------------------------
migrations.forEach((table: string[]) => {
  db.query(table[1], (err: any, result: any) => {
    if (err) {
      console.log(
        `[DATABASE] An error occured at '${table[0]}' table during the migration process!`
      );
      throw err;
    }
    console.log(`[DATABASE] Table '${table[0]}' created successfully.`);
    db.end();
  });
});
