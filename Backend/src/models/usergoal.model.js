const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");
/***********************************Affirmation Model***************************************/
const createGoal = async (params) => {

  const default_goal_sql = `SELECT caption FROM ${Tables.tb_default_goal} WHERE remove_on IS NULL AND id = ?`;
  const sql = `INSERT INTO ${Tables.tb_user_goal} (userId, goalId, caption) VALUES (?,?,?)`;

  try {
    let caption = "";
    if (params.caption == undefined || params.caption == "") {
      const result = await DBConnection.query(default_goal_sql, [params.goalId]);
      if (result.length > 0) {
        caption = result[0].caption; 
      }
    }
    else {
      caption = params.caption;
    }    

    const result = await DBConnection.query(sql, [params.currentUser, params.goalId, caption]);
    return {
      state: true,
      id: result.insertId,
    };
  } catch (e) {
    console.log(e);
    return {
      state: false,
    };
  }
};
const getGoalById = async (params) => {
  const sql = `SELECT ${Tables.tb_user_goal}.id, ${Tables.tb_default_goal}.type, ${Tables.tb_user_goal}.caption 
            FROM ${Tables.tb_user_goal}
            INNER JOIN ${Tables.tb_default_goal} ON ${Tables.tb_user_goal}.goalId = ${Tables.tb_default_goal}.id 
            WHERE ${Tables.tb_user_goal}.userId = ? AND ${Tables.tb_user_goal}.id = ?`;
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
const getGoals = async (params) => {
  const sql = `SELECT user_goal.id, user_goal.id as selected, ${Tables.tb_default_goal}.id as goalId, ${Tables.tb_default_goal}.type, user_goal.caption,
              ${Tables.tb_default_goal}.question, user_goal.answer, ${Tables.tb_default_goal}.caption AS default_caption 
              FROM ${Tables.tb_default_goal}
              LEFT JOIN (SELECT id, userId, goalId, caption, answer FROM ${Tables.tb_user_goal} WHERE userId = ?) user_goal ON user_goal.goalId = ${Tables.tb_default_goal}.id`;
  try {
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
const updateGoalById = async (params) => {

  const answer = JSON.stringify(params.answer);
  let sql = `UPDATE ${Tables.tb_user_goal} SET updated_on = CURRENT_TIMESTAMP, `;

  if (params.caption != undefined) sql += `caption = '${params.caption}', `;
  if (params.answer != undefined) sql += `answer = '${answer}', `;

  sql = sql.slice(0, -2);
  sql += ' WHERE id = ? AND userId = ?'; 

  try {
    await DBConnection.query(sql, [params.id, params.currentUser]);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const deleteGoalById = async (params) => {
  const sql = `DELETE FROM ${Tables.tb_user_goal} WHERE id = ? AND userId = ?`;
  try {
    await DBConnection.query(sql, [params.id, params.currentUser]);
    return true;
  } catch (e) {
    return false;
  }
};
/***********************************Export*******************************************/
module.exports = {
  createGoal,
  getGoalById,
  getGoals,
  updateGoalById,
  deleteGoalById
};
