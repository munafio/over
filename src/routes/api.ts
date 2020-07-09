import RouterCore from "../app/Http/Router";
import { CreateCommentValidator } from "../app/Validations/Comment";

const Router = new RouterCore();

/**
 * -----------------------------------------------------------------
 * Comments Routes
 * -----------------------------------------------------------------
 */
Router.prefix("/comments", [
  // GET
  Router.get("/get", "CommentController@get"),
  // CREATE (With validation middleware)
  Router.post("/create", CreateCommentValidator(), "CommentController@create"),
  // UPDATE
  Router.put("/update", "CommentController@update"),
  // DELETE
  Router.delete("/delete", "CommentController@delete"),
]);

export default Router.getRouter();
