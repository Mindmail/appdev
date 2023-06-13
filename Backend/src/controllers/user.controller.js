const TrialModel = require("../models/trial.model");
const UserModel = require("../models/user.model");
const HttpException = require("../utils/HttpException.utils");
const { hashPassword } = require("../utils/common.utils");

/*********************************Tiral Controller*********************************************/
const update = async (req, res, next) => {
  const result = await TrialModel.updateTrial(req.body);
  if (result) {
    res.send({ type: "success", message: "successful" });
  } else {
    throw new HttpException(404, "Something went wrong");
  }
};
const getTrialById = async (req, res, next) => {
  const { currentUser } = req.body;
  const result = await TrialModel.getTrialById({ currentUser });
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: "success", data: result.items });
  }
};

const getUserInfo = async (req, res, next) => {
  const { currentUser } = req.body;
  const result = await UserModel.getUserInfo({ currentUser });
  if (!result) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: "success", data: result });
  }
};

const updateUserProfile = async (req, res, next) => {
  const { currentUser } = req.body;
  await hashPassword(req);

  const result = await UserModel.updateUserById({ id: currentUser, ...req.body });
  if (!result) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: "success", data: result });
  }
};

const deleteUserAccount = async (req, res, next) => {
  const { currentUser } = req.body;

  const result = await UserModel.deleteUserById({ id: currentUser });
  if (!result) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: "success", data: result });
  }
}
/***********************************Export*******************************************/
module.exports = {
  update,
  getTrialById,
  getUserInfo,
  updateUserProfile,
  deleteUserAccount
};
