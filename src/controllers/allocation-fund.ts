import { Get, Path, Route } from "tsoa";
import {
  AllocationFund,
  AllocationFundService,
} from "../services/allocation-fund";

@Route("allocation-fund")
export default class AllocationFundController {
  @Get("/:refId")
  public async getAllocationFund(
    @Path() refId: string
  ): Promise<AllocationFund[]> {
    return new AllocationFundService().get(refId);
  }
}
