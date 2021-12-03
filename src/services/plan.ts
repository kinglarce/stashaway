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
   * This retrieves the plan "index" from the plans record
   * by providing the plan type.
   * @param planType The plan type identifier which is
   * extracted from Plan body parameter
   * @returns Either an index or -1
   */
  getIndex({ planType }: Plan): number {
    return this.plans.findIndex((plan) => plan.planType === planType);
  }
  /**
   * This creates new plan record and save it to the storage
   * or update existing plan if found.
   * @param plan The plan type and amount to be save
   * @returns All the plans recorded
   */
  save(plan: Plan): Plan[] {
    console.log("Debug: Start plans");
    if (!this.get(plan)) {
      this.plans.push(plan);
    }
    const existingPlanIndex = this.getIndex(plan);
    this.plans[existingPlanIndex] = plan;
    console.log("Debug: Done plans");
    return this.plans;
  }
}
