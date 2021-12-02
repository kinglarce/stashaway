import express from "express";
import DepositPlanController from "../controllers/deposit-plan";

const router = express.Router();

router.get("/deposit-plan", async (_req, res) => {
  const controller = new DepositPlanController();
  const response = await controller.getResponse();
  return res.send(response);
});

export default router;
