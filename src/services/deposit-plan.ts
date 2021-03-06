import { IPlan } from "./plan";
import { PortfolioType, IPortfolio, PortfolioService } from "./portfolio";
/**
 * Dummy storage data of deposit plans for User
 * Used JSON object for storage to have O(1) of access time
 */
export const DEPOSIT_PLAN: IDepositPlan = {};
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
export interface IDepositPlan {
  [refId: string]: IPortfolio[];
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
export interface IDepositPlanInput extends IPlan {
  refId: string;
  portfolioType: PortfolioType;
}

export class DepositPlanService {
  constructor(private storage: IDepositPlan = DEPOSIT_PLAN) {}
  /**
   * This retrieves the deposit plan object by reference id
   * @param refId The reference id identifier
   * @returns Either a singple deposit plan object or {}
   */
  get(refId: string): IDepositPlan {
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
  save(depositPlanInput: IDepositPlanInput): IDepositPlan {
    const { refId, portfolioType, ...plan } = depositPlanInput;
    if (!refId) {
      throw new Error("Reference ID doesn't exist.");
    }
    if (!this.storage[refId]) {
      this.storage[refId] = [];
    }
    const portfolios = this.storage[refId];
    const updatedPortfolio = new PortfolioService([...portfolios]).build(
      portfolioType,
      plan
    );
    this.storage[refId] = updatedPortfolio;
    return this.storage;
  }
}
