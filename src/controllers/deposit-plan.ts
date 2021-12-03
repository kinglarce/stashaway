import { Body, Post, Route } from "tsoa";
import {
  DepositPlanInput,
  DepositPlanService,
  DepositPlan,
} from "../services/deposit-plan";

@Route("deposit-plan")
export default class DepositPlanController {
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
