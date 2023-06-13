const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");

/***********************************User Model***************************************/
const create = async (params) => {
  const sql = `INSERT INTO ${Tables.tb_user_payment}
                    (userId, firstname, lastname, cardnumber, securecode, expiry, country) VALUES (?,?,?,?,?,?,?)`;
  const result = await DBConnection.query(sql, [
    params.currentUser,
    params.firstname,
    params.lastname,
    params.cardnumber,
    params.securecode,
    params.expiry,
    params.country
  ]);
  const affectedRows = result ? result.affectedRows : 0;
  return affectedRows;
};
const getpaymentById = async (params) => {
  try {
    const sql = `SELECT * FROM ${Tables.tb_user_payment} WHERE userId = ?`;
    const result = await DBConnection.query(sql, [params.currentUser]);
    return {
      state: true,
      items: result,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};
/***********************************Export*******************************************/
module.exports = {
  create,
  getpaymentById,
};
