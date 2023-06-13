const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");

/***********************************admin Model***************************************/

const createChatBuddyAvatar = async (params) => {
  const sql = `INSERT INTO ${Tables.tb_default_buddy} (filename, photoURL) VALUES (?,?)`;
  try {
    await DBConnection.query(sql, [params.filename, params.url]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};
const getChatBuddyAvatarById = async (params) => {
  const sql = `SELECT id, filename, photoURL FROM ${Tables.tb_default_buddy} WHERE remove_on IS NULL AND id = ? `;
  try { 
    const result = await DBConnection.query(sql, [params.id]);
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
const getChatBuddyAvatars = async () => {
  const sql = `SELECT id, filename, photoURL FROM ${Tables.tb_default_buddy} WHERE remove_on IS NULL `;
  try { 
    const result = await DBConnection.query(sql, []);
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
const deleteChatBuddyAvatarById = async (params) => {
  const sql = `UPDATE ${Tables.tb_default_buddy} SET remove_on = CURRENT_TIMESTAMP WHERE id = ?`;
  try { 
    const result = await DBConnection.query(sql, [params.id]);
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
  createChatBuddyAvatar,
  getChatBuddyAvatarById,
  getChatBuddyAvatars,
  deleteChatBuddyAvatarById,
};
