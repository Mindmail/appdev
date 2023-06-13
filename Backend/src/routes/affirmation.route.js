const express = require("express");
const router = express.Router();
//impot userController
const affirmationController = require("../controllers/affirmation.controller");
const buddyController = require("../controllers/buddy.controller");
const chatbotController = require("../controllers/chatbot.controller");
//import middleware
const auth = require("../middleware/auth.middleware").clientAuth;
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

// POST ==> affirmation/goal
router.post(
  "/goal",
  auth(),
  awaitHandlerFactory(affirmationController.createUserGoal)
);

// GET ==> affirmation/goals
router.get(
  "/goals",
  auth(),
  awaitHandlerFactory(affirmationController.getUserGoals)
);
// GET ==> affirmation/goal/:id
router.get(
  "/goal/:id",
  auth(),
  awaitHandlerFactory(affirmationController.getUserGoalById)
);
// PUT ==> affirmation/goal/:id
router.put(
  "/goal/:id",
  auth(),
  awaitHandlerFactory(affirmationController.updateUserGoalById)
);
// DELETE ==> affirmation/goal/:id
router.delete(
  "/goal/:id",
  auth(),
  awaitHandlerFactory(affirmationController.deleteUserGoalById)
);

// POST ==> affirmation/answer
router.post(
  "/answer",
  auth(),
  awaitHandlerFactory(affirmationController.createUserAffirmation)
);

// GET ==> affirmation/answers/:goalId
router.get(
  "/answers/:goalId",
  auth(),
  awaitHandlerFactory(affirmationController.getUserAffirmationsByGoalId)
);
// GET ==> affirmation/answer/:id
router.get(
  "/answer/:id",
  auth(),
  awaitHandlerFactory(affirmationController.getUserAffirmationById)
);
// PUT ==> affirmation/answer/:id
router.put(
  "/answer/:id",
  auth(),
  awaitHandlerFactory(affirmationController.updateUserAffirmationById)
);
// DELETE ==> affirmation/answer/:id
router.delete(
  "/answer/:id",
  auth(),
  awaitHandlerFactory(affirmationController.deleteUserAffirmationById)
);
// DELETE ==> affirmation/answer/:id
router.delete(
  "/answers/:goalId",
  auth(),
  awaitHandlerFactory(affirmationController.deleteUserAffirmationsByGoalId)
);

// GET ==> affirmation/chatbuddys
router.get(
  "/chatbuddyavatars",
  auth(),
  awaitHandlerFactory(buddyController.getChatBuddyAvatars)
);

// POST ==> affirmation/chatbuddy
router.post(
  "/chatbuddy",
  auth(),
  awaitHandlerFactory(buddyController.setUserChatBuddy)
);
// GET ==> affirmation/chatbuddy
router.get(
  "/chatbuddy",
  auth(),
  awaitHandlerFactory(buddyController.getUserChatBuddy)
);
// PUT ==> affirmation/chatbuddy
router.put(
  "/chatbuddy/:id",
  auth(),
  awaitHandlerFactory(buddyController.updateUserChatBuddy)
);
// DELETE ==> affirmation/chatbuddy
router.delete(
  "/chatbuddy/:id",
  auth(),
  awaitHandlerFactory(buddyController.deleteUserChatBuddy)
);

// Affirmation Chat
router.post(
  "/chatbot",
  auth(),
  awaitHandlerFactory(chatbotController.getResponse)
)

/***********************************Export*******************************************/
module.exports = router;
