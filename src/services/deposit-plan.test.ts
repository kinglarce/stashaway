import {
  DepositPlanService,
  IDepositPlan,
  IDepositPlanInput,
} from "./deposit-plan";
import { PortfolioType } from "./portfolio";
import { PlanType } from "./plan";
import { mockDepositPlanFull } from "../__mocks__/deposit-plan.mock";

describe("DepositPlanService", () => {
  describe("get", () => {
    it("should retrieve record if existed", () => {
      const existingDepositPlan = <IDepositPlan>{
        JMSBOND007: [
          {
            portfolioType: "High Risk",
            plans: [
              {
                planType: "One Time",
                amount: 10000,
              },
            ],
          },
        ],
      };
      const depositPlanService = new DepositPlanService(existingDepositPlan);
      const received = depositPlanService.get("JMSBOND007");
      expect(received).toEqual(existingDepositPlan);
    });
    it("should not retrieve a if it doesnt match", () => {
      const existingDepositPlan = <IDepositPlan>{
        JMSBOND007: [
          {
            portfolioType: "High Risk",
            plans: [
              {
                planType: "One Time",
                amount: 10000,
              },
            ],
          },
        ],
      };
      const depositPlanService = new DepositPlanService(existingDepositPlan);
      const received = depositPlanService.get("CASINOROYAL01");
      expect(received).toEqual({});
    });
  });
  describe("save", () => {
    it("should record a high risk and one time deposit plan", () => {
      const depositPlanService = new DepositPlanService({});
      const mockData = {
        refId: "JMSBOND007",
        portfolioType: PortfolioType.HIGH_RISK,
        planType: PlanType.ONE_TIME,
        amount: 10000,
      };
      const expected = {
        JMSBOND007: [
          {
            portfolioType: "High Risk",
            plans: [
              {
                planType: "One Time",
                amount: 10000,
              },
            ],
          },
        ],
      };
      depositPlanService.save(mockData);
      const received = depositPlanService.get("JMSBOND007");
      expect(received).toEqual(expected);
    });
    it("should give me the happy path", () => {
      const depositPlanService = new DepositPlanService({});
      const deposit1 = {
        refId: "JMSBOND007",
        portfolioType: PortfolioType.HIGH_RISK,
        planType: PlanType.ONE_TIME,
        amount: 10000,
      };
      depositPlanService.save(deposit1);

      const deposit2 = {
        refId: "JMSBOND007",
        portfolioType: PortfolioType.RETIREMENT,
        planType: PlanType.ONE_TIME,
        amount: 500,
      };
      depositPlanService.save(deposit2);

      const deposit3 = {
        refId: "JMSBOND007",
        portfolioType: PortfolioType.HIGH_RISK,
        planType: PlanType.MONTHLY,
        amount: 0,
      };
      depositPlanService.save(deposit3);

      const deposit4 = {
        refId: "JMSBOND007",
        portfolioType: PortfolioType.RETIREMENT,
        planType: PlanType.MONTHLY,
        amount: 100,
      };
      depositPlanService.save(deposit4);

      const received = depositPlanService.get("JMSBOND007");
      expect(received).toEqual(mockDepositPlanFull);
    });
    it("should not persist data if amount is invalid", () => {
      const depositPlanService = new DepositPlanService({});
      const mockData = {
        refId: "JMSBOND007",
        portfolioType: PortfolioType.HIGH_RISK,
        planType: PlanType.ONE_TIME,
        amount: -1,
      };
      const expected = {
        JMSBOND007: [],
      };
      try {
        depositPlanService.save(mockData);
      } catch (error) {
        const received = depositPlanService.get("JMSBOND007");
        expect(received).toEqual(expected);
        expect(error).toBeInstanceOf(Error);
        expect((<Error>error).message).toBe("Invalid amount value.");
      }
    });
    it("should not persist data if plan type is invalid", () => {
      const depositPlanService = new DepositPlanService({});
      const mockData = <IDepositPlanInput>{
        refId: "JMSBOND007",
        portfolioType: PortfolioType.HIGH_RISK,
        amount: 0,
      };
      const expected = {
        JMSBOND007: [],
      };
      try {
        depositPlanService.save(mockData);
      } catch (error) {
        const received = depositPlanService.get("JMSBOND007");
        expect(received).toEqual(expected);
        expect(error).toBeInstanceOf(Error);
        expect((<Error>error).message).toBe("Invalid plan type value.");
      }
    });
    it("should not persist data if portfolio type is invalid", () => {
      const depositPlanService = new DepositPlanService({});
      const mockData = <IDepositPlanInput>{
        refId: "JMSBOND007",
        planType: PlanType.ONE_TIME,
        amount: 0,
      };
      const expected = {
        JMSBOND007: [],
      };
      try {
        depositPlanService.save(mockData);
      } catch (error) {
        const received = depositPlanService.get("JMSBOND007");
        expect(received).toEqual(expected);
        expect(error).toBeInstanceOf(Error);
        expect((<Error>error).message).toBe("Invalid portfolio type value.");
      }
    });
    it("should not create a placeholder if reference id doesnt exist", () => {
      const depositPlanService = new DepositPlanService({});
      try {
        depositPlanService.save(<IDepositPlanInput>{});
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((<Error>error).message).toBe("Reference ID doesn't exist.");
      }
    });
  });
});
