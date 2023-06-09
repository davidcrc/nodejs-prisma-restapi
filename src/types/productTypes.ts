import { Request } from "express";

export type CreateProductRequest = Request<
  {},
  {},
  { name: string; price?: number; stock?: number; categoryId: number }
>;
