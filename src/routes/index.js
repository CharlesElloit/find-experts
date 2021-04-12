const router = require("express").Router();
const userController = require("../controllers/userController");
const ratingController = require("../controllers/ratingController");
const serviceController = require("../controllers/serviceController");
const employerController = require("../controllers/employerController");
const contractorController = require("../controllers/contractorController");
const { catchErrorsHandler } = require("../../handlers/errorHandler");
const { auth } = require("../../middlewares/userAuthentication");

// user routes
router.post("/register", catchErrorsHandler(userController.register));
router.post("/login", catchErrorsHandler(userController.login));

// contractor routes
router.post("/contractors", auth, catchErrorsHandler(contractorController.createContractor));
router.get("/contractor/:contractorId", auth, catchErrorsHandler(contractorController.getContractor));

module.exports = router;
