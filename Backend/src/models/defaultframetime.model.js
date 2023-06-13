const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");

/***********************************Music Model***************************************/

const createFrametime = async (params) => {
  const sql = `INSERT INTO ${Tables.tb_default_frametime} (time,defined,type) VALUES (?,?,?)`;
  try {
    await DBConnection.query(sql, [params.time,params.defined,params.type]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};
const getFrametimeById = async (params) => {
  const sql = `SELECT id, frametime FROM ${Tables.tb_default_frametime} WHERE remove_on IS NULL AND id = ? `;
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
const getFrametimes = async () => {
  const sql = `SELECT id, time, type, defined FROM ${Tables.tb_default_frametime} WHERE remove_on IS NULL`;
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
const updateFrametimeById = async (params) => {
  const sql = `UPDATE ${Tables.tb_default_frametime} SET updated_on = CURRENT_TIMESTAMP, time=?, defined=?, type=? WHERE id = ?`;
  try {
    await DBConnection.query(sql, [params.time, params.defined, params.type, params.id]);
    return {
      state: true
    }
  }catch (e) {
    return {
      state: false
    }
  }
}
const deleteFrametimeById = async (params) => {
  const sql = `UPDATE ${Tables.tb_default_frametime} SET remove_on = CURRENT_TIMESTAMP WHERE id = ?`;
  try {
    await DBConnection.query(sql, [params.id]);
    return {
      state: true
    }
  }catch (e) {
    return {
      state: false
    }
  }
}

/***********************************Export*******************************************/
module.exports = {
  // tb_default_music
  createFrametime,
  getFrametimeById,
  getFrametimes,
  updateFrametimeById,
  deleteFrametimeById
};
