import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getNearestServiceProviderController,
  orderDeleteController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router obj
const router = express.Router();

//routing
//resgister  || Method POST

router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password
router.post("/forgot-password", forgotPasswordController);

// test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update user profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

//order status delete
router.delete(
  "/order-delete/:orderId",
  requireSignIn,
  isAdmin,
  orderDeleteController
);

// nearest service provider
router.post(
  "/nearest-service",
  requireSignIn,
  getNearestServiceProviderController
);

export default router;
