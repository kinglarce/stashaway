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

  find(portfolioType: PortfolioType): Portfolio | undefined {
    return this.portfolios.find(
      (portfolio) => portfolio.portfolioType === portfolioType
    );
  }

  findIndex(portfolioType: PortfolioType): number {
    return this.portfolios.findIndex(
      (portfolio) => portfolio.portfolioType === portfolioType
    );
  }

  save(portfolioType: PortfolioType, plan: Plan): Portfolio[] {
    console.log("Debug: Start portfolio");
    if (!this.find(portfolioType)) {
      const data = { portfolioType, plans: [] };
      this.portfolios.push(data);
    }

    const existingPortfolio = this.find(portfolioType);
    const updatedPlans = new PlanService(existingPortfolio?.plans).save(plan);

    const existingPortfolioIndex = this.findIndex(portfolioType);
    this.portfolios[existingPortfolioIndex] = {
      portfolioType,
      plans: updatedPlans,
    };

    console.log("Debug: Done portfolio");
    return this.portfolios;
  }
}
