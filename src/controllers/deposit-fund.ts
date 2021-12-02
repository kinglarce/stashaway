import { Get, Path, Route } from "tsoa";
import { DepositFund, DepositFundService } from "../services/deposit-fund";

@Route("deposit-fund")
export default class DepositFundController {
  @Get("/:id")
  public async getDepositFund(@Path() id: string): Promise<DepositFund[]> {
    return new DepositFundService().get(id);
  }
}
