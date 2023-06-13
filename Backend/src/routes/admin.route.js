const express = require("express");
const router = express.Router();
//impot userController
const adminController = require("../controllers/admin.controller");
//import middleware
const auth = require("../middleware/auth.middleware").adminAuth;
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

// POST ==> admin/user
router.post(
  "/user",
    auth(),
  awaitHandlerFactory(adminController.createUser)
);
// GET ==> admin/user/:id
router.get(
  "/user/:id",
    auth(),
  awaitHandlerFactory(adminController.getUserById)
);
// GET ==> admin/users
router.get(
  "/users",
    auth(),
  awaitHandlerFactory(adminController.getUsers)
);
// PUT ==> admin/user/:id
router.put(
  "/user/:id",
  auth(),
  awaitHandlerFactory(adminController.updateUserById)
);
// PUT ==> admin/user/:id
router.delete(
  "/user/:id",
  auth(),
  awaitHandlerFactory(adminController.deleteUserById)
);

//POST ==> admin/chatbuddyavatar
router.post(
  "/chatbuddyavatar",
  auth(),
  awaitHandlerFactory(adminController.createChatBuddyAvatar)
),

//GET ==> admin/chatbuddyavatar
router.get(
  "/chatbuddyavatar/:id",
  auth(),
  awaitHandlerFactory(adminController.getChatBuddyAvatarById)
),

//GET ==> admin/chatbuddyavatars
router.get(
  "/chatbuddyavatars",
  auth(),
  awaitHandlerFactory(adminController.getChatBuddyAvatars)
),

//DELETE ==> admin/chatbuddyavatar/:id
router.delete(
  "/chatbuddyavatar/:id",
  auth(),
  awaitHandlerFactory(adminController.deleteChatBuddyAvatarById)
),

//POST ==> admin/goal
router.post(
  "/goal",
  auth(),
  awaitHandlerFactory(adminController.createGoal)
),

//GET ==> admin/goal
router.get(
  "/goal/:id",
  auth(),
  awaitHandlerFactory(adminController.getGoalById)
),

//GET ==> admin/goals
router.get(
  "/goals",
  auth(),
  awaitHandlerFactory(adminController.getGoals)
),

//UPDATE ==> admin/goal/:id
router.put(
  "/goal/:id",
  auth(),
  awaitHandlerFactory(adminController.updateGoalById)
),

//DELETE ==> admin/goal/:id
router.delete(
  "/goal/:id",
  auth(),
  awaitHandlerFactory(adminController.deleteGoalById)
),

//POST ==> admin/affirmation
router.post(
  "/affirmation",
  auth(),
  awaitHandlerFactory(adminController.createAffirmation)
),

//GET ==> admin/affirmation
router.get(
  "/affirmation/:id",
  auth(),
  awaitHandlerFactory(adminController.getAffirmationById)
),

//GET ==> admin/affirmations/:goalId
router.get(
  "/affirmations/:goalId",
  auth(),
  awaitHandlerFactory(adminController.getAffirmationsByGoalId)
),

//UPDATE ==> admin/affirmation/:id
router.put(
  "/affirmation/:id",
  auth(),
  awaitHandlerFactory(adminController.updateAffirmationById)
),

//DELETE ==> admin/affirmation/:id
router.delete(
  "/affirmation/:id",
  auth(),
  awaitHandlerFactory(adminController.deleteAffirmationById)
),

//DELETE ==> admin/affirmations/:goalId
router.delete(
  "/affirmations/:goalId",
  auth(),
  awaitHandlerFactory(adminController.deleteAffirmationsByGoalId)
),

//POST ==> /admin/music
router.post(
  "/music",
  auth(),
  awaitHandlerFactory(adminController.createMusic)
);

//GET ==> /admin/music/:id
router.get(
  "/music/:id",
  auth(),
  awaitHandlerFactory(adminController.getMusicById)
);

//GET ==> /admin/musics
router.get(
  "/musics/:musictypeid",
  auth(),
  awaitHandlerFactory(adminController.getMusics)
);

//DELETE ==> /admin/music
router.delete(
  "/music/:id",
  auth(),
  awaitHandlerFactory(adminController.deleteMusicById)
),

//POST ==> /admin/musictype
router.post(
  "/musictype",
  auth(),
  awaitHandlerFactory(adminController.createMusictype)
);

//GET ==>/admin/musictype/:id
router.get(
  "/musictype/:id",
  auth(),
  awaitHandlerFactory(adminController.getMusictypeById)
);

//GET ==>/admin/musictypes
router.get(
  "/musictypes",
  auth(),
  awaitHandlerFactory(adminController.getMusictypes)
);

//PUT ==>/admin/musictype
router.put(
  "/musictype/:id",
  auth(),
  awaitHandlerFactory(adminController.updateMusictypeById)
);


//DELETE ==>/admin/musictype
router.delete(
  "/musictype/:id",
  auth(),
  awaitHandlerFactory(adminController.deleteMusictypeById)
);

//POST ==> /admin/frametime
router.post(
  "/frametime",
  auth(),
  awaitHandlerFactory(adminController.createFrametime)
);

//GET ==>/admin/frametime/:id
router.get(
  "/frametime/:id",
  auth(),
  awaitHandlerFactory(adminController.getFrametimeById)
);

//GET ==>/admin/frametimes
router.get(
  "/frametimes",
  auth(),
  awaitHandlerFactory(adminController.getFrametimes)
);

//PUT ==>/admin/frametime/:id
router.put(
  "/frametime/:id",
  auth(),
  awaitHandlerFactory(adminController.updateFrametimeById)
);

//DELETE ==>/admin/frametime/:id
router.delete(
  "/frametime/:id",
  auth(),
  awaitHandlerFactory(adminController.deleteFrametimeById)
);

router.post(
  "/video",
  auth(),
  awaitHandlerFactory(adminController.addVideo)
);

router.get(
  "/video/:type",
  auth(),
  awaitHandlerFactory(adminController.getVideo)
);

router.get(
  "/videos",
  auth(),
  awaitHandlerFactory(adminController.getVideos)
);

router.delete(
  "/video/:id",
  auth(),
  awaitHandlerFactory(adminController.deleteVideoById)
);
/***********************************Export*******************************************/
(module.exports = router);
