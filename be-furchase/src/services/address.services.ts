import { Request } from "express";
import { IRequest } from "../utils/interface";
import prisma from "../utils/prisma";
import { addressLogger } from "../utils/logger";
import { appError } from "../utils/response";

export class addressService {
  async addressCreate(req: Request) {
    const { address, city, province, postalCode, label } = req.body;
    const { slug } = req.params;

    const users = await prisma.user.findUnique({
      where: { slug },
      include: {
        profiles: true,
      },
    });

    if (!users) {
      addressLogger.warn("user not found, please login first");
      throw new appError("user not found, please login first", 404);
    }
    const profile = users.profiles;

    return await prisma.address.create({
      data: {
        address,
        city,
        postalCode: parseInt(postalCode),
        province,
        isDefault: false,
        label,
        profileId: profile?.id,
      },
    });
  }

  async updateAddress(req: Request) {
    const { slug, addressId } = req.params;
    const { address, city, province, postalCode, label } = req.body;
    const users = await prisma.user.findUnique({
      where: { slug },
      include: {
        profiles: true,
      },
    });
    if (!users) {
      addressLogger.warn("user not found, please login first");
      throw new appError("user not found, please login first", 404);
    }
    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, profileId: users.profiles?.id },
    });
    if (!existingAddress) {
      addressLogger.warn("address not found, please create address first");
      throw new appError("address not found, please create address first", 404);
    }
    return await prisma.address.update({
      where: { id: existingAddress.id },
      data: {
        address,
        city,
        province,
        label,
        postalCode: parseInt(postalCode),
      },
    });
  }

  async updateDefaultAddress(req: Request) {
    const { slug, addressId } = req.params;

    const users = await prisma.user.findUnique({
      where: { slug },
      include: {
        profiles: true,
      },
    });
    if (!users) {
      addressLogger.warn("user not found, please login first");
      throw new appError("user not found, please login first", 404);
    }

    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, profileId: users.profiles?.id },
    });
    if (!existingAddress) {
      addressLogger.warn("address not found, please create address first");
      throw new appError("address not found, please create address first", 404);
    }
    return await prisma.address.update({
      where: { id: existingAddress.id },
      data: {
        isDefault: true,
      },
    });
  }

  async deleteAddress(req: Request) {
    const { slug, addressId } = req.params;

    const users = await prisma.user.findUnique({
      where: { slug },
      include: {
        profiles: true,
      },
    });
    if (!users) {
      addressLogger.warn("user not found, please login first");
      throw new appError("user not found, please login first", 404);
    }
    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, profileId: users.profiles?.id },
    });

    if (!existingAddress) {
      addressLogger.warn("address not found, please create address first");
      throw new appError("address not found, please create address first", 404);
    }

    return await prisma.address.delete({
      where: { id: existingAddress.id },
    });
  }
}
