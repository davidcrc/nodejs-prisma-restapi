import { Router } from "express";

const router = Router();

// add endpoints
router.get("/categories", (req, res) => {
  res.send("here categories");
});

export default router;
