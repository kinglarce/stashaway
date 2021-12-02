import { DepositPlan, DEPOSIT_PLAN } from "./deposit-plan";
import { PlanType } from "./plan";
import { Portfolio } from "./portfolio";

export interface DepositFund {
  planType: PlanType;
  totalAmount: number;
}

export class DepositFundService {
  constructor(private storage: DepositPlan = DEPOSIT_PLAN) {}

  get(refId: string): DepositFund[] {
    if (!this.storage[refId]) return [];
    const portfolios: Portfolio[] = this.storage[refId];

    return Object.values(PlanType).map((planType) => ({
      planType,
      totalAmount: portfolios
        .flatMap((portfolio) => portfolio.plans)
        .filter((plan) => plan.planType === planType)
        .map((plan) => plan.amount)
        .reduce((prev, next) => prev + next),
    }));
  }
}
