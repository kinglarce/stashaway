import { Plan } from "./plan";
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
}
