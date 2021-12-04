import { DepositFundService } from "./deposit-fund";
import { mockDepositPlanFull } from "../__mocks__/deposit-plan.mock";
import { IDepositPlan } from "./deposit-plan";

describe("DepositFundService", () => {
  describe("get", () => {
    it("should return empty array if refId doesnt exist", () => {
      const depositFundService = new DepositFundService();
      const received = depositFundService.get("023JAMES");
      expect(received).toEqual([]);
    });
    it("should sum up base on plan type", () => {
      const depositFundService = new DepositFundService(
        <IDepositPlan>mockDepositPlanFull
      );
      const expected = [
        {
          planType: "One Time",
          totalAmount: 10500,
        },
        {
          planType: "Monthly",
          totalAmount: 100,
        },
      ];
      const received = depositFundService.get("JMSBOND007");
      expect(received).toEqual(expected);
    });
    it("should not sum up different portfolio with different plan type", () => {
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
          {
            portfolioType: "Retirement",
            plans: [
              {
                planType: "Monthly",
                amount: 100,
              },
            ],
          },
        ],
      };
      const depositFundService = new DepositFundService(existingDepositPlan);
      const expected = [
        {
          planType: "One Time",
          totalAmount: 10000,
        },
        {
          planType: "Monthly",
          totalAmount: 100,
        },
      ];
      const received = depositFundService.get("JMSBOND007");
      expect(received).toEqual(expected);
    });
  });
});
