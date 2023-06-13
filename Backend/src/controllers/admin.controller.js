const DefaultBuddyModel = require("../models/defaultbuddy.model");
const DefaultGoalModel = require("../models/defaultgoal.model");
const DefaultAffirmationModel = require("../models/defaultaffirmation.model");
const UserModel = require("../models/user.model");
const MusicModel = require("../models/defaultmusic.model");
const MusictypeModel = require("../models/defaultmusictype.model");
const FrametypeModel = require("../models/defaultframetime.model");
const VideoModel = require("../models/defaultvideo.model");

const { hashPassword } = require("../utils/common.utils");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const HttpException = require("../utils/HttpException.utils");
/*********************************admin Controller*****************************/
const createUser = async (req, res, next) => {
  const result = await UserModel.createUser(req.body);
  if (!result) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: true });
  }
};
const getUserById = async (req, res, next) => {
  const result = await UserModel.getUserById(req.params);
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true,
      items: result.items,
    });
  }
};
const getUsers = async (req, res, next) => {
  const result = await UserModel.getUsers(req.query);
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

const updateUserById = async (req, res, next) => {
  const { id } = req.params;

  await hashPassword(req);

  const result = await UserModel.updateUserById({id, ...req.body});
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    return res.send({ type: true });
  }
};

const deleteUserById = async (req, res, next) => {
  const result = await UserModel.deleteUserById(req.params);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    return res.send({ type: true });
  }
};

const createChatBuddyAvatar = async (req, res, next) => {
  const result = await DefaultBuddyModel.createChatBuddyAvatar(req.body);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: true });
  }
};

const getChatBuddyAvatarById = async (req, res, next) => {
  const result = await DefaultBuddyModel.getChatBuddyAvatarById(req.params);
  if (result) {
    res.send({ type: "success", data: result });
  } else {
    throw new HttpException(500, "Something went wrong");
  }
}
const getChatBuddyAvatars = async (req, res, next) => {
  const result = await DefaultBuddyModel.getChatBuddyAvatars();
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true,
      items: result.items
    });
  }
}
const deleteChatBuddyAvatarById = async (req, res, next) => {
  const result = await DefaultBuddyModel.deleteChatBuddyAvatarById(req.params);
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true
    });
  }
}

const createGoal = async (req, res, next) => {
  const result = await DefaultGoalModel.createGoal(req.body);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else { 
    res.send({ id: result.id, type: true });
  }
};
const getGoalById = async (req, res, next) => {
  const result = await DefaultGoalModel.getGoalById(req.params);
  if (result) {
    res.send({ type: "success", data: result });
  } else {
    throw new HttpException(500, "Something went wrong");
  }
}
const getGoals = async (req, res, next) => {
  const result = await DefaultGoalModel.getGoals();
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    res.send({ type: true, data: result.items });
  }
}
const updateGoalById = async (req, res, next) => {
  const { id } = req.params;
  const { type, caption, question } = req.body;
  
  const result = await DefaultGoalModel.updateGoalById({ id, type, caption, question });
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true
    });
  }
}
const deleteGoalById = async (req, res, next) => {
  const result = await DefaultGoalModel.deleteGoalById(req.params);
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true
    });
  }
}

const createAffirmation = async (req, res, next) => {
  const result = await DefaultAffirmationModel.createAffirmation(req.body);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: true });
  }
};
const getAffirmationById = async (req, res, next) => {
  const result = await DefaultAffirmationModel.getAffirmationById(req.params);
  if (result.state) {
    return res.send({
      type: true,
      items: result.items
    });
  } else {
    throw new HttpException(500, "Something went wrong");
  }
}
const getAffirmationsByGoalId = async (req, res, next) => {
  const result = await DefaultAffirmationModel.getAffirmationsByGoalId(req.params);
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true,
      items: result.items,
      count: result.count
    });
  }
}
const updateAffirmationById = async (req, res, next) => {
  const { id } = req.params;
  const { question } = req.body;
  
  const result = await DefaultAffirmationModel.updateAffirmationById({ id, question});
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true
    });
  }
}
const deleteAffirmationById = async (req, res, next) => {
  const result = await DefaultAffirmationModel.deleteAffirmationById(req.params);
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true
    });
  }
}
const deleteAffirmationsByGoalId = async (req, res, next) => {
  const result = await DefaultAffirmationModel.deleteAffirmationsByGoalId(req.params);
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true
    });
  }
}

const createMusictype = async (req, res, next) => {
  const result = await MusictypeModel.createMusictype(req.body);

  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: true });
  }
};
const getMusictypeById = async (req, res, next) => {
  const result = await MusictypeModel.getMusictypeById(req.params);
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true,
      items: result.items,
    });
  }
};
const getMusictypes = async (req, res, next) => {
  const result = await MusictypeModel.getMusictypes();
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
const updateMusictypeById = async (req, res, next) => {
  const {id} = req.params;
  const { musictype } = req.body;
  const result = await MusictypeModel.updateMusictypeById({ id, musictype });
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    return res.send({ type: true });
  }
};
const deleteMusictypeById = async (req, res, next) => {
  const result = await MusictypeModel.deleteMusictypeById(req.params);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    return res.send({ type: true });
  }
};

const createMusic = async (req, res, next) => {
  const result = await MusicModel.createMusic(req.body);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: true });
  }
};
const getMusicById = async (req, res, next) => {
  const result = await MusicModel.getMusicById(req.params);
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true,
      items: result.items,
    });
  }
};
const getMusics = async (req, res, next) => {
  const { musictypeid } = req.params;
  const result = await MusicModel.getMusics(musictypeid);
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

const deleteMusicById = async (req, res, next) => {
  const result = await MusicModel.deleteMusicById(req.params);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    return res.send({ type: true });
  }
};

const createFrametime = async (req, res, next) => {
  const result = await FrametypeModel.createFrametime(req.body);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: true });
  }
};
const getFrametimeById = async (req, res, next) => {
  const result = await FrametypeModel.getFrametimeById(req.params);
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true,
      items: result.items,
    });
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
const updateFrametimeById = async (req, res, next) => {
  const { id } = req.params;
  const { time, defined, type } = req.body;
  const result = await FrametypeModel.updateFrametimeById({ id, time, defined, type});
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    return res.send({ type: true });
  }
};
const deleteFrametimeById = async (req, res, next) => {
  const result = await FrametypeModel.deleteFrametimeById(req.params);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    return res.send({ type: true });
  }
};

const addVideo = async (req, res, next) => {
  const result = await VideoModel.addVideo(req.body);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: true });
  }
};
const getVideoByType = async (req, res, next) => {
  const result = await VideoModel.getVideoByType(req.params);
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true,
      items: result.items,
    });
  }
};
const getVideos = async (req, res, next) => {
  const result = await VideoModel.getVideos();
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

const deleteVideoById = async (req, res, next) => {
  const result = await VideoModel.deleteVideoById(req.params);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    return res.send({ type: true });
  }
};
/***********************************Export*******************************************/
module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,

  //
  createFrametime,
  getFrametimeById,
  getFrametimes,
  updateFrametimeById,
  deleteFrametimeById,

  //
  createMusictype,
  getMusictypeById,
  getMusictypes,
  updateMusictypeById,
  deleteMusictypeById,
  //
  createMusic,
  getMusicById,
  getMusics,
  deleteMusicById,
  //
  createChatBuddyAvatar,
  getChatBuddyAvatarById,
  getChatBuddyAvatars,
  deleteChatBuddyAvatarById,

  // goals
  createGoal,
  getGoals,
  getGoalById,
  updateGoalById,
  deleteGoalById,

  // affirmations
  createAffirmation,
  getAffirmationsByGoalId,
  getAffirmationById,
  updateAffirmationById,
  deleteAffirmationById,
  deleteAffirmationsByGoalId,

  // videos
  addVideo,
  getVideoByType,
  getVideos,
  deleteVideoById
};
