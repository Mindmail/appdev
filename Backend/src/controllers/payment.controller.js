const paymentModel = require("../models/payment.model");
const HttpException = require("../utils/HttpException.utils");

/*********************************Payment Controller*********************************************/
const create = async (req, res, next) => {
  const result = paymentModel.create(req.body);
  if (!result) {
    throw new HttpException(500, "Something went wrong");
  }
  res.send({ type: "success", message: "successful" });
};
const getpaymentById = async (req, res, next) => {
  const { currentUser } = req.body;
  const result = await paymentModel.getpaymentById({ currentUser });
  if (!result.state) {
    throw new HttpException(500, "Something went wrong");
  } else {
    res.send({ type: "success", data: result.items });
  }
};
/***********************************Export*******************************************/
module.exports = {
  create,
  getpaymentById,
};
