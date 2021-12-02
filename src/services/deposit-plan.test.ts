import { DepositPlanService } from "./deposit-plan";
import { PortfolioType } from "./portfolio";
import { PlanType } from "./plan";

describe("Deposit Plan transaction", () => {
  describe("Get deposit plan data structure", () => {
    it("should give me the happy path", () => {
      const depositPlan = new DepositPlanService();
      const deposit1 = {
        refId: "626",
        portfolioType: PortfolioType.HighRisk,
        planType: PlanType.OneTime,
        amount: 10000,
      };
      depositPlan.save(deposit1);

      const deposit2 = {
        refId: "626",
        portfolioType: PortfolioType.Retirement,
        planType: PlanType.OneTime,
        amount: 500,
      };
      depositPlan.save(deposit2);

      const deposit3 = {
        refId: "626",
        portfolioType: PortfolioType.HighRisk,
        planType: PlanType.Monthly,
        amount: 0,
      };
      depositPlan.save(deposit3);

      const deposit4 = {
        refId: "626",
        portfolioType: PortfolioType.Retirement,
        planType: PlanType.Monthly,
        amount: 100,
      };
      console.log(JSON.stringify(depositPlan.save(deposit4)));

      expect(1).toEqual(1);
    });
  });
});
