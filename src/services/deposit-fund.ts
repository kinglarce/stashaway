import { IDepositPlan, DEPOSIT_PLAN } from "./deposit-plan";
import { IPlanType } from "./plan";
import { IPortfolio } from "./portfolio";
/**
 * Retrieve plan type and the total sum amount
 *
 * @example {
 *  "planType": "One Time",
 *  "totalAmount": 10000
 * }
 */
export interface IDepositFund {
  planType: IPlanType;
  totalAmount: number;
}

export class DepositFundService {
  constructor(private storage: IDepositPlan = DEPOSIT_PLAN) {}
  /**
   * This retrieves the deposit funds that is summed up
   * by plan type.
   * @param refId The reference id identifier
   * @returns The list deposit fund object which has the
   * plan type and total summed amount
   */
  get(refId: string): IDepositFund[] {
    if (!this.storage[refId]) return [];
    const portfolios: IPortfolio[] = this.storage[refId];

    const data = [];
    for (const planType of Object.values(IPlanType)) {
      data.push(this.getDepositFundByPlanType(portfolios, planType));
    }

    return data;
  }
  /**
   * This retrieves the deposit fund that is summed up
   * by plan type.
   * @param portfolios The list of existing portfolios recorded
   * @param planType The plan type identifier
   * @returns The list of deposit fund object which has the
   * plan type and total summed amount
   */
  getDepositFundByPlanType(
    portfolios: IPortfolio[],
    planType: IPlanType
  ): IDepositFund {
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
