import { RequestHandler } from "express";

export type RouterRequestHandlers = (string | RequestHandler)[];

export interface ResponseError extends Error {
  status?: number;
  message: string;
}

export interface IComment {
  id: string;
  commentable_id: string;
  commentable_key: string;
  name: string;
  email: string;
  body: string;
  rating: number;
  reply_id: string;
}
