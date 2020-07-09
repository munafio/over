import { Request, Response } from "express";
import Comment from "../Models/Comment";
const comment: Comment = new Comment();

class CommentController {
  /**
   * Create a comment.
   *
   * @param req e.Request
   * @param res e.Response
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      await comment.create(req.body);
      res.status(201).json({ message: "Created Successfully." });
    } catch (error) {
      // console.log(error);
      res.status(422).json({ message: "Error, Not Created!" });
    }
  }

  /**
   * Get comments.
   *
   * @param req e.Request
   * @param res e.Response
   */
  async get(req: Request, res: Response): Promise<void> {
    try {
      // Response Schema
      let response: any = {
        data: [],
      };

      // get requested comments
      response.data = await comment.get(req);

      // Others
      if (req.query.page) {
        // Add pagination data for (Response Schema).
        response = Object.assign(response, {
          isLastPage: null,
          totalPages: null,
        });

        const page = req.query.page;
        delete req.query.page;

        // Get total pages
        response.totalPages = Math.ceil(
          (await comment.get(req)).length / comment.getPerPage(req)
        );

        // Get (isLastPage)
        response.isLastPage =
          response.data.length < 1 ? true : page == response.totalPages;
      }

      // The response
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res
        .status(422)
        .json({ message: "Error, Please check your entries and try again!" });
    }
  }

  /**
   * Update a comment.
   *
   * @param req e.Request
   * @param res e.Response
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      await comment.update(req.query);
      res.status(200).json({ message: "Updated Successfully." });
    } catch (error) {
      // console.log(error);
      res.status(422).json({
        message:
          "An error occured while updating the record! Please check your entries.",
      });
    }
  }

  /**
   * Delete a comment.
   *
   * @param req e.Request
   * @param res e.Response
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      await comment.delete(req.query.id);
      res.status(201).json({ message: "The record has been deleted!" });
    } catch (error) {
      // console.log(error);
      res.status(422).json({
        message: "An error occured while deleting this record!",
      });
    }
  }
}
export default CommentController;
