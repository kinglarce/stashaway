import { PlanService, IPlanType } from "./plan";

describe("PlanService", () => {
  describe("buildPlanDataStructure", () => {
    it("should insert new plan if it doesnt exist", () => {
      const mockData = {
        planType: IPlanType.OneTime,
        amount: 100,
      };
      const expected = [mockData];
      const planService = new PlanService();
      expect(planService.build(mockData)).toEqual(expected);
    });
    it("should update the plan if it already exist to prevent duplication", () => {
      const mockExistingData = [
        {
          planType: IPlanType.OneTime,
          amount: 100,
        },
      ];
      const mockDataUpdated = {
        planType: IPlanType.OneTime,
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
          planType: IPlanType.OneTime,
          amount: 100,
        },
      ];
      const mockData = {
        planType: IPlanType.Monthly,
        amount: 50,
      };
      const expected = [
        {
          planType: IPlanType.OneTime,
          amount: 100,
        },
        {
          planType: IPlanType.Monthly,
          amount: 50,
        },
      ];
      const planService = new PlanService(mockExistingData);
      expect(planService.build(mockData)).toEqual(expected);
    });
    it("should allow zero amount", () => {
      const mockData = {
        planType: IPlanType.OneTime,
        amount: 0,
      };
      const expected = [mockData];
      const planService = new PlanService();
      expect(planService.build(mockData)).toEqual(expected);
    });
    it("should not allow negative amount", () => {
      const mockData = {
        planType: IPlanType.Monthly,
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
    it("should not accept 'null' plan type", () => {
      const mockData = {
        planType: null,
        amount: 0,
      };
      const planService = new PlanService();
      try {
        planService.build(mockData);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((<Error>error).message).toBe("Invalid plan type value.");
      }
    });
    it("should not accept 'undefined' plan type", () => {
      const mockData = {
        planType: undefined,
        amount: 0,
      };
      const planService = new PlanService();
      try {
        planService.build(mockData);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((<Error>error).message).toBe("Invalid plan type value.");
      }
    });
  });
});
