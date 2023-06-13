const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const { Sendsmtp } = require("../utils/verification.utils");
const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { hashPassword } = require("../utils/common.utils");

const dotenv = require("dotenv");
dotenv.config();

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/*********************************User Controller*********************************************/

//login handler
const adminLoginWithEmail = async (req, res, next) => {

  checkValidation(req);

  const { email, password } = req.body;
  const result = await UserModel.isEmptyUser({ email, role: 'Admin' });

  if (!result.state) {
    throw new HttpException(401, "Invalid account");
  } else if (result.user.signtype !== "Email") {
    throw new HttpException(
      401,
      `This account is not valid`
    );
  }

  const isMatch = await bcrypt.compare(password, result.user.password);
  if (!isMatch) {
    throw new HttpException(401, "Incorrect password");
  }

  const token = jwt.sign(
    { user_id: result.user.id.toString() },
    process.env.SECRET_JWT,
    {
      expiresIn: "365d",
    }
  );
  res.send({ type: "success", message: "successful", token });
};

const createUserWithEmail = async (req, res, next) => {
  checkValidation(req);
  // Check exist
  const email = req.body.email;
  const flag = await UserModel.isEmptyUser({ email });
  if (flag.state) {
    throw new HttpException(
      400,
      `This Email already exist with ${flag.user.signtype}`
    );
  }
  // Modify password param with hash(password)
  await hashPassword(req);
  let random = Math.floor(Math.random() * 100 + 54);
  // Add user
  const data = {
    ...req.body,
    code: random,
  };
  const result = await UserModel.createUser(data);
  if (!result) {
    throw new HttpException(500, "Something went wrong");
  }

  const token = await createJWT(email);
  // send message to mail inbox
  const rand = await Sendsmtp(email, "signup", random, token);
  if (!rand.state) {
    throw new HttpException(500, "Something went wrong");
  }

  res.send({ type: "success", message: "The verification email has been sent. Please check your email" });
};

//check validation express-validator
const checkValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpException(400, "Validation faild", errors);
  }
};

//verification handler
const verify = async (req, res, next) => {

  const token = req.params.id;
  const decrypt = jwt.decode(token);
  try {
    if (decrypt === null) {
      return res.send({ type: "failure", message: "Email is not verified" });
    }

    const isExist = await UserModel.isEmptyUser({ email: decrypt.email });
    if (!isExist.state) {
      return res.send({ type: "failure", message: "Email can't verify" });
    }

    const isAlready = await UserModel.isVerify({ email: decrypt.email });
    if (isAlready) {
      return res.send({
        type: "failure",
        message: "This Email already verified",
      });
    }

    const isVerify = await UserModel.verification({
      code: decrypt.rand,
      email: decrypt.email,
    });

    if (!isVerify) {
      return res.send({ type: "failure", message: "Email is not verified" });
    }
    return res.send({ type: "success", message: "Verification Successful", token: decrypt.token });

  } catch (e) {
    throw new HttpException(500, "Something wrong went");
  }
};

//login handler
const userLoginWithEmail = async (req, res, next) => {

  checkValidation(req);

  const { email, password } = req.body;
  const result = await UserModel.isEmptyUser({ email });

  if (!result.state) {
    throw new HttpException(401, "Incorrect account or password");
  } else if (result.user.signtype !== "Email") {
    throw new HttpException(
      401,
      `This account sign up with ${result.user.signtype}`
    );
  }

  const isAlready = await UserModel.isVerify({ email });
  if (!isAlready) {
    throw new HttpException(401, "Email is not verified");
  }

  const isMatch = await bcrypt.compare(password, result.user.password);
  if (!isMatch) {
    throw new HttpException(401, "Incorrect account or password");
  }

  const history = await UserModel.userhistory({ id: result.user.id });
  if (!history.state) {
    throw new HttpException(400, `Something went wrong`);
  }

  const token = jwt.sign(
    { user_id: result.user.id.toString() },
    process.env.SECRET_JWT,
    {
      expiresIn: "365d",
    }
  );
  res.send({ type: "success", message: "successful", token });
};

// forget handler
const forgetsendmail = async (req, res, next) => {

  checkValidation(req);

  const { email } = req.body;
  const result = await UserModel.isEmptyUser({ email });

  if (!result.state) {
    throw new HttpException(401, "unregistered account");
  }

  if (result.user.signtype !== "Email") {
    throw new HttpException(
      400,
      `This Email already exist with ${result.user.signtype}`
    );
  }

  let random = Math.floor(Math.random() * 100 + 54);
  const isReset = await UserModel.resetConfirm({ resetcode: random, email });

  if (!isReset) {
    throw new HttpException(404, "Email is not verified");
  }

  const smtp_result = await Sendsmtp(email, "forgot", random, "");
  if (!smtp_result.state) {
    throw new HttpException(500, "Something went wrong");
  }

  res.send({ type: "success", message: "We sent URL to your mail inbox" });
};

const passReset = async (req, res, next) => {

  // Modify password param with hash(password)
  await hashPassword(req);
  const { token, password } = req.body;
  const decrypt = jwt.verify(token, process.env.SECRET_JWT);
  if (decrypt === null) {
    throw new HttpException(404, "Warning URL");
  }
  try {
    const result = await UserModel.checkReset({ email: decrypt.email });
    if (result === 10002) {
      return res.send({
        type: false,
        message: "You are aleady changed Password",
      });
    }
    const result1 = await UserModel.resetpassword({
      email: decrypt.email,
      password,
    });
    if (result1) {
      return res.send({ type: true, message: "successful" });
    } else {
      return res.send({ type: false, message: "Password does not reset" });
    }
  } catch (e) {
    throw new HttpException(404, "Something went wrong");
  }
};

// ######

//FaceBook account
const createUserWithFaceBook = async (req, res, next) => {
  const { email, name } = req.body;
  const flag = await UserModel.isEmptyUser({ email });
  if (flag.state) {
    throw new HttpException(
      400,
      `This Email already exist with ${flag.user.signtype}`
    );
  }
  //###
  const data = {
    name,
    email,
    password: "",
    signtype: "Facebook",
  };
  const result = await UserModel.createUser(data);
  if (!result) {
    throw new HttpException(500, "Something went wrong");
  }
  const token = await createJWT(email);
  res.send({ type: "success", message: "User was created!", token });
};

const userLoignWithFaceBook = async (req, res, next) => {
  const { email } = req.body;
  const result = await UserModel.isEmptyUser({ email });

  if (!result.state) {
    throw new HttpException(401, "Incorrect account");
  } else if (result.user.signtype !== "Facebook" && result.user.signtype !== "Email") {
    throw new HttpException(
      401,
      `This account sign up with ${result.user.signtype}`
    );
  }
  const history = await UserModel.userhistory({ id: result.user.id });
  if (!history.state) {
    throw new HttpException(400, `Something went wrong`);
  }
  const jwt_token = jwt.sign(
    { user_id: result.user.id.toString() },
    process.env.SECRET_JWT,
    {
      expiresIn: "365d",
    }
  );
  res.send({ type: "success", message: "successful", token: jwt_token });
};
// ######
// Google Account

const createUserWithGoogle = async (req, res, next) => {

  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { email, name } = payload;

  // Check exist
  const flag = await UserModel.isEmptyUser({ email });
  if (flag.state) {
    throw new HttpException(
      400,
      `This Email already exist with ${flag.user.signtype}`
    );
  }

  // Add User
  const data = {
    name,
    email,
    password: "",
    signtype: "Google",
  };

  const result = await UserModel.createUser(data);
  if (!result) {
    throw new HttpException(500, "Something went wrong");
  }

  const userToken = await createJWT(email);
  res.send({ type: "success", message: "User was created!", token: userToken });
};

const userLoignWithGoogle = async (req, res, next) => {

  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  console.log('ticket', ticket)

  const payload = ticket.getPayload();
  const { email, name } = payload;
  console.log(payload)

  const result = await UserModel.isEmptyUser({ email });
  console.log(result)
  if (!result.state) {
    throw new HttpException(401, "Incorrect account");
  } else if (result.user.signtype !== "Google" && result.user.signtype !== "Email") {
    throw new HttpException(
      401,
      `This Account sign up with ${result.user.signtype}`
    );
  }
  const history = await UserModel.userhistory({ id: result.user.id });
  if (!history.state) {
    throw new HttpException(400, `Something went wrong`);
  }
  const jwt_token = jwt.sign(
    { user_id: result.user.id.toString() },
    process.env.SECRET_JWT,
    {
      expiresIn: "365d",
    }
  );
  res.send({ type: "success", message: "successful", token: jwt_token });
};

// CREATE JWT and create trial
const createJWT = async (email) => {
  const isExist = await UserModel.isEmptyUser({ email });
  if (!isExist.state) {
    throw new HttpException(400, "Your account does not exist.");
  }

  const history = await UserModel.userhistory({ id: isExist.user.id });
  if (!history.state) {
    throw new HttpException(400, `Something went wrong`);
  }
  // const trial = await UserModel.createtrial(isExist.user.id);
  // if (!trial) {
  //   throw new HttpException(500, "Something went wrong");
  // }

  // generat user token
  const token = jwt.sign({ user_id: isExist.user.id }, process.env.SECRET_JWT, {
    expiresIn: "365d",
  });

  return token;
};


const getUserInfo = async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req.body;
  const result = await UserBuddyModel.getUserChatBuddy({ id, currentUser });
  if (result) {
    res.send({ type: "success", data: result });
  } else {
    throw new HttpException(500, "Something went wrong");
  }
}

/***********************************Export*******************************************/
module.exports = {
  adminLoginWithEmail,
  createUserWithEmail,
  userLoginWithEmail,
  createUserWithGoogle,
  userLoignWithGoogle,
  createUserWithFaceBook,
  userLoignWithFaceBook,
  verify,
  forgetsendmail,
  passReset,
  getUserInfo
};
