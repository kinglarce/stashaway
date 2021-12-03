import { DepositPlan, DEPOSIT_PLAN } from "./deposit-plan";
import { Portfolio, PortfolioType } from "./portfolio";
/**
 * Retrieve portfolio type and the total sum amount
 *
 * @example {
 *  "portfolioType": "High Risk",
 *  "totalAmount": 10000
 * }
 */
export interface AllocationFund {
  portfolioType: PortfolioType;
  totalAmount: number;
}

export class AllocationFundService {
  constructor(private storage: DepositPlan = DEPOSIT_PLAN) {}
  /**
   * This retrieves the allocation funds that is summed up
   * by portfolio type.
   * @param refId The reference id identifier
   * @returns The list of allocation fund object which has
   * portfolio type and total summed amount
   */
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
