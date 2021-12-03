import { Body, Post, Route } from "tsoa";
import {
  IDepositPlanInput,
  DepositPlanService,
  IDepositPlan,
} from "../services/deposit-plan";

@Route("deposit-plan")
export default class DepositPlanController {
  /**
   * This will save the deposit plan and return the list of records.
   * @summary Save deposit plan and retrieve data recorded
   */
  @Post("/")
  public async post(@Body() body: IDepositPlanInput): Promise<IDepositPlan> {
    return new DepositPlanService().save(body);
  }
}
