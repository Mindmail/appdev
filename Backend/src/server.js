const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
//import utils
const HttpException = require("../src/utils/HttpException.utils");
//import error middleware
const errorMiddleware = require("../src/middleware/errorMiddleware");
//import user router
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const paymentRouter = require("../src/routes/payment.route");
const affirmationRouter = require("../src/routes/affirmation.route");
const visualizationRouter = require("../src/routes/visualization.route");
const adminRouter = require("../src/routes/admin.route");
// ###
// Init express

const app = express();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// enabling cors for all requests by using cors middleware
app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Max-Age", "1000000000");
// });
// Enable pre-flight
app.options("*", cors());

app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/affirmation", affirmationRouter);
app.use("/visualization", visualizationRouter);
app.use("/admin", adminRouter);

app.all("*", (req, res, next) => {
  const error = new HttpException(404, "Endpoint Not Found.");
  next(error);
});
// Error middleware
app.use(errorMiddleware);
// set port, listen for requests
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
/***********************************Export*******************************************/
module.exports = app;
