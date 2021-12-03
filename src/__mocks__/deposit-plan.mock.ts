import { DepositPlan } from "../services/deposit-plan";

export const mockDepositPlanFull = <DepositPlan>{
  JMSBOND007: [
    {
      portfolioType: "High Risk",
      plans: [
        {
          planType: "One Time",
          amount: 10000,
        },
        {
          planType: "Monthly",
          amount: 0,
        },
      ],
    },
    {
      portfolioType: "Retirement",
      plans: [
        {
          planType: "One Time",
          amount: 500,
        },
        {
          planType: "Monthly",
          amount: 100,
        },
      ],
    },
  ],
};
