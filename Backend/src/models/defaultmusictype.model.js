const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");

/***********************************Music Model***************************************/

const createMusictype = async (params) => {
  const sql = `INSERT INTO ${Tables.tb_default_musictype} (musictype) VALUES (?)`;
  try {
    await DBConnection.query(sql, [params.musictype]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};
const getMusictypeById = async (params) => {
  const sql = `SELECT id, musictype FROM ${Tables.tb_default_musictype} WHERE remove_on IS NULL AND id = ? `;
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
const getMusictypes = async () => {
  const sql = `SELECT id, musictype FROM ${Tables.tb_default_musictype} WHERE remove_on IS NULL`;
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
const updateMusictypeById = async (params) => {
  const sql = `UPDATE ${Tables.tb_default_musictype} SET updated_on = CURRENT_TIMESTAMP, musictype = ? WHERE id = ?`;
  try {
    await DBConnection.query(sql, [params.musictype, params.id]);
    return {
      state: true,
    };
  }catch (e) {
    return {
      state: false
    }
  }
}
const deleteMusictypeById = async (params) => {
  const sql = `UPDATE ${Tables.tb_default_musictype} SET remove_on = CURRENT_TIMESTAMP WHERE id = ?`;
  try {
    await DBConnection.query(sql, [params.id]);
    return {
      state: true,
    };
  }catch (e) {
    return {
      state: false
    }
  }
}

/***********************************Export*******************************************/
module.exports = {
  // tb_default_music
  createMusictype,
  getMusictypeById,
  getMusictypes,
  updateMusictypeById,
  deleteMusictypeById
};
