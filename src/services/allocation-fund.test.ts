import { AllocationFundService } from "./allocation-fund";
import { mockDepositPlanFull } from "../__mocks__/deposit-plan.mock";

describe("AllocationFundService", () => {
  describe("getAllocationFunds", () => {
    it("should return empty array if refId doesnt exist", () => {
      const AllocationFund = new AllocationFundService();
      const result = AllocationFund.get("023JAMES");
      expect(result).toEqual([]);
    });
    it("should return empty array if refId doesnt match", () => {
      const mockData = mockDepositPlanFull;
      const AllocationFund = new AllocationFundService(mockData);
      const result = AllocationFund.get("023JAMES");
      expect(result).toEqual([]);
    });
  });
});
