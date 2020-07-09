import db from "../../database/connection";
import { sqlQueryEscape } from "../helpers";
import { Request } from "express";
import { IComment } from "local-types";
import { v4 as uuidv4 } from "uuid";

class Comment {
  /**
   * Default pagination limit (per page).
   */
  public readonly perPage: number = 10;

  /**
   * Create a comment
   *
   * @param data data Object
   */
  create(body: any): Promise<any> {
    const data: IComment = {
      id: uuidv4(),
      commentable_key: body.commentable_key,
      commentable_id: body.commentable_id,
      name: body.name,
      email: body.email,
      body: body.body,
      rating: body.rating ? body.rating : 0,
      reply_id: body.reply_id ? body.reply_id : null,
    };
    return new Promise(
      (
        resolve: (value?: unknown) => void,
        reject: (reason?: any) => void
      ): void => {
        // DB Query
        db.query("INSERT INTO comments set ?", data, function (err, res) {
          if (err) return reject(err);
          return resolve(res);
        });
      }
    );
  }

  /**
   * Get comments.
   *
   * @param data data Object
   */
  async get(req: Request): Promise<any> {
    const data: any = this.getQueryBuilder(req);
    // console.log(data);

    return new Promise(
      (
        resolve: (value?: unknown) => void,
        reject: (reason?: any) => void
      ): void => {
        // DB Query
        db.query(data.sql, data.params, function (err, res) {
          if (err) return reject(err);
          return resolve(res);
        });
      }
    );
  }

  /**
   * A SQL query builder for (Get comments)'s method.
   *
   * @param req e.Request
   */
  private getQueryBuilder(req: Request): Object {
    // Query schema
    let query: any = {
      sql: `SELECT * FROM comments`,
      params: [],
    };

    // get all WHEREs
    let WHEREs: any = {};
    Object.keys(req.query).forEach((param) => {
      param = sqlQueryEscape(param);
      if (
        param == "id" ||
        param == "comment_id" ||
        param == "commentable_id" ||
        param == "commentable_key"
      ) {
        WHEREs = Object.assign(WHEREs, {
          [param == "comment_id" ? "reply_id" : param]: req.query[param],
        });
      }
    });

    // Add 'WHERE' to query
    const WHEREs_length: number = Object.keys(WHEREs).length;
    if (WHEREs_length > 0) {
      if (WHEREs_length == 1) {
        query.sql = `${query.sql} WHERE ${Object.keys(WHEREs)[0]} = ?`;
        query.params.push(Object.values(WHEREs)[0]);
      } else {
        query.sql = `${query.sql} WHERE ${Object.keys(WHEREs).join(
          " = ? AND "
        )} = ?`;
        query.params = Object.values(WHEREs);
      }
    }

    // Add 'filter' to query
    if (req.query["filter"]) {
      const filter: string[] = sqlQueryEscape(req.query["filter"]).split(",");
      const ORDER: string = filter[0];
      const SORT: string = typeof filter[1] !== "undefined" ? filter[1] : "ASC";
      query.sql = `${query.sql} ORDER BY ${ORDER} ${SORT}`;
    }

    // Add 'page' to query
    if (req.query["page"]) {
      // Requested page.
      const page: number = parseInt(req.query["page"] as string) - 1;
      // Concatenate SQL query.
      query.sql = `${query.sql} LIMIT ? OFFSET ?`;
      // LIMIT, OFFSET.
      query.params = [
        ...query.params,
        this.getPerPage(req),
        page * this.getPerPage(req),
      ];
    }

    return query;
  }
  /**
   * Get pagination limit (per page) from request's query,
   * or return the default.
   *
   * @param req e.Request
   */
  getPerPage(req: Request): number {
    return req.query["per_page"]
      ? parseInt(req.query["per_page"] as string)
      : this.perPage;
  }

  /**
   * Update a comment
   *
   * @param params e.Request.query
   */
  update(params: any): Promise<any> {
    return new Promise(
      (
        resolve: (value?: unknown) => void,
        reject: (reason?: any) => void
      ): void => {
        // Get id parameter and delete it from the request's params.
        const id = params.id;
        delete params.id;

        // [SETs] Columns to be updated
        const SETs: string = Object.keys(params)
          .map((param: any) => sqlQueryEscape(param) + " = ?")
          .toString();
        // DB Query
        db.query(
          `UPDATE comments SET ${SETs} WHERE id = ?`,
          [...Object.values(params), id],
          function (err, res) {
            if (err) return reject(err);
            return resolve(res);
          }
        );
      }
    );
  }

  /**
   * Delete a comment
   *
   * @param id string | any
   */
  delete(id: any): Promise<any> {
    return new Promise(
      (
        resolve: (value?: unknown) => void,
        reject: (reason?: any) => void
      ): void => {
        db.query("DELETE FROM comments WHERE id = ?", id, function (err) {
          if (err) return reject(err);
          return resolve(true);
        });
      }
    );
  }
}

export default Comment;
