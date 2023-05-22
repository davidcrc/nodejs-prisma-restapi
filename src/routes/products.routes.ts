import { Router } from "express";

const router = Router();

// add endpoints
router.get("/products", (req, res) => {
  res.send("here products");
});

export default router;
