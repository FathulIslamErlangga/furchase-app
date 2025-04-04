import { Request, Response } from "express";
import asyncHandler from "../middlewares/async.middleware";
import { categoryServices } from "../services/categories.services";
import { appSuccsess } from "../utils/response";
import { categoryLogger } from "../utils/logger";

export class Categories {
  private categories = new categoryServices();
  createCategories = asyncHandler(async (req: Request, res: Response) => {
    const category = await this.categories.createCategory(req);
    categoryLogger.info("create category succsessfully");
    appSuccsess(201, "create category succsessfully", res, category);
  });
  updateCategories = asyncHandler(async (req: Request, res: Response) => {
    const category = await this.categories.updateCategory(req);
    categoryLogger.info("update category succsessfully");
    appSuccsess(201, "update category succsessfully", res, category);
  });
  deleteCategories = asyncHandler(async (req: Request, res: Response) => {
    await this.categories.deleteCategory(req);
    categoryLogger.info("delete category succsessfully");
    appSuccsess(201, "delete category succsessfully", res);
  });
}
