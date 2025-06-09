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
    addressLogger.info("Create address succsessfully");
  });

  updateAddress = asyncHandler(async (req: Request, res: Response) => {
    const address = await this.Address.updateAddress(req);
    appSuccsess(201, "update address succsessfully", res, address);
    addressLogger.info("Update address succsessfully");
  });
  updateAddressDefault = asyncHandler(async (req: Request, res: Response) => {
    const address = await this.Address.updateDefaultAddress(req);
    appSuccsess(201, "select default address  succsessfully", res, address);
    addressLogger.info("Select default address  succsessfully");
  });
  deleteAddress = asyncHandler(async (req: Request, res: Response) => {
    const address = await this.Address.deleteAddress(req);
    appSuccsess(201, "Delete address succsessfully", res, address);
    addressLogger.info("delete address succsessfully");
  });

  getDataAddress = asyncHandler(async (req: Request, res: Response) => {
    const addressData = await this.Address.getAddressService(req);
    appSuccsess(201, "Get data address succsessfully ", res, addressData);
    addressLogger.info("Get data address succsessfully ");
  });
}
