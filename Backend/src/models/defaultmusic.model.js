const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");

/***********************************Music Model***************************************/

const createMusic = async (params) => {
  const sql = `INSERT INTO ${Tables.tb_default_music} (musicname, musicURL, musictime, musictypeId) VALUES (?,?,?,?)`;
  try {
    await DBConnection.query(sql, [
      params.name,
      params.url,
      params.duration,
      params.typeId,
    ]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};
const getMusicById = async (params) => {
  const sql = `SELECT ${Tables.tb_default_music}.id, ${Tables.tb_default_music}.musicname, 
                      ${Tables.tb_default_music}.musicURL, ${Tables.tb_default_music}.musictime, 
                      ${Tables.tb_default_musictype}.musictype
              FROM ${Tables.tb_default_music} 
              LEFT JOIN ${Tables.tb_default_musictype} ON ${Tables.tb_default_music}.musictypeId = ${Tables.tb_default_musictype}.id
              WHERE ${Tables.tb_default_music}.remove_on IS NULL AND ${Tables.tb_default_music}.id = ? 
              `; 
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
const getMusics = async (musictypeid) => {
  const sql = `SELECT ${Tables.tb_default_music}.id, ${Tables.tb_default_music}.musicname, 
                      ${Tables.tb_default_music}.musicURL, ${Tables.tb_default_music}.musictime, 
                      ${Tables.tb_default_musictype}.musictype
              FROM ${Tables.tb_default_music} 
              LEFT JOIN ${Tables.tb_default_musictype} ON ${Tables.tb_default_music}.musictypeId = ${Tables.tb_default_musictype}.id
              WHERE ${Tables.tb_default_music}.remove_on IS NULL AND ${Tables.tb_default_music}.musictypeId = ?
              `;
  try { 
    const result = await DBConnection.query(sql, [musictypeid]);
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
const deleteMusicById = async (params) => {
  const sql = `UPDATE ${Tables.tb_default_music} SET remove_on = CURRENT_TIMESTAMP WHERE id = ?`;
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
  createMusic,
  getMusicById,
  getMusics,
  deleteMusicById
};
