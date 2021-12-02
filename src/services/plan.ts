export enum PlanType {
  OneTime = "One Time",
  Monthly = "Monthly",
}

export interface Plan {
  planType: PlanType;
  amount: number;
}

export class PlanService {
  constructor(private plans: Plan[] = []) {}

  get({ planType }: Plan): Plan | undefined {
    return this.plans.find((plan) => plan.planType === planType);
  }

  getIndex({ planType }: Plan): number {
    return this.plans.findIndex((plan) => plan.planType === planType);
  }

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
