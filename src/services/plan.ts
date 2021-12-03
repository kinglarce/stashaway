/**
 * Types of deposit plan available
 */
export enum PlanType {
  OneTime = "One Time",
  Monthly = "Monthly",
}

/**
 * Metadata for holding Plan data.
 */
export interface Plan {
  planType: PlanType;
  amount: number;
}

export class PlanService {
  constructor(private plans: Plan[] = []) {}
  /**
   * This retrieves the plan "data" from the plans record
   * by providing the plan type.
   * @param planType The plan type identifier which is
   * extracted from Plan body parameter
   * @returns Either a single plan record or undefined
   */
  get({ planType }: Plan): Plan | undefined {
    return this.plans.find((plan) => plan.planType === planType);
  }
  /**
   * This retrieves all plans.
   * @returns List of plans recorded
   */
  getPlans(): Plan[] {
    return this.plans;
  }
  /**
   * This build deposit plan data structure.
   * @param plan The plan type and amount to be save
   * @returns List of plans recorded
   */
  build(plan: Plan): Plan[] {
    try {
      if (!this.get(plan)) {
        this.plans.push(plan);
      }
      return this.plans.map((current) => {
        if (current.planType === plan.planType) {
          return plan;
        }
        return current;
      });
    } catch (e) {
      console.error(e);
    }
  }
}
