import { Request, Response } from "express";
import asyncHandler from "../middlewares/async.middleware";
import { addressService } from "../services/address.services";
import { appSuccsess } from "../utils/response";
import { addressLogger } from "../utils/logger";

export class Addresses {
  private Address = new addressService();
  createAddress = asyncHandler(async (req: Request, res: Response) => {
    const address = await this.Address.addressCreate(req);
    appSuccsess(201, "create address succsessfully", res, address);
    addressLogger.info("create address succsessfully");
  });

  updateAddress = asyncHandler(async (req: Request, res: Response) => {
    const address = await this.Address.updateAddress(req);
    appSuccsess(201, "update address succsessfully", res, address);
    addressLogger.info("update address succsessfully");
  });
  updateAddressDefault = asyncHandler(async (req: Request, res: Response) => {
    const address = await this.Address.updateDefaultAddress(req);
    appSuccsess(201, "select default address  succsessfully", res, address);
    addressLogger.info("select default address  succsessfully");
  });
  deleteAddress = asyncHandler(async (req: Request, res: Response) => {
    const address = await this.Address.deleteAddress(req);
    appSuccsess(201, "delete address succsessfully", res, address);
    addressLogger.info("delete address succsessfully");
  });
}
