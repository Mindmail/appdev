const express = require("express");
const router = express.Router();
//impot userController
const paymentController = require("../controllers/payment.controller");
//import middleware
const auth = require("../middleware/auth.middleware").clientAuth;
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");
// POST ==> payment/create
router.post("/create", auth(), awaitHandlerFactory(paymentController.create));
// GET ==> payment/getpayment
router.get(
  "/getpayment",
  auth(),
  awaitHandlerFactory(paymentController.getpaymentById)
);
/***********************************Export*******************************************/
module.exports = router;
