import { Plan } from "./plan";
import { PortfolioType, Portfolio, PortfolioService } from "./portfolio";
/**
 * Dummy storage data of deposit plans for User
 * Used JSON object for storage to have O(1) of access time
 */
export const DEPOSIT_PLAN: DepositPlan = {};
/**
 * Retrieve deposit plans data with its reference ID and portfolios
 *
 * @example {
 *  "JMSBOND007": [
 *    {
 *      "portfolioType": "High Risk",
 *      "plans": [
 *        {
 *          "planType": "One Time",
 *          "amount": 10000
 *        },
 *        {
 *          "planType": "Monthly",
 *          "amount": 0
 *        }
 *      ]
 *    }
 *  ]
 * }
 */
export interface DepositPlan {
  [refId: string]: Portfolio[];
}
/**
 * Expected reference ID, portfolio type, deposit plan type and amount
 *
 * @example {
 *  "refId": "JMSBOND007",
 *  "portfolioType": "High Risk",
 *  "planType": "One Time",
 *  "amount": 10000
 * }
 */
export interface DepositPlanInput extends Plan {
  refId: string;
  portfolioType: PortfolioType;
}

export class DepositPlanService {
  constructor(private storage: DepositPlan = DEPOSIT_PLAN) {}
  /**
   * This retrieves the deposit plan object by reference id
   * @param refId The reference id identifier
   * @returns Either a singple deposit plan object or {}
   */
  get(refId: string): DepositPlan {
    const filtered = Object.keys(this.storage)
      .filter((key) => key === refId)
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: this.storage[key],
        };
      }, {});

    return filtered;
  }
  /**
   * This creates new deposit plan record and save it to storage
   * or update existing deposiplan record if reference ID is found.
   * @param depositPlanInput The desposit plan type, reference ID,
   * portfolio type and amount to be save
   * @returns List of deposit plans recorded
   */
  save(depositPlanInput: DepositPlanInput): DepositPlan {
    const { refId, portfolioType, ...plan } = depositPlanInput;
    if (!this.storage[refId]) {
      this.storage[refId] = [];
    }
    const depositPlanCopy = this.get(refId);
    const updatedPortfolio = new PortfolioService(depositPlanCopy[refId]).build(
      portfolioType,
      plan
    );
    this.storage[refId] = updatedPortfolio;
    return this.storage;
  }
}
