import { Get, Route } from "tsoa";

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
}
