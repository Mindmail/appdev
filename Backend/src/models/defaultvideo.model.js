const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");

/***********************************Music Model***************************************/

const addVideo = async (params) => {
  const sql = `UPDATE ${Tables.tb_default_video} SET videoURL = ? WHERE id = ?`;
  try {
    await DBConnection.query(sql, [params.videoURL, params.id]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};
const getVideoByType = async (params) => {
  const sql = `SELECT id, videoURL, type FROM ${Tables.tb_default_video} WHERE type=? `;
  try { 
    const result = await DBConnection.query(sql, [params.type]);
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
const getVideos = async () => {
  const sql = `SELECT id, videoURL, type FROM ${Tables.tb_default_video}`;
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
const deleteVideoById = async (params) => {
  const sql = `UPDATE ${Tables.tb_default_video} SET videoURL = NULL WHERE id = ?`;
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
  addVideo,
  getVideoByType,
  getVideos,
  deleteVideoById
};
