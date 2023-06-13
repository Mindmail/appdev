const express = require("express");
const router = express.Router();
//impot userController
const userController = require("../controllers/user.controller");
const buddyController = require("../controllers/buddy.controller");
//import middleware
const auth = require("../middleware/auth.middleware").clientAuth;
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

//Because Default trial was created with user sign up,
//here, we should update trial
//POST ==> trial/plan
router.post("/plan", auth(), awaitHandlerFactory(userController.update));
//GET ==> trial/gettrial
router.get(
  "/getplan",
  auth(),
  awaitHandlerFactory(userController.getTrialById)
);

router.get(
  "/info",
  auth(),
  awaitHandlerFactory(userController.getUserInfo)
)

router.put(
  "/profile",
  auth(),
  awaitHandlerFactory(userController.updateUserProfile)
)

router.delete(
  "/account",
  auth(),
  awaitHandlerFactory(userController.deleteUserAccount)
)
/***********************************Export*******************************************/
module.exports = router;
