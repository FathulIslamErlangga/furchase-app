import { Request, Response } from "express";
import bcrypt from "bcrypt";
import slugify from "slugify/slugify";
import prisma from "../utils/prisma";
import { Role } from ".prisma/client";
import { authLogger } from "../utils/logger";
import { appError } from "../utils/response";
import { IRequest } from "../utils/interface";
export class authServices {
  async registerService(req: Request) {
    const { email, password, firstName, lastName } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const countUser = await prisma.user.count();
    const isRole = countUser === 0 ? Role.Admin : Role.Customer;
    const slugData = slugify(`${firstName} ${lastName}`, {
      strict: true,
      lower: true,
    });
    const voucherGenerator = `DISC-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toLocaleUpperCase()}`;
    let slug = slugData;
    let count = 1;
    while (await prisma.user.findUnique({ where: { slug } })) {
      slug = `${slugData}-${count}`;
      count++;
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        slug,
        password: hashPassword,
        role: isRole,
        profiles: {
          create: {
            firstName,
            lastName,
          },
        },
        vouchers: {
          create: {
            code: voucherGenerator,
            isActive: false,
            usageLimit: 1,
            discounts: {
              create: {
                startDate: new Date(),
                endDate: new Date(
                  new Date().setMonth(new Date().getMonth() + 1)
                ),
                name: "Voucher Discount",
                percent: 10,
              },
            },
          },
        },
      },
      select: {
        id: true,
        email: true,
        googleId: true,
        slug: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        notifications: true,
        password: true,
        profiles: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        vouchers: {
          select: {
            id: true,
            code: true,
            usageLimit: true,
            isActive: true,
            discounts: true,
          },
        },
      },
    });

    return newUser;
  }

  async loginService(req: Request) {
    const { email, password } = req.body;

    const users = await prisma.user.findUnique({
      where: { email },
    });
    if (!users) {
      authLogger.warn("user not found, please register first");
      throw new appError("user not found, please register first", 404);
    }
    const passwordCompare = await bcrypt.compare(password, users.password);

    if (!users && !passwordCompare) {
      throw new appError("Invalid login, email or password incorrect", 401);
    }

    return users;
  }

  async getDataService(req: Request) {
    const requests = req as IRequest;
    const user = requests.users;

    const users = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        profiles: {
          include: {
            addresses: true,
            images: true,
          },
        },
        vouchers: {
          include: {
            discounts: true,
          },
        },
      },
    });

    if (!users) {
      authLogger.warn("User not found");
      throw new appError("User not found", 404);
    }

    const getDataUser = {
      id: users.id,
      email: users.email,
      slug: users.slug,
      role: users.role,
      profiles: {
        id: users.profiles?.id,
        firstName: users.profiles?.firstName,
        lastName: users.profiles?.lastName,
        phone: users.profiles?.phone,
        addresses: users.profiles?.addresses.map((address) => ({
          id: address.id,
          address: address.address,
          city: address.city,
          postalCode: address.postalCode,
          label: address.label,
          province: address.province,
        })),
        images: users.profiles?.images.map((image) => ({
          id: image.id,
          url: image.url,
          type: image.type,
        })),
      },
      vouchers: users.vouchers.map((voucher) => ({
        id: voucher.id,
        code: voucher.code,
        isActive: voucher.isActive,
        usageLimit: voucher.usageLimit,
        discounts: {
          id: voucher.discounts?.id,
          name: voucher.discounts?.name,
          percent: voucher.discounts?.percent,
          startDate: voucher.discounts?.startDate,
          endDate: voucher.discounts?.endDate,
        },
      })),
    };

    return getDataUser;
  }

  async logoutService(res: Response) {
    const isDev = process.env.NODE_ENV === "development" ? true : false;

    res.cookie("jwt", "", {
      httpOnly: true,
      secure: isDev,
      expires: new Date(0),
    });

    return;
  }
}
