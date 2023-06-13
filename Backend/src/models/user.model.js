const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");
const { multipleColumnSet } = require("../utils/common.utils");

/***********************************User Model***************************************/
const createUser = async ({
  name,
  email,
  password = "",
  role = "Common",
  signtype = "Email",
  code = 10001,
  reset = 10002,
}) => {
  const sql = `INSERT INTO ${Tables.tb_user} 
                    (name, email, password, role, signtype, code, reset) VALUES (?,?,?,?,?,?,?)`;
  const result = await DBConnection.query(sql, [
    name,
    email,
    password,
    role,
    signtype,
    code,
    reset,
  ]);
  const affectedRows = result ? result.affectedRows : 0;
  return affectedRows;
};
const getUserById = async (params) => {
  const sql = `SELECT id, email, name, signtype, state, role, created_on, remove_on 
                FROM ${Tables.tb_user} WHERE id = ?`;
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
const getUsers = async (params) => {
  const { currentpage, perpage, search } = params;

  let count_sql = `SELECT count(id) as count FROM ${Tables.tb_user}`;

  let sql = `SELECT ${Tables.tb_user}.id, email, name, signtype, state, role, 
                    ${Tables.tb_user}.created_on, ${Tables.tb_user}.remove_on, 
                    history.last_login, ${Tables.tb_default_buddy}.photoURL
              FROM ${Tables.tb_user}
              LEFT JOIN (SELECT userId, type, MAX(created_on) as last_login FROM ${Tables.tb_user_history} GROUP BY userId, type) AS history ON history.userId = ${Tables.tb_user}.id AND history.type = 'SIGNIN'
              LEFT JOIN ${Tables.tb_user_buddy} ON ${Tables.tb_user_buddy}.userId = ${Tables.tb_user}.id
              LEFT JOIN ${Tables.tb_default_buddy} ON ${Tables.tb_default_buddy}.id = ${Tables.tb_user_buddy}.buddyId`;

  if (search != undefined && search != "") {
    count_sql += " WHERE name LIKE '%" + search + "%' OR email LIKE '%" + search + "%'";
    sql += " WHERE name LIKE '%" + search + "%' OR email LIKE '%" + search + "%'";
  }
  sql += ` LIMIT ${(currentpage-1)*perpage}, ${perpage}`;

  try {
    const count_result = await DBConnection.query(count_sql);
    const result = await DBConnection.query(sql);

    return {
      state: true,
      count: count_result[0].count,
      items: result
    };
  } catch (e) {
    console.log(e)
    return {
      state: false,
    };
  }
};

const updateUserById = async (params) => {
  let sql = `UPDATE ${Tables.tb_user} SET updated_on = CURRENT_TIMESTAMP, `;

  if (params.name != undefined) sql += `name = '${params.name}', `;
  if (params.email != undefined) sql += `email = '${params.email}', `;
  if (params.password != undefined) sql += `password = '${params.password}', `;
  if (params.signtype != undefined) sql += `signtype = '${params.signtype}', `;
  if (params.code != undefined) sql += `code = ${params.code}, `;
  if (params.reset != undefined) sql += `reset = ${params.reset}, `;
  if (params.role != undefined) sql += `role = '${params.role}', `;

  sql = sql.slice(0, -2);
  sql += ' WHERE id = ?'; 
  try {
    await DBConnection.query(sql, [params.id]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};

const deleteUserById = async (params) => {
  const sql = `UPDATE ${Tables.tb_user} SET remove_on = CURRENT_TIMESTAMP, state = ? WHERE id = ?`;
  try {
    await DBConnection.query(sql, [2, params.id]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};

const isEmptyUser = async (params) => {
  const { columnSet, values } = multipleColumnSet(params);

  const sql = `SELECT * FROM ${Tables.tb_user} WHERE ${columnSet}`;
  const result = await DBConnection.query(sql, [...values]);
  if (result.length === 0) {
    return {
      state: false,
      user: [],
    };
  }
  return {
    state: true,
    user: result[0],
  };
};

const isEmptyUserById = async (userId) => {
  const sql = `SELECT * FROM ${Tables.tb_user} WHERE id = ?`;
  const result = await DBConnection.query(sql, [userId]);
  if (result.length === 0) {
    return {
      state: false,
      user: [],
    };
  }
  return {
    state: true,
    user: result[0],
  };
};

const verification = async (params) => {
  const sql = `UPDATE ${Tables.tb_user} SET code = ? WHERE email = ? AND code = ?`;
  const result = await DBConnection.query(sql, [10001, params.email, params.code]);
  if (result.changedRows === 0) {
    return false;
  } else {
    return true;
  }
};

const isVerify = async (params) => {
  const { columnSet, values } = multipleColumnSet(params);
  const sql = `SELECT code FROM ${Tables.tb_user}
        WHERE ${columnSet}`;
  const result = await DBConnection.query(sql, [...values]);
  if (result[0].code === 10001) {
    return true;
  } else {
    return false;
  }
};

const resetConfirm = async (params) => {
  const sql = `UPDATE ${Tables.tb_user} SET reset = ? WHERE email = ?`;
  const result = await DBConnection.query(sql, [
    params.resetcode,
    params.email,
  ]);
  if (result.changedRows === 0) {
    return false;
  } else {
    return true;
  }
};

const resetpassword = async (params) => {
  const sql = `UPDATE ${Tables.tb_user} SET reset = ?, password = ? WHERE email = ?`;
  const result = await DBConnection.query(sql, [
    10002,
    params.password,
    params.email,
  ]);
  if (result.changedRows === 0) {
    return false;
  } else {
    return true;
  }
};

const createtrial = async (userId) => {
  const sql = `INSERT INTO ${Tables.tb_user_trial} 
                    (userId) VALUES (?)`;
  const result = await DBConnection.query(sql, [userId]);
  const affectedRows = result ? result.affectedRows : 0;
  return affectedRows;
};

const checkReset = async (params) => {
  const sql = `SELECT reset FROM ${Tables.tb_user} WHERE email = ?`;
  const result = await DBConnection.query(sql, [params.email]);
  return result[0].reset;
};

const userhistory = async (params) => {
  const sql = `INSERT INTO ${Tables.tb_user_history} (userId) VALUES (?)`;
  try {
    await DBConnection.query(sql, [params.id]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};

const getUserInfo = async (params) => {
  const sql = `SELECT email, name, 
                ${Tables.tb_user_buddy}.id as userBuddyId, ${Tables.tb_user_buddy}.buddyId, ${Tables.tb_user_buddy}.botname, ${Tables.tb_default_buddy}.photoURL as botUrl,
                ${Tables.tb_user_trial}.id as trialId, ${Tables.tb_user_trial}.type, ${Tables.tb_user_trial}.purchase, ${Tables.tb_user_trial}.created_on
                FROM ${Tables.tb_user} 
                LEFT JOIN ${Tables.tb_user_buddy} ON ${Tables.tb_user_buddy}.userId = ${Tables.tb_user}.id
                LEFT JOIN ${Tables.tb_default_buddy} ON ${Tables.tb_default_buddy}.id = ${Tables.tb_user_buddy}.buddyId
                LEFT JOIN ${Tables.tb_user_trial} ON ${Tables.tb_user_trial}.userId = ${Tables.tb_user}.id
                WHERE ${Tables.tb_user}.id = ? AND ${Tables.tb_user}.remove_on IS NULL`;
  try {
    const result = await DBConnection.query(sql, [params.currentUser]);
    return result;
  } catch (e) {
    return false;
  }
};

/***********************************Export*******************************************/
module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
  
  isEmptyUser,
  verification,
  createtrial,
  isVerify,
  resetConfirm,
  resetpassword,
  isEmptyUserById,
  checkReset,

  getUserInfo,
  userhistory,
};
