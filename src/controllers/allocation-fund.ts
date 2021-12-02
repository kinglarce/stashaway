import { Get, Path, Route } from "tsoa";
import {
  AllocationFund,
  AllocationFundService,
} from "../services/allocation-fund";

@Route("allocation-fund")
export default class AllocationFundController {
  @Get("/:id")
  public async getAllocationFund(
    @Path() id: string
  ): Promise<AllocationFund[]> {
    return new AllocationFundService().get(id);
  }
}
