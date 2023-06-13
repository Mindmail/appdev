const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");
/***********************************Trial Model***************************************/
const updateTrial = async (params) => {
  const sql = `SELECT * FROM ${Tables.tb_user_trial}  WHERE userId = ?`;
  const result = await DBConnection.query(sql, [params.currentUser]);
  if (result.length == 0) {
    const sql1 = `INSERT INTO ${Tables.tb_user_trial} 
    (userId, type, purchase) VALUES (?, ?, ?)`;
    try {
      await DBConnection.query(sql1, [
        params.currentUser,
        params.type,
        params.purchase,
      ]);
      return true;
    } catch (e) {
      return false;
    }
  } else {
    const sql2 = `UPDATE ${Tables.tb_user_trial} SET type = ?, purchase = ?, created_on = ?  WHERE userId = ?`;
    const result2 = await DBConnection.query(sql2, [
      params.type,
      params.purchase,
      new Date(),
      params.currentUser,
    ]);
    if (result2.changedRows === 0) {
      return false;
    } else {
      return true;
    }
  }
};
const getTrialById = async (params) => {
  try {
    const sql = `SELECT * FROM ${Tables.tb_user_trial} WHERE userId = ?`;
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
  updateTrial,
  getTrialById,
};
