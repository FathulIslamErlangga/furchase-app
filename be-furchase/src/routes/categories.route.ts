import express from "express";
import { Categories } from "../controllers/category.controllers";
import { authProtected } from "../middlewares/auth.middleware";
const categoriesRoute = () => {
  const router = express.Router();
  const categories = new Categories();
  router.post("/categories/v1", authProtected, categories.createCategories);
  router.patch(
    "/categories/v2/:slug",
    authProtected,
    categories.updateCategories
  );
  router.delete(
    "/categories/v3/:slug",
    authProtected,
    categories.deleteCategories
  );
  return router;
};
export default categoriesRoute;
