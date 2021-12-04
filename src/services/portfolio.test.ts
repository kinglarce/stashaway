import { IPlan, PlanType } from "./plan";
import { PortfolioService, PortfolioType } from "./portfolio";

describe("PortfolioService", () => {
  const mockPlan = {
    planType: PlanType.ONE_TIME,
    amount: 100,
  };
  describe("build", () => {
    it("should add new portfolio if its doesnt exist", () => {
      const portfolioService = new PortfolioService();
      const expected = [
        {
          portfolioType: PortfolioType.HIGH_RISK,
          plans: [mockPlan],
        },
      ];
      const received = portfolioService.build(
        PortfolioType.HIGH_RISK,
        mockPlan
      );
      expect(received).toEqual(expected);
    });
    it("should add new portfolio if it doesnt match to existing one", () => {
      const existingPortfolio = [
        {
          portfolioType: PortfolioType.HIGH_RISK,
          plans: [mockPlan],
        },
      ];
      const newMockPlan = {
        planType: PlanType.ONE_TIME,
        amount: 500,
      };
      const expected = [
        {
          portfolioType: PortfolioType.HIGH_RISK,
          plans: [mockPlan],
        },
        {
          portfolioType: PortfolioType.RETIREMENT,
          plans: [newMockPlan],
        },
      ];
      const portfolioService = new PortfolioService(existingPortfolio);
      const received = portfolioService.build(
        PortfolioType.RETIREMENT,
        newMockPlan
      );
      expect(received).toEqual(expected);
    });
    it("should insert plan to existing portfolio if it exist", () => {
      const existingPortfolio = [
        {
          portfolioType: PortfolioType.HIGH_RISK,
          plans: [mockPlan],
        },
      ];
      const newMockPlan = {
        planType: PlanType.MONTHLY,
        amount: 100,
      };
      const expected = [
        {
          portfolioType: PortfolioType.HIGH_RISK,
          plans: [mockPlan, newMockPlan],
        },
      ];
      const portfolioService = new PortfolioService(existingPortfolio);
      const received = portfolioService.build(
        PortfolioType.HIGH_RISK,
        newMockPlan
      );
      expect(received).toEqual(expected);
    });
    it("should not allow no amount data", () => {
      const portfolioService = new PortfolioService();
      try {
        portfolioService.build(PortfolioType.HIGH_RISK, <IPlan>{});
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((<Error>error).message).toBe("Invalid amount value.");
      }
    });
  });
});
