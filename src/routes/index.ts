import express from "express";
import AllocationFundController from "../controllers/allocation-fund";
import DepositPlanController from "../controllers/deposit-plan";
import DepositFundController from "../controllers/deposit-fund";

const router = express.Router();

router.get("/deposit-plan", async (_req, res) => {
  const controller = new DepositPlanController();
  const response = await controller.getResponse();
  return res.send(response);
});

router.post("/deposit-plan", async (req, res) => {
  const controller = new DepositPlanController();
  const response = await controller.createDepositPlan(req.body);
  return res.send(response);
});

router.get("/allocation-fund/:id", async (req, res) => {
  const controller = new AllocationFundController();
  const response = await controller.getAllocationFund(req.params.id);
  if (!response) res.status(404).send({ message: "No record found" });
  return res.send(response);
});

router.get("/deposit-fund/:id", async (req, res) => {
  const controller = new DepositFundController();
  const response = await controller.getDepositFund(req.params.id);
  if (!response) res.status(404).send({ message: "No record found" });
  return res.send(response);
});

export default router;
