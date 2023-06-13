const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");

/***********************************default_Affirmation Model***************************************/

const createAffirmation = async (params) => {
  const { goalId, question } = params;
  const max_sql = `SELECT MAX(quiz_no) as quiz_no FROM ${Tables.tb_default_affirmation} WHERE goalId = ?`;
  const insert_sql = `INSERT INTO ${Tables.tb_default_affirmation} (goalId, question, quiz_no) VALUES (?,?,?)`;
  try {
    const res = await DBConnection.query(max_sql, [goalId]);
    await DBConnection.query(insert_sql, [goalId, question, res[0].quiz_no+1]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};
const getAffirmationById = async (params) => {
  const sql = `SELECT id, goalId, question, quiz_no FROM ${Tables.tb_default_affirmation} WHERE remove_on IS NULL AND id = ? `;
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

const getAffirmationsByGoalId = async (params) => {
  const sql = `SELECT id, goalId, question, quiz_no FROM ${Tables.tb_default_affirmation} WHERE remove_on IS NULL AND goalId = ?`;
  try { 
    const result = await DBConnection.query(sql, [params.goalId]);
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
const updateAffirmationById = async (params) => {
  let sql = `UPDATE ${Tables.tb_default_affirmation} SET updated_on = CURRENT_TIMESTAMP, question = ? WHERE id = ? `;
  try { 
    const result = await DBConnection.query(sql, [params.question, params.id]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};
const deleteAffirmationById = async (params) => {
  const sql = `UPDATE ${Tables.tb_default_affirmation} SET remove_on = CURRENT_TIMESTAMP WHERE id = ?`;
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
const deleteAffirmationsByGoalId = async (params) => {
  const sql = `UPDATE ${Tables.tb_default_affirmation} SET remove_on = CURRENT_TIMESTAMP WHERE goalId = ?`;
  try { 
    const result = await DBConnection.query(sql, [params.goalId]);
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
  createAffirmation,
  getAffirmationsByGoalId,
  getAffirmationById,
  updateAffirmationById,
  deleteAffirmationById,
  deleteAffirmationsByGoalId,
};
