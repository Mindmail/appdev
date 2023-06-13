const UserGoalModel = require("../models/usergoal.model");
const UserAffirmationModel = require("../models/useraffirmation.model");
const HttpException = require("../utils/HttpException.utils");
/*********************************Affirmation Controller*****************************/
const createUserGoal = async (req, res, next) => {
  
  const result = await UserGoalModel.createGoal(req.body);
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  }
  res.send({ type: true, id: result.id });
};
const getUserGoalById = async (req, res, next) => {

  const { id } = req.params;
  const { currentUser } = req.body;
  const result = await UserGoalModel.getGoalById({ currentUser, id });
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  }
  res.send({ type: true, data: result.items });
};

const getUserGoals = async (req, res, next) => {
  const { currentUser } = req.body;
  const result = await UserGoalModel.getGoals({ currentUser });

  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  }
  res.send({ type: true, data: result.items });
};

const updateUserGoalById = async (req, res, next) => {
  const { id } = req.params;
  const { currentUser, caption, answer } = req.body;
  
  const result = await UserGoalModel.updateGoalById({ currentUser, id, caption, answer });
  if (!result) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true
    });
  }
}
const deleteUserGoalById = async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req.body;

  const result = await UserGoalModel.deleteGoalById({id, currentUser});
  if (!result) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true
    });
  }
}

const createUserAffirmation = async (req, res, next) => {
  
  const result = await UserAffirmationModel.createUserAffirmation(req.body);
  if (!result) {
    throw new HttpException(500, "Something went wrong");
  }
  res.send({ type: true, message: "successful" });
};
const getUserAffirmationById = async (req, res, next) => {

  const { id } = req.params;
  const { currentUser } = req.body;
  const result = await UserAffirmationModel.getUserAffirmationById({ currentUser, id });
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  }
  res.send({ type: true, data: result.items });
};
const getUserAffirmationsByGoalId = async (req, res, next) => {
  const { goalId } = req.params;
  const { currentUser } = req.body;
  const result = await UserAffirmationModel.getUserAffirmationsByGoalId({ currentUser, goalId });
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  }
  res.send({ type: true, data: result.items });
};
const updateUserAffirmationById = async (req, res, next) => {
  const { id } = req.params;
  const { currentUser, answer } = req.body;
  
  const result = await UserAffirmationModel.updateUserAffirmationById({ currentUser, id, answer });
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true
    });
  }
}
const deleteUserAffirmationById = async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req.body;

  const result = await UserAffirmationModel.deleteUserAffirmationById({id, currentUser});
  if (!result.state) {
    throw new HttpException(500, `Something went wrong`);
  } else {
    return res.send({
      type: true
    });
  }
}
const deleteUserAffirmationsByGoalId = async (req, res, next) => {
  const { goalId } = req.params;
  const { currentUser } = req.body;

  const result = await UserAffirmationModel.deleteUserAffirmationsByGoalId({goalId, currentUser});
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
  createUserGoal,
  getUserGoalById,
  getUserGoals,
  updateUserGoalById,
  deleteUserGoalById,

  createUserAffirmation,
  getUserAffirmationById,
  getUserAffirmationsByGoalId,
  updateUserAffirmationById,
  deleteUserAffirmationById,
  deleteUserAffirmationsByGoalId,
};
