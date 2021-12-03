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
   * This creates new deposit plan record and save it to storage
   * or update existing deposiplan record if reference ID is found.
   * @param depositPlanInput The desposit plan type, reference ID,
   * portfolio type and amount to be save
   * @returns All the deposit plans recorded
   */
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
