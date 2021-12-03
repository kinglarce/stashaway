import { Get, Path, Route } from "tsoa";
import { IDepositFund, DepositFundService } from "../services/deposit-fund";

@Route("deposit-fund")
export default class DepositFundController {
  /**
   * This will return a list of deposit funds determined by reference id.
   * @summary Retrieve a list of deposit funds
   */
  @Get("/:refId")
  public async get(@Path() refId: string): Promise<IDepositFund[]> {
    return new DepositFundService().get(refId);
  }
}
