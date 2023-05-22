import { Router } from "express";
import { prismaConn } from "../prismaConnection";

const router = Router();

// add endpoints
router.get("/categories", async (req, res) => {
  const categories = await prismaConn.category.findMany();

  res.json(categories);
});

export default router;
