import { IPlan, PlanService } from "./plan";
/**
 * Types of portfolio types available
 */
export enum PortfolioType {
  HIGH_RISK = "High Risk",
  RETIREMENT = "Retirement",
}
/**
 * Retrieve portfolio type and list of plans
 */
export interface IPortfolio {
  portfolioType: PortfolioType;
  plans: IPlan[];
}

export class PortfolioService {
  constructor(private portfolios: IPortfolio[]) {}
  /**
   * This retrieves the portfolio "data" from the portfolios record
   * by providing the portfolio type.
   * @param portfolioType The portfolio type identifier
   * @returns Either a single portfolio record or undefined
   */
  get(portfolioType: PortfolioType): IPortfolio | undefined {
    return this.portfolios.find(
      (portfolio) => portfolio.portfolioType === portfolioType
    );
  }
  /**
   * This retrieves all portfolios.
   * @returns List of portfolios recorded
   */
  getPortfolios(): IPortfolio[] {
    return this.portfolios;
  }
  /**
   * This build portfolio data structure.
   * @param portfolioType The portfolio type identifier
   * @param plan The plan type and amount to be save
   * @returns List of portfolios recorded
   */
  build(portfolioType: PortfolioType, plan: IPlan): IPortfolio[] {
    if (!this.get(portfolioType)) {
      const data = { portfolioType, plans: [] };
      this.portfolios.push(data);
    }
    return this.portfolios.map((current) => {
      if (current.portfolioType === portfolioType) {
        return {
          portfolioType,
          plans: this.getUpdatedPlans(portfolioType, plan),
        };
      }
      return current;
    });
  }
  /**
   * This create and retrieves updated plans data structure by
   * providing plan input data and portfolio type.
   * @param portfolioType The portfolio type identifier
   * @param plan The plan type and amount to be save
   * @returns List of plans recorded
   */
  getUpdatedPlans(portfolioType: PortfolioType, plan: IPlan) {
    const existingPortfolio = this.get(portfolioType);
    const existingPlans = existingPortfolio?.plans;
    return new PlanService(existingPlans).build(plan);
  }
}
