const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");

/***********************************default_goal Model***************************************/

const createGoal = async (params) => {
  const sql = `INSERT INTO ${Tables.tb_default_goal} (type, caption) VALUES (?,?)`;
  try {
    const result = await DBConnection.query(sql, [params.type, params.caption]);
    return {
      id: result.insertId,
      state: true,
    };
  } catch (e) {
    console.log(e);
    return {
      state: false,
    };
  }
};
const getGoalById = async (params) => {
  const sql = `SELECT id, type, caption FROM ${Tables.tb_default_goal} WHERE remove_on IS NULL AND id = ? `;
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
const getGoals = async () => {
  const sql = `SELECT id, type, caption,question FROM ${Tables.tb_default_goal} WHERE remove_on IS NULL `;
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
const updateGoalById = async (params) => {
  
  let sql = `UPDATE ${Tables.tb_default_goal} SET updated_on = CURRENT_TIMESTAMP, `;

  if (params.type != undefined) sql += `type = '${params.type}', `;
  if (params.caption != undefined) sql += `caption = '${params.caption}', `;
  if (params.question != undefined) sql += `question = '${params.question}', `;

  sql = sql.slice(0, -2);
  sql += ' WHERE id = ?';

  try { 
    const result = await DBConnection.query(sql, [params.id]);
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
const deleteGoalById = async (params) => {
  const sql = `UPDATE ${Tables.tb_default_goal} SET remove_on = CURRENT_TIMESTAMP WHERE id = ?`;
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
  createGoal,
  getGoals,
  getGoalById,
  updateGoalById,
  deleteGoalById,
};
