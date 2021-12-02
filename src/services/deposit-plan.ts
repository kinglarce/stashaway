import { Plan, PlanType } from "./plan";
import { PortfolioType, Portfolio, PortfolioService } from "./portfolio";
/**
 * Dummy storage data of deposit plans for User
 * Used JSON object for storage to have O(1) of access time
 */
export const DEPOSIT_PLAN: DepositPlan = {};

export interface DepositPlan {
  [refId: string]: Portfolio[];
}

export interface DepositPlanInput extends Plan {
  refId: string;
  portfolioType: PortfolioType;
}

export interface DepositAllocationFund {
  portfolioType: PortfolioType;
  totalAmount: number;
}

export interface DepositFund {
  planType: PlanType;
  totalAmount: number;
}

export class DepositPlanService {
  constructor(private storage: DepositPlan = DEPOSIT_PLAN) {}

  save(depositPlanInput: DepositPlanInput): DepositPlan {
    console.log("Debug: Start deposit plans : ", depositPlanInput);
    const { refId, portfolioType, ...plan } = depositPlanInput;
    if (!this.storage[refId]) {
      this.storage[refId] = [];
    }
    new PortfolioService(this.storage[refId]).save(portfolioType, plan);
    console.log("Debug: Done deposit plans");
    return this.storage;
  }

  getAllocationFunds(refId: string): DepositAllocationFund[] {
    if (!this.storage[refId]) return [];
    const portfolios = this.storage[refId];

    return portfolios.map((portfolio) => ({
      portfolioType: portfolio.portfolioType,
      totalAmount: portfolio.plans
        .map((plan) => plan.amount)
        .reduce((prev, next) => prev + next),
    }));
  }

  getDepositFunds(refId: string): DepositFund[] {
    if (!this.storage[refId]) return [];
    const portfolios = this.storage[refId];

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
