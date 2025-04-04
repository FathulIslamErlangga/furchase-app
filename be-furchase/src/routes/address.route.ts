import express from "express";
import { Addresses } from "../controllers/addresss.controllers";
import { authProtected } from "../middlewares/auth.middleware";
const addressRoute = () => {
  const router = express.Router();
  const address = new Addresses();
  router.post("/address/v1/:slug", authProtected, address.createAddress);
  router.patch(
    "/address/v2/:slug/:addressId",
    authProtected,
    address.updateAddress
  );
  router.patch(
    "/address/v3/:slug/:addressId",
    authProtected,
    address.updateAddressDefault
  );
  router.delete(
    "/address/v4/:slug/:addressId",
    authProtected,
    address.deleteAddress
  );
  return router;
};
export default addressRoute;
