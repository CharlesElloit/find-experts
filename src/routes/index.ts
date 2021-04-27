import express from "express";
import userController from "../controllers/userController";
import ratingController from "../controllers/ratingController";
import serviceController from "../controllers/serviceController";
// import employerController from "../controllers/employerController";
import contractorController from "../controllers/contractorController";
import { catchErrorsHandler } from "../handlers/errorHandler";
import auth from "../middlewares/userAuthentication";

const router = express.Router();

// user routes
router.post("/register", catchErrorsHandler(userController.register));
router.post("/login", catchErrorsHandler(userController.login));

// test route
router.post(
  "/protected",
  auth,
  catchErrorsHandler(serviceController.protectedRoute),
);

// contractor routes
router.post(
  "/contractors",
  auth,
  catchErrorsHandler(contractorController.createContractor),
);
router.get(
  "/contractor/:contractorId",
  auth,
  catchErrorsHandler(contractorController.getContractor),
);

// rating routes
router.post(
  "/ratings/:userId",
  auth,
  catchErrorsHandler(ratingController.createRating),
);

// service
router.post(
  "/services",
  auth,
  catchErrorsHandler(serviceController.createService),
);

export default router;
