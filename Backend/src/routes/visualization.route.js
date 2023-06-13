const express = require("express");
const router = express.Router();
//impot userController
const VisualizationController = require("../controllers/visualization.controller");
//import middleware
const auth = require("../middleware/auth.middleware").clientAuth;
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

// GET ==> visualization/music
router.get("/music", awaitHandlerFactory(VisualizationController.getMusic));

// --------------- music and frametime
//GET ==> visualization/musictype
router.get(
  "/musictype",
  awaitHandlerFactory(VisualizationController.getMusictype)
);

router.get(
  "/musicbyrandom",
  awaitHandlerFactory(VisualizationController.getMusicByRandom)
);
// GET ==>  /frametime
router.get(
  "/frametimes",
  awaitHandlerFactory(VisualizationController.getFrametimes)
);

//GET ==> visualization/getmusicproperty
router.get(
  "/getmusicproperty",
  auth(),
  awaitHandlerFactory(VisualizationController.getMusicProperty)
);


// POST ==> visualization/create
router.post(
  "/create",
  auth(),
  awaitHandlerFactory(VisualizationController.createVisualization)
);

//POST ==> visualization/images
router.post(
  "/images",
  auth(),
  awaitHandlerFactory(VisualizationController.createImages)
);

//GET ==> visualization/gratitudeimages
router.get(
  "/gratitudeimages",
  auth(),
  awaitHandlerFactory(VisualizationController.getGratitude)
);

//GET ==> visualization/visualizationimages
router.get(
  "/visualizationimages",
  auth(),
  awaitHandlerFactory(VisualizationController.getVisualization)
);

//GET ==> visualization/images
router.get(
  "/images",
  auth(),
  awaitHandlerFactory(VisualizationController.getImages)
);

//PUT ==> visualization/images
router.put(
  "/image/:id",
  auth(),
  awaitHandlerFactory(VisualizationController.updateImages)
);

//DELETE ==> visualization/images
router.delete(
  "/image/:id",
  auth(),
  awaitHandlerFactory(VisualizationController.deleteImages)
);

router.get(
  "/video/:type",
  auth(),
  awaitHandlerFactory(VisualizationController.getVideoByType)
);
/***********************************Export*******************************************/
module.exports = router;
