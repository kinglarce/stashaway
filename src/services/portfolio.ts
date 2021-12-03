import { Plan, PlanService } from "./plan";
/**
 * Types of portfolio types available
 */
export enum PortfolioType {
  HighRisk = "High Risk",
  Retirement = "Retirement",
}
/**
 * Retrieve portfolio type and list of plans
 */
export interface Portfolio {
  portfolioType: PortfolioType;
  plans: Plan[];
}

export class PortfolioService {
  constructor(private portfolios: Portfolio[]) {}
  /**
   * This retrieves the portfolio "data" from the portfolios record
   * by providing the portfolio type.
   * @param portfolioType The portfolio type identifier
   * @returns Either a single portfolio record or undefined
   */
  get(portfolioType: PortfolioType): Portfolio | undefined {
    return this.portfolios.find(
      (portfolio) => portfolio.portfolioType === portfolioType
    );
  }
  /**
   * This retrieves the portfolio "index" from the portfolios record
   * by providing the portfolio type.
   * @param portfolioType The portfolio type identifier
   * @returns Either an index or -1
   */
  getIndex(portfolioType: PortfolioType): number {
    return this.portfolios.findIndex(
      (portfolio) => portfolio.portfolioType === portfolioType
    );
  }
  /**
   * This creates new portfolio record and save it to the storage
   * or update existing portfolio if found.
   * This calls the PlanService for handling the saving of plans
   * before saving it to the portfolio record.
   * @param portfolioType The portfolio type identifier
   * @param plan The plan type and amount to be save
   * @returns All the portfolios recorded
   */
  save(portfolioType: PortfolioType, plan: Plan): Portfolio[] {
    console.log("Debug: Start portfolio");
    if (!this.get(portfolioType)) {
      const data = { portfolioType, plans: [] };
      this.portfolios.push(data);
    }

    const existingPortfolio = this.get(portfolioType);
    const updatedPlans = new PlanService(existingPortfolio?.plans).save(plan);

    const existingPortfolioIndex = this.getIndex(portfolioType);
    this.portfolios[existingPortfolioIndex] = {
      portfolioType,
      plans: updatedPlans,
    };

    console.log("Debug: Done portfolio");
    return this.portfolios;
  }
}
