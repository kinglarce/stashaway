import { AllocationFundService } from "./allocation-fund";
import { DepositPlanService } from "./deposit-plan";
import { PortfolioType } from "./portfolio";
import { PlanType } from "./plan";
import { DepositFundService } from "./deposit-fund";

describe("Deposit Plan transaction", () => {
  describe("Get deposit plan data structure", () => {
    it("should give me the happy path", () => {
      const DepositPlan = new DepositPlanService();
      const deposit1 = {
        refId: "626",
        portfolioType: PortfolioType.HighRisk,
        planType: PlanType.OneTime,
        amount: 10000,
      };
      DepositPlan.save(deposit1);

      const deposit2 = {
        refId: "626",
        portfolioType: PortfolioType.Retirement,
        planType: PlanType.OneTime,
        amount: 500,
      };
      DepositPlan.save(deposit2);

      const deposit3 = {
        refId: "626",
        portfolioType: PortfolioType.HighRisk,
        planType: PlanType.Monthly,
        amount: 0,
      };
      DepositPlan.save(deposit3);

      const deposit4 = {
        refId: "626",
        portfolioType: PortfolioType.Retirement,
        planType: PlanType.Monthly,
        amount: 100,
      };
      console.log(JSON.stringify(DepositPlan.save(deposit4)));

      const AllocationFund = new AllocationFundService();
      console.log(JSON.stringify(AllocationFund.get("626")));

      const DepositFund = new DepositFundService();
      console.log("Fund Depo : ", JSON.stringify(DepositFund.get("626")));

      expect(1).toEqual(1);
    });
  });
});
