import { IPlan, PlanService, PlanType } from "./plan";

describe("PlanService", () => {
  describe("build", () => {
    it("should insert new plan if it doesnt exist", () => {
      const mockData = {
        planType: PlanType.ONE_TIME,
        amount: 100,
      };
      const expected = [mockData];
      const planService = new PlanService();
      expect(planService.build(mockData)).toEqual(expected);
    });
    it("should update the plan if it already exist to prevent duplication", () => {
      const mockExistingData = [
        {
          planType: PlanType.ONE_TIME,
          amount: 100,
        },
      ];
      const mockDataUpdated = {
        planType: PlanType.ONE_TIME,
        amount: 200,
      };
      const expected = [
        {
          planType: "One Time",
          amount: 200,
        },
      ];
      const planService = new PlanService(mockExistingData);
      expect(planService.build(mockDataUpdated)).toEqual(expected);
    });
    it("should add new record if plan type is different", () => {
      const mockExistingData = [
        {
          planType: PlanType.ONE_TIME,
          amount: 100,
        },
      ];
      const mockData = {
        planType: PlanType.MONTHLY,
        amount: 50,
      };
      const expected = [
        {
          planType: PlanType.ONE_TIME,
          amount: 100,
        },
        {
          planType: PlanType.MONTHLY,
          amount: 50,
        },
      ];
      const planService = new PlanService(mockExistingData);
      expect(planService.build(mockData)).toEqual(expected);
    });
    it("should allow zero amount", () => {
      const mockData = {
        planType: PlanType.ONE_TIME,
        amount: 0,
      };
      const expected = [mockData];
      const planService = new PlanService();
      expect(planService.build(mockData)).toEqual(expected);
    });
    it("should not allow negative amount", () => {
      const mockData = {
        planType: PlanType.MONTHLY,
        amount: -1,
      };
      const planService = new PlanService();
      try {
        planService.build(mockData);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((<Error>error).message).toBe("Invalid amount value.");
      }
    });
    it("should not allow no plan data", () => {
      const mockData = <IPlan>{};
      const planService = new PlanService();
      try {
        planService.build(mockData);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((<Error>error).message).toBe("Invalid amount value.");
      }
    });
  });
});
