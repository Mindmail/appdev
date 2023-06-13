const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");

/***********************************default_Affirmation Model***************************************/

const createUserAffirmation = async (params) => {
  const sql = `INSERT INTO ${Tables.tb_user_affirmation} (userId, goalId, affirmationId, answer) VALUES (?,?,?,?)`;
  try {
    await DBConnection.query(sql, [params.currentUser, params.goalId, params.affirmationId, params.answer]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};
const getUserAffirmationById = async (params) => {
  const sql = `SELECT id, goalId, affirmationId, answer FROM ${Tables.tb_user_affirmation} WHERE remove_on IS NULL AND userId = ? AND id = ? `;
  try { 
    const result = await DBConnection.query(sql, [params.currentUser, params.id]);
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

const getUserAffirmationsByGoalId = async (params) => {
  const sql = `SELECT ${Tables.tb_user_affirmation}.id, 
                      ${Tables.tb_default_affirmation}.goalId, 
                      ${Tables.tb_default_affirmation}.question,
                      ${Tables.tb_default_affirmation}.quiz_no,
                      ${Tables.tb_default_affirmation}.quiz_type,
                      ${Tables.tb_default_affirmation}.options,
                      ${Tables.tb_default_affirmation}.id as defaultId,
                      ${Tables.tb_user_affirmation}.answer 
              FROM ${Tables.tb_default_affirmation} 
              LEFT JOIN ${Tables.tb_user_affirmation} ON 
                  ${Tables.tb_user_affirmation}.affirmationId = ${Tables.tb_default_affirmation}.id AND 
                  ${Tables.tb_user_affirmation}.remove_on IS NULL AND
                  ${Tables.tb_user_affirmation}.userId = ?
              WHERE ${Tables.tb_default_affirmation}.remove_on IS NULL AND ${Tables.tb_default_affirmation}.goalId = ?`;
  try { 
    console.log(params);
    const result = await DBConnection.query(sql, [params.currentUser, params.goalId]);
    return {
      state: true,
      items: result,
    };
  } catch (e) {
    console.log(e);
    return {
      state: false,
    };
  }
};
const updateUserAffirmationById = async (params) => {
  
  let sql = `UPDATE ${Tables.tb_user_affirmation} SET updated_on = CURRENT_TIMESTAMP, answer = ? WHERE userId = ? AND id = ? `;

  try { 
    const result = await DBConnection.query(sql, [params.answer, params.currentUser, params.id]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};
const deleteUserAffirmationById = async (params) => {
  const sql = `UPDATE ${Tables.tb_user_affirmation} SET remove_on = CURRENT_TIMESTAMP WHERE userId = ? AND id = ?`;
  try { 
    const result = await DBConnection.query(sql, [params.currentUser, params.id]);
    return {
      state: true,
    };    
  } catch (e) {
    return {
      state: false,
    };
  }
};
const deleteUserAffirmationsByGoalId = async (params) => {
  const sql = `UPDATE ${Tables.tb_user_affirmation} SET remove_on = CURRENT_TIMESTAMP WHERE userId = ? AND goalId = ?`;
  try { 
    const result = await DBConnection.query(sql, [params.currentUser, params.goalId]);
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
  createUserAffirmation,
  getUserAffirmationsByGoalId,
  getUserAffirmationById,
  updateUserAffirmationById,
  deleteUserAffirmationById,
  deleteUserAffirmationsByGoalId
};
