const VisualizationModel = require("../models/visualization.model");
const FrametypeModel = require("../models/defaultframetime.model");
const VideoModel = require("../models/defaultvideo.model");
const HttpException = require("../utils/HttpException.utils");
/*********************************Visualization Controller***************************/
const getMusic = async (req, res, next) => {
  const result = await VisualizationModel.getMusic(req.query);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: "success", items: result.items });
  }
};

const getMusicByRandom = async (req, res, next) => {
  const result = await VisualizationModel.getMusic();
  if (result) {
    res.send({ type: "success", data: result.items });
  } else {
    throw new HttpException(500, "Something went wrong");
  }
};

const getFrametimes = async (req, res, next) => {
  const result = await FrametypeModel.getFrametimes();
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true,
      items: result.items,
      count: result.count,
    });
  }
};

const createVisualization = async (req, res, next) => {
  const { currentUser, musictypeId, frametimeId, photoIds } = req.body;
  const result = await VisualizationModel.createVisualization({
    currentUser,
    musictypeId,
    frametimeId,
    photoIds,
  });
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: "success" });
  }
};

const getMusicProperty = async (req, res, next) => {
  // TEST DATA
  // req.body.currentUser = 26;
  const { currentUser } = req.body;
  const result = await VisualizationModel.getMusicProperty({ currentUser });
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: "success", items: result.items });
  }
};

const getMusictype = async (req, res, next) => {
  const result = await VisualizationModel.getMusictype();
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: "success", items: result.items });
  }
};

const getImages = async (req, res, next) => {
  const { isGratitude, isVisualization } = req.query;
  const { currentUser } = req.body;
  const result = await VisualizationModel.getImages({ currentUser, isGratitude, isVisualization });
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: "success", items: result.items });
  }
};

const getGratitude = async (req, res, next) => {
  const { isHistory } = req.query;
  const { currentUser } = req.body;
  const result = await VisualizationModel.getGratitudeImages({ isHistory, currentUser });
  if (result) {
    res.send({ type: "success", data: result });
  } else {
    throw new HttpException(500, "Something went wrong");
  }
};

const getVisualization = async (req, res, next) => {
  const { currentUser } = req.body;
  const result = await VisualizationModel.getVisualizationImages({ currentUser });
  if (result) {
    res.send({ type: "success", data: result });
  } else {
    throw new HttpException(500, "Something went wrong");
  }
};

const createImages = async (req, res, next) => {
  const { currentUser, data, folderType } = req.body;
  const result = await VisualizationModel.createImages({ currentUser, data, folderType });
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: "success", items: result.items });
  }
};

const updateImages = async (req, res, next) => {
  const { id } = req.params;
  const { currentUser, isGratitude, isVisualization, state, description } = req.body;
  const result = await VisualizationModel.updateImages({ id, isGratitude, isVisualization, state, description });
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: "success", items: result.items });
  }
}

const deleteImages = async (req, res, next) => {
  const { id } = req.params;
  const result = await VisualizationModel.deleteImages({ id });
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: "success" });
  }
}

const getVideoByType = async (req, res, next) => {
  const result = await VideoModel.getVideoByType(req.params);
  if (result) {
    res.send({ type: "success", data: result });
  } else {
    throw new HttpException(500, "Something went wrong");
  }
};

/***********************************Export*******************************************/
module.exports = {
  getVideoByType,
  //frametime
  getFrametimes,
  //visualization
  getMusicProperty,
  createVisualization,
  
  //music
  getMusic,
  getMusicByRandom,
  getMusictype,

  //
  getGratitude,
  getVisualization,
  getImages,
  createImages,
  updateImages,
  deleteImages
};
