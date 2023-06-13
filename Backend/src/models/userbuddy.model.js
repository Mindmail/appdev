const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");

/***********************************admin Model***************************************/

const setUserChatBuddy = async (params) => {
  const sql = `INSERT INTO ${Tables.tb_user_buddy} (userId, buddyId, botname) VALUES (?,?,?)`;
  try {
    await DBConnection.query(sql, [params.currentUser, params.buddyId, params.name]);
    return {
      state: true,
    };
  } catch (e) {
    console.log(e);
    return {
      state: false,
    };
  }
};
const getUserChatBuddy = async (params) => {
  const sql = `SELECT ${Tables.tb_user_buddy}.id, ${Tables.tb_user_buddy}.botname,
                      ${Tables.tb_default_buddy}.photoURL 
              FROM ${Tables.tb_user_buddy} 
              INNER JOIN ${Tables.tb_default_buddy} ON ${Tables.tb_default_buddy}.id = ${Tables.tb_user_buddy}.buddyId
              WHERE ${Tables.tb_user_buddy}.remove_on IS NULL AND userId = ?`;
  try { 
    const result = await DBConnection.query(sql, [params.currentUser]);
    return result;
  } catch (e) {
    return {
      state: false,
    };
  }
};
const updateUserChatBuddy = async (params) => {
  const sql = `UPDATE ${Tables.tb_user_buddy} SET updated_on = CURRENT_TIMESTAMP, buddyId = ?, botname = ? WHERE id = ? AND userId = ?`;
  try { console.log(params);
    const result = await DBConnection.query(sql, [params.buddyId, params.name, params.id, params.currentUser]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};
const deleteUserChatBuddy = async (params) => {
  const sql = `UPDATE ${Tables.tb_user_buddy} SET remove_on = CURRENT_TIMESTAMP WHERE id = ? AND userId = ?`;
  try { 
    const result = await DBConnection.query(sql, [params.id, params.currentUser]);
    return {
      state: true,
    };    
  } catch (e) {
    return {
      state: false,
    };
  }
};

/***********************************Export*******************************************/
module.exports = {
  // tb_default_buddy
  setUserChatBuddy,
  getUserChatBuddy,
  updateUserChatBuddy,
  deleteUserChatBuddy
};
