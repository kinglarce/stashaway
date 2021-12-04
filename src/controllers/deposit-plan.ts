import { Body, Get, Path, Post, Route } from "tsoa";
import {
  IDepositPlanInput,
  DepositPlanService,
  IDepositPlan,
} from "../services/deposit-plan";

@Route("deposit-plan")
export default class DepositPlanController {
  /**
   * This will return a list of deposit plan determined by reference id.
   * @summary Retrieve all deposit plan recorded
   */
  @Get("/:refId")
  public async getDepositPlan(@Path() refId: string): Promise<IDepositPlan> {
    return new DepositPlanService().get(refId);
  }
  /**
   * This will save the deposit plan and return the list of records.
   * @summary Save deposit plan and retrieve data recorded
   */
  @Post("/")
  public async createDepositPlan(
    @Body() body: IDepositPlanInput
  ): Promise<IDepositPlan> {
    return new DepositPlanService().save(body);
  }
}
