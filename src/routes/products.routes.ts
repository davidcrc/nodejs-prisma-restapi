import { Router } from "express";
import { prismaConn } from "../prismaConnection";

const router = Router();

// add endpoints
router.get("/products", async (req, res) => {
  const products = await prismaConn.product.findMany();

  res.json(products);
});

export default router;
