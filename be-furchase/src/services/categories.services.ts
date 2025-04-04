import { Request } from "express";
import slugify from "slugify/slugify";
import prisma from "../utils/prisma";
import { IRequest } from "../utils/interface";
import { categoryLogger } from "../utils/logger";
import { appError } from "../utils/response";

export class categoryServices {
  async createCategory(req: Request) {
    const request = req as IRequest;
    const user = request.users.role;
    const { name } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    if (user !== "Admin") {
      categoryLogger.warn("you do not permission to create category");
      throw new appError("you do not permission to create category", 403);
    }

    return await prisma.category.create({
      data: {
        name,
        slug,
      },
    });
  }
  async updateCategory(req: Request) {
    const { slug } = req.params;
    const { name } = req.body;
    const request = req as IRequest;
    const user = request.users.role;
    const slugs = slugify(name, { strict: true, lower: true });
    if (user !== "Admin") {
      categoryLogger.warn("you do not permission to update category");
      throw new appError("you do not permission to update category", 403);
    }

    const category = await prisma.category.findUnique({
      where: { slug },
    });

    if (!category) {
      categoryLogger.warn("category not found");
      throw new appError("category not found", 404);
    }

    return await prisma.category.update({
      where: { id: category.id },
      data: {
        name: name || category.name,
        slug: slugs,
      },
    });
  }

  async deleteCategory(req: Request) {
    const { slug } = req.params;
    const requests = req as IRequest;
    const user = requests.users.role;

    if (user !== "Admin") {
      categoryLogger.warn("you do not permission to delete category");
      throw new appError("you do not permission to delete category", 403);
    }

    const category = await prisma.category.findUnique({
      where: { slug },
    });

    if (!category) {
      categoryLogger.warn("category not found");
      throw new appError("category not found", 404);
    }

    return await prisma.category.delete({
      where: { id: category.id },
    });
  }
}
