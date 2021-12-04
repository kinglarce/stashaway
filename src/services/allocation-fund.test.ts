import { AllocationFundService } from "./allocation-fund";
import { mockDepositPlanFull } from "../__mocks__/deposit-plan.mock";
import { IDepositPlan } from "./deposit-plan";

describe("AllocationFundService", () => {
  describe("get", () => {
    it("should return empty array if reference id doesnt exist", () => {
      const allocationFundService = new AllocationFundService();
      const result = allocationFundService.get("023JAMES");
      expect(result).toEqual([]);
    });
    it("should sum up base on portfolio", () => {
      const allocationFundService = new AllocationFundService(
        <IDepositPlan>mockDepositPlanFull
      );
      const expected = [
        {
          portfolioType: "High Risk",
          totalAmount: 10000,
        },
        {
          portfolioType: "Retirement",
          totalAmount: 600,
        },
      ];
      const received = allocationFundService.get("JMSBOND007");
      expect(received).toEqual(expected);
    });
    it("should not sum if its only one record", () => {
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
      const allocationFundService = new AllocationFundService(
        existingDepositPlan
      );
      const expected = [
        {
          portfolioType: "High Risk",
          totalAmount: 10000,
        },
      ];
      const received = allocationFundService.get("JMSBOND007");
      expect(received).toEqual(expected);
    });
  });
});
