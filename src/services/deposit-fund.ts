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

    const data = [];
    for (const planType of Object.values(PlanType)) {
      data.push(this.getDepositFundByPlanType(portfolios, planType));
    }

    return data;
  }

  getDepositFundByPlanType(
    portfolios: Portfolio[],
    planType: PlanType
  ): DepositFund {
    return {
      planType,
      totalAmount: portfolios
        .flatMap((portfolio) => portfolio.plans)
        .filter((plan) => plan.planType === planType)
        .map((plan) => plan.amount)
        .reduce((prev, next) => prev + next),
    };
  }
}
