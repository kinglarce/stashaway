interface DepositPlanResponse {
  message: string;
}

export default class DepositPlanController {
  public async getResponse(): Promise<DepositPlanResponse> {
    return {
      message: "Test",
    };
  }
}
