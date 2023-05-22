import { Request, Response } from "express";

export type CreateUserRequest = Request<
  {},
  {},
  { name: string; price?: number; stock?: number; categoryId: number }
>;
