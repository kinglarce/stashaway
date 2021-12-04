import { Get, Path, Route } from "tsoa";
import {
  IAllocationFund,
  AllocationFundService,
} from "../services/allocation-fund";

@Route("allocation-fund")
export default class AllocationFundController {
  /**
   * This will return a list of allocation funds determined by reference id.
   * @summary Retrieve a list of allocation funds
   */
  @Get("/:refId")
  public async getAllocationFund(
    @Path() refId: string
  ): Promise<IAllocationFund[]> {
    return new AllocationFundService().get(refId);
  }
}
