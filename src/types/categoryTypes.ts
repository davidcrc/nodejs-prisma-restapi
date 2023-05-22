import { Request } from "express";

export type CreateCategoryRequest = Request<
  {},
  {},
  { name: string; price?: number; stock?: number; categoryId: number }
>;
