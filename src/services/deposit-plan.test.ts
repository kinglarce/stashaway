import { DepositPlanService } from "./deposit-plan";
import { PortfolioType } from "./portfolio";
import { PlanType } from "./plan";
import { mockDepositPlanFull } from "../__mocks__/deposit-plan.mock";

describe("DepositPlanService", () => {
  describe("Validation deposit plan data structure", () => {
    it("should give me the happy path", () => {
      const DepositPlan = new DepositPlanService();
      const deposit1 = {
        refId: "JMSBOND007",
        portfolioType: PortfolioType.HighRisk,
        planType: PlanType.OneTime,
        amount: 10000,
      };
      DepositPlan.save(deposit1);

      const deposit2 = {
        refId: "JMSBOND007",
        portfolioType: PortfolioType.Retirement,
        planType: PlanType.OneTime,
        amount: 500,
      };
      DepositPlan.save(deposit2);

      const deposit3 = {
        refId: "JMSBOND007",
        portfolioType: PortfolioType.HighRisk,
        planType: PlanType.Monthly,
        amount: 0,
      };
      DepositPlan.save(deposit3);

      const deposit4 = {
        refId: "JMSBOND007",
        portfolioType: PortfolioType.Retirement,
        planType: PlanType.Monthly,
        amount: 100,
      };
      DepositPlan.save(deposit4);

      const recordedDepositPlan = DepositPlan.get("JMSBOND007");
      expect(recordedDepositPlan).toEqual(mockDepositPlanFull);
    });
  });
});
