const DefaultBuddyModel = require("../models/defaultbuddy.model");
const UserBuddyModel = require("../models/userbuddy.model");

const getChatBuddyAvatars = async (req, res, next) => {
  const result = await DefaultBuddyModel.getChatBuddyAvatars();
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
const setUserChatBuddy = async (req, res, next) => {
  const result = await UserBuddyModel.setUserChatBuddy(req.body);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: true });
  }
};

const getUserChatBuddy = async (req, res, next) => {
  const { currentUser } = req.body;
  const result = await UserBuddyModel.getUserChatBuddy({currentUser });
  if (result) {
    res.send({ type: "success", data: result });
  } else {
    throw new HttpException(500, "Something went wrong");
  }
}
const updateUserChatBuddy = async (req, res, next) => {
  const { id } = req.params;
  const { currentUser, buddyId, name } = req.body;
  const result = await UserBuddyModel.updateUserChatBuddy({id, currentUser, buddyId, name});
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true,
    });
  }
}
const deleteUserChatBuddy = async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req.body;
  const result = await UserBuddyModel.deleteUserChatBuddy({ id, currentUser });
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true
    });
  }
}
/***********************************Export*******************************************/
module.exports = {
  // default
  getChatBuddyAvatars,

  // user
  setUserChatBuddy,
  getUserChatBuddy,
  updateUserChatBuddy,
  deleteUserChatBuddy
};
