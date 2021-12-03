import { Get, Path, Route } from "tsoa";
import { DepositFund, DepositFundService } from "../services/deposit-fund";

@Route("deposit-fund")
export default class DepositFundController {
  @Get("/:refId")
  public async getDepositFund(@Path() refId: string): Promise<DepositFund[]> {
    return new DepositFundService().get(refId);
  }
}
