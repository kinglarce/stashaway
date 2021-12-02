import { DepositPlan, DEPOSIT_PLAN } from "./deposit-plan";
import { Portfolio, PortfolioType } from "./portfolio";

export interface AllocationFund {
  portfolioType: PortfolioType;
  totalAmount: number;
}

export class AllocationFundService {
  constructor(private storage: DepositPlan = DEPOSIT_PLAN) {}

  get(refId: string): AllocationFund[] {
    if (!this.storage[refId]) return [];
    const portfolios: Portfolio[] = this.storage[refId];

    return portfolios.map((portfolio) => ({
      portfolioType: portfolio.portfolioType,
      totalAmount: portfolio.plans
        .map((plan) => plan.amount)
        .reduce((prev, next) => prev + next),
    }));
  }
}
