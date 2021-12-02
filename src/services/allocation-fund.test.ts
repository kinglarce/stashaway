import { AllocationFundService } from "./allocation-fund";
import { depositPlanFullScenario } from "../__mocks__/deposit-plan.mock";
import { DepositPlan } from "./deposit-plan";

describe("AllocationFundService", () => {
  describe("getAllocationFunds", () => {
    it("should return empty array if refId doesnt exist", () => {
      const AllocationFund = new AllocationFundService();
      const result = AllocationFund.get("007JAMES");
      expect(result).toEqual([]);
    });
    it("should return empty array if refId doesnt match", () => {
      const mockData = <DepositPlan>depositPlanFullScenario;
      const AllocationFund = new AllocationFundService(mockData);
      const result = AllocationFund.get("007JAMES");
      expect(result).toEqual([]);
    });
  });
});
