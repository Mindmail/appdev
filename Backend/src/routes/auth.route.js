const express = require("express");
const router = express.Router();
//impot authController
const authController = require("../controllers/auth.controller");
//import middleware
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");
//import validation for express-validater
const {
  createUserSchema,
  validateLogin,
  validateForget,
} = require("../middleware/validators/userValidator.middleware");

// POST ==> signin/admin
router.post(
  "/signin/admin",
  validateLogin,
  awaitHandlerFactory(authController.adminLoginWithEmail)
);

// POST ==> signup/email
router.post(
  "/signup/email",
  createUserSchema,
  awaitHandlerFactory(authController.createUserWithEmail)
);

// POST ==> signin/email
router.post(
  "/signin/email",
  validateLogin,
  awaitHandlerFactory(authController.userLoginWithEmail)
);

// POST ==> forget/reset
router.put("/forget/reset", awaitHandlerFactory(authController.passReset));

//This is Router to sent mail to user's mail inbox.
// GET  ==> verify
router.get("/verify/:id", awaitHandlerFactory(authController.verify));

// POST ==> forget/confirm
router.post(
  "/forget/confirm",
  validateForget,
  awaitHandlerFactory(authController.forgetsendmail)
);

// #### with google accout
// POST ==> signup/google
router.post(
  "/signup/google",
  awaitHandlerFactory(authController.createUserWithGoogle)
);
// POST ==> signin/google
router.post(
  "/signin/google",
  awaitHandlerFactory(authController.userLoignWithGoogle)
);

// ### with facebook account
// POST ==> signup/google
router.post(
  "/signup/facebook",
  awaitHandlerFactory(authController.createUserWithFaceBook)
);
// POST ==> signin/google
router.post(
  "/signin/facebook",
  awaitHandlerFactory(authController.userLoignWithFaceBook)
);

/***********************************Export*******************************************/
module.exports = router;
