import express from "express";
import DepositPlan from "./deposit-plan.router";

const router = express.Router();

router.use("/deposit-plan", DepositPlan);

export default router;
