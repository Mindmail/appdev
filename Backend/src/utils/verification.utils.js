// const nodemailer = require("nodemailer");
// const smtpTransport = require("nodemailer-smtp-transport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sendgrid = require('@sendgrid/mail');

dotenv.config();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
// #
// const Transportsmtp = nodemailer.createTransport(
//   smtpTransport({
//     service: "Gmail",
//     auth: {
//       user: process.env.USER_EMAIL,
//       pass: process.env.USER_PASS,
//     },
//   })
// );

// const transportsmtp = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.SMTP_USERNAME,
//     pass: process.env.SMTP_PASSWORD
//   }
// });

const hashToken = (params) => {
  const token = jwt.sign(
    {
      rand: params.random,
      email: params.email,
      token: params.token
    },
    process.env.SECRET_JWT,
    {
      expiresIn: "1h",
      algorithm: "HS256",
    }
  );
  return token;
};

const Sendsmtp = (email, type, random, userToken) => {
  let link;
  try {
    token = hashToken({ random, email, token: userToken });
    if (type === "signup") {
      link = process.env.CLIENT_URL + `/setup/verify/${token}`;
    } else {
      link = process.env.CLIENT_URL + `/setup/password/${token}`;
    }

    const mailOption = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject:
        type == "signup"
          ? "Please confirm your email"
          : "Forgot your password? It happends to the bet of us.",
      text:
        type == "signup"
          ? `
          Thank you for joining Mindmail! To finish signing up, you just need to confirm that we got your email right.

          To confirm your email, please click this link:

          ${link}

          Welcome and thanks!
          The Mindmail`
          :
          `Dear Mindmail User,

          We have received your request to reset your password. Please click the link below to complete the reset:

          ${link}
          
          If you need additional assistance, or you did not make this change, please contact help@getpostman.com.

          Cheers,
          The Mindmail Team`,
      html:
        type == "signup"
          ? `
          <p>Thank you for joining Mindmail! To finish signing up, you just need to confirm that we got your email right.</p>

          <p>To confirm your email, please click this link:</p>

          <a href="${link}">${link}</a>

          <p>Welcome and thanks!</p>
          <p>The Mindmail</p>`
          :
          `<p>Dear Mindmail User</p>
          <p>We have received your request to reset your password. Please click the link below to complete the reset:</p>

          <a href="${link}">${link}</a>
          
          <p>If you need additional assistance, or you did not make this change, please contact help@getpostman.com.</p>

          <p>Cheers</p>
          <p>The Mindmail Team</p>`,
    };

    return sendgrid.send(mailOption)
      .then((aa) => {
        console.log(aa)
        return {
          state: true
        }
      })
      .catch(er => {
        console.dir(er.response.body.errors)
        return false
      })

    // return {
    //   state: true,
    // };

    // return await (new Promise((resolve, reject) => {
    //   transportsmtp.sendMail(mailOption, (error, response) => {
    //     if (error) {
    //       resolve({
    //         state: false,
    //       });
    //     } else {
    //       resolve({
    //         state: true,
    //       });
    //     }
    //   });
    // }))
  } catch (e) {
    return {
      state: false,
    };
  }
};

module.exports = {
  Sendsmtp,
};
