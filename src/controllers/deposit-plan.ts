import { Body, Get, Post, Route } from "tsoa";
import {
  DepositPlanInput,
  DepositPlanService,
  DepositPlan,
} from "../services/deposit-plan";

/**
 * Expose what's the available interface
 */
interface DepositPlanResponse {
  message: string;
}

@Route("deposit-plan")
export default class DepositPlanController {
  /**
   * Retrieve a sample message from Controller
   */
  @Get("/")
  public async getResponse(): Promise<DepositPlanResponse> {
    return {
      message: "Test",
    };
  }
  /**
   * This will save the deposit plan and return the list of records.
   * @summary Save deposit plan and retrieve data recorded
   */
  @Post("/")
  public async createDepositPlan(
    @Body() body: DepositPlanInput
  ): Promise<DepositPlan> {
    return new DepositPlanService().save(body);
  }
}
