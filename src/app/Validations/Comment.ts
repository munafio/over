import { validate, Joi } from "express-validation";

/**
 * A valdiation for incoming request of (Create a comment).
 *
 */
export function CreateCommentValidator() {
  return validate({
    body: Joi.object({
      commentable_key: Joi.string().required(),
      commentable_id: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      body: Joi.string().required(),
      rating: Joi.number(),
      reply_id: Joi.string(),
    }),
  });
}
