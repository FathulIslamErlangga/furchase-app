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
    const file = requests.files || {};
    const coverProfile = file.coverProfile?.[0] || null;
    const thumbnailProfile = file.thumbnailProfile?.[0] || null;

    console.log("Cover Profile File:", coverProfile);
    const users = await prisma.user.findUnique({
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

    // Proses gambar: resize dan upload ke cloudinary DI LUAR TRANSAKSI
    let uploadedImages: { profileId: string; type: string; url: string }[] = [];

    if (coverProfile || thumbnailProfile) {
      const imageTasks = [
        { type: "coverProfile", file: coverProfile },
        { type: "thumbnailProfile", file: thumbnailProfile },
      ]
        .filter(({ file }) => file)
        .map(async ({ type, file }) => {
          const resizePath = await resizeImage(file.path);
          const url = await uploadCloudinary(resizePath);
          return { profileId: profile?.id, type, url };
        });

      const uploadResults = await Promise.allSettled(imageTasks);

      uploadedImages = uploadResults
        .filter((res) => res.status === "fulfilled")
        .map((res) => (res as PromiseFulfilledResult<any>).value);
    }

    const isFirstName = firstName && firstName !== profile?.firstName;
    const isLastName = lastName && lastName !== profile?.lastName;
    const isPhone = phone && phone !== profile?.phone;
    let newSlug = slug;
    return prisma.$transaction(async (tsx) => {
      // Hapus gambar lama jika ada yang baru
      if (uploadedImages.length > 0) {
        await tsx.gallery.deleteMany({
          where: { profileId: profile?.id },
        });

        await tsx.gallery.createMany({
          data: uploadedImages,
        });
      }

      const updatedProfile = await tsx.profile.update({
        where: { id: profile?.id },
        data: {
          ...(isFirstName && { firstName }),
          ...(isLastName && { lastName }),
          ...(isPhone && { phone }),
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

      // Buat slug baru
      if (isFirstName || isLastName) {
        const slugCreate = slugify(
          `${firstName || profile?.firstName} ${lastName || profile?.lastName}`,
          { strict: true, lower: true }
        );

        newSlug = slugCreate;
        let count = 1;

        // Batas maksimum perulangan agar tidak infinite
        const maxAttempts = 100;

        while (await tsx.user.findUnique({ where: { slug: newSlug } })) {
          newSlug = `${slugCreate}-${count}`;
          count++;
          if (count > maxAttempts) break;
        }

        await tsx.user.update({
          where: { id: users.id },
          data: { slug: newSlug },
        });
      }
      return { ...updatedProfile, slug: newSlug };
    });
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
