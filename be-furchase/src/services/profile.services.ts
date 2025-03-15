import { Request } from "express";
import { IRequest } from "../utils/interface";
import prisma from "../utils/prisma";
import { authLogger } from "../utils/logger";
import { appError } from "../utils/response";
import slugify from "slugify/slugify";
import bcrypt from "bcrypt";
import {
  resizeImage,
  uploadCloudinary,
} from "../middlewares/uploaderImage.middleware";

export class ProfileService {
  async updateService(req: Request) {
    const { firstName, lastName, phone } = req.body;
    const { slug } = req.params;
    const requests = req as IRequest;
    const files = requests.files;
    const coverProfile = files.coverProfile?.[0] || null;
    const thumbnailProfile = files.thumbnailProfile?.[0] || null;

    return prisma.$transaction(
      async (tsx) => {
        const users = await tsx.user.findUnique({
          where: { slug },
          include: {
            profiles: {
              include: {
                images: true,
              },
            },
          },
        });
        if (!users) {
          authLogger.warn("user not found, please login first");
          throw new appError("user not found, please login first", 404);
        }
        const profile = users.profiles;

        if (coverProfile || thumbnailProfile) {
          if (profile?.images.length) {
            await prisma.gallery.deleteMany({
              where: { profileId: profile.id },
            });
          }

          const imageFile = [
            { type: "coverProfile", files: coverProfile },
            { type: "thumbnailProfile", files: thumbnailProfile },
          ]
            .filter(({ files }) => files)
            .map(async ({ type, files }) => {
              const resizePath = await resizeImage(files.path);
              const url = await uploadCloudinary(resizePath);
              return { profileId: profile?.id, type, url };
            });
          const uploadResults = await Promise.allSettled(imageFile);
          const uploadedImages = uploadResults
            .filter((res) => res.status === "fulfilled" && res.value !== null)
            .map((res) => (res as PromiseFulfilledResult<any>).value);

          if (uploadedImages.length > 0) {
            await tsx.gallery.createMany({
              data: uploadedImages,
            });
          }
        }

        const updateProfile = await tsx.profile.update({
          where: { id: profile?.id },
          data: {
            firstName: firstName || profile?.firstName,
            lastName: lastName || profile?.lastName,
            phone: phone || profile?.phone,
          },
          include: {
            users: {
              select: {
                id: true,
                email: true,
                slug: true,
              },
            },
            images: true,
          },
        });

        if (updateProfile) {
          const slugCreate = slugify(
            `${firstName || profile?.firstName} ${
              lastName || profile?.lastName
            }`,
            {
              strict: true,
              lower: true,
            }
          );
          let slug = slugCreate;
          let count = 1;
          while (await tsx.user.findUnique({ where: { slug } })) {
            slug = `${slugCreate}-${count}`;
            count++;
          }
          await tsx.user.update({
            where: { id: users.id },
            data: {
              slug,
            },
          });
        }

        return updateProfile;
      },
      { timeout: 10000 }
    );
  }

  async changeService(req: Request) {
    const requests = req as IRequest;
    const { slug } = requests.users;
    const { newPassword, oldPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new appError("Old and new passwords are required", 400);
    }
    const user = await prisma.user.findUnique({
      where: { slug },
    });

    if (!user || !user.password) {
      authLogger.warn("User not found or password not set");
      throw new appError("User not found", 404);
    }

    const compareOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (!compareOldPassword) {
      authLogger.warn("invalid current password ");
      throw new appError("invalid current password", 403);
    }

    const hashPassowrd = await bcrypt.hash(newPassword, 10);
    console.log("Hashed New Password:", hashPassowrd);
    const newData = await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashPassowrd,
      },
    });

    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
    console.log("New Stored Password in DB:", updatedUser?.password);
    const withOutPassword = { ...newData, password: undefined };

    return withOutPassword;
  }
}
