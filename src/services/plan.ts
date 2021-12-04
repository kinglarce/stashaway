/**
 * Types of deposit plan available
 */
export enum PlanType {
  ONE_TIME = "One Time",
  MONTHLY = "Monthly",
}

/**
 * Metadata for holding Plan data.
 */
export interface IPlan {
  planType: PlanType;
  amount: number;
}

export class PlanService {
  constructor(private plans: IPlan[] = []) {}
  /**
   * This retrieves the plan "data" from the plans record
   * by providing the plan type.
   * @param planType The plan type identifier which is
   * extracted from Plan body parameter
   * @returns Either a single plan record or undefined
   */
  get({ planType }: IPlan): IPlan | undefined {
    return this.plans.find((plan) => plan.planType === planType);
  }
  /**
   * This retrieves all plans.
   * @returns List of plans recorded
   */
  getPlans(): IPlan[] {
    return this.plans;
  }
  /**
   * This build deposit plan data structure.
   * @param plan The plan type and amount to be save
   * @returns List of plans recorded
   */
  build(plan: IPlan): IPlan[] {
    if (this.hasErrorMessage(plan)) {
      throw new Error(this.hasErrorMessage(plan));
    }
    if (!this.hasExisting(plan)) {
      this.plans.push(plan);
    }
    return this.plans.map((current) => {
      if (current.planType === plan.planType) {
        return plan;
      }
      return current;
    });
  }
  /**
   * This retrieves the necessary error message for
   * invalid inputs
   * @param plan The plan type and amount
   * @returns A string of message
   */
  hasErrorMessage(plan: IPlan): string {
    if (!this.isValidAmount(plan.amount)) {
      return "Invalid amount value.";
    }
    if (!this.isValidPlanType(plan.planType)) {
      return "Invalid plan type value.";
    }
    return "";
  }
  /**
   * This check if it has existing plan.
   * @param plan The plan type and amount
   * @returns True/False
   */
  hasExisting(plan: IPlan): boolean {
    return this.get(plan) ? true : false;
  }
  /**
   * This check if the amount is valid and
   * more than zero.
   * @param amount numerical value
   * @returns True/False
   */
  isValidAmount(amount: number): boolean {
    return typeof amount !== "undefined" && amount !== null && amount >= 0;
  }
  /**
   * This check if plan type is valid.
   * @param planType plan type value
   * @returns True/False
   */
  isValidPlanType(planType: PlanType): boolean {
    return planType && Object.values(PlanType).includes(planType)
      ? true
      : false;
  }
}
