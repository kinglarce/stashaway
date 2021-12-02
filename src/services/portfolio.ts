import { Plan, PlanService } from "./plan";

export enum PortfolioType {
  HighRisk = "High Risk",
  Retirement = "Retirement",
}

export interface Portfolio {
  portfolioType: PortfolioType;
  plans: Plan[];
}

export class PortfolioService {
  constructor(private portfolios: Portfolio[]) {}

  get(portfolioType: PortfolioType): Portfolio | undefined {
    return this.portfolios.find(
      (portfolio) => portfolio.portfolioType === portfolioType
    );
  }

  getIndex(portfolioType: PortfolioType): number {
    return this.portfolios.findIndex(
      (portfolio) => portfolio.portfolioType === portfolioType
    );
  }

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
