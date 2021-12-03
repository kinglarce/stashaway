import express from "express";
import AllocationFundController from "../controllers/allocation-fund";
import DepositPlanController from "../controllers/deposit-plan";
import DepositFundController from "../controllers/deposit-fund";

const router = express.Router();

router.post("/deposit-plan", async (req, res) => {
  const controller = new DepositPlanController();
  const response = await controller.post(req.body);
  return res.send(response);
});

router.get("/allocation-fund/:refId", async (req, res) => {
  const controller = new AllocationFundController();
  const response = await controller.get(req.params.refId);
  if (!response) res.status(404).send({ message: "No record found" });
  return res.send(response);
});

router.get("/deposit-fund/:refId", async (req, res) => {
  const controller = new DepositFundController();
  const response = await controller.get(req.params.refId);
  if (!response) res.status(404).send({ message: "No record found" });
  return res.send(response);
});

export default router;
