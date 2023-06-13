const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");
/***********************************Visualization Model*******************************/
const getMusic = async (params) => {
  try {
    const sql = `SELECT * FROM ${Tables.tb_default_music} WHERE musictype=?`;
    const result = await DBConnection.query(sql, [params.id]);
    return {
      state: true,
      items: result,
    };
  } catch (e) {
    return {
      status: false,
    };
  }
};

const getMusicByRandom = async () => {
  try {
    const sql = `SELECT * FROM ${Tables.tb_default_music}`;
    const result = await DBConnection.query(sql);
    return {
      state: true,
      items: result,
    };
  } catch (e) {
    return {
      status: false,
    };
  }
};

const getFrametime = async () => {
  try {
    const sql = `SELECT * FROM ${Tables.tb_default_frametime} ORDER BY type DESC , time`;
    const result = await DBConnection.query(sql, []);
    return {
      state: true,
      data: result,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};

const createVisualization = async (params) => { 
  const delete_sql = `DELETE  FROM ${Tables.tb_user_visualization} WHERE userId = ?`;
  const music_sql = `SELECT id FROM ${Tables.tb_default_music} 
                WHERE ${Tables.tb_default_music}.musictypeId = ? ORDER BY RAND() LIMIT 1`;
  const insert_sql = `INSERT INTO ${Tables.tb_user_visualization}
    (userId, musicId, frametimeId) VALUES (?,?,?)`;
  // const sql6 = `SELECT id FROM ${Tables.tb_default_music} ORDER BY RAND() LIMIT 1`;
  try {
    await DBConnection.query(delete_sql, [params.currentUser]);

    const result = await DBConnection.query(music_sql, [params.musictypeId]);
    // const rest = await DBConnection.query(sql6);
    if (result.length !== 0) {
      await DBConnection.query(insert_sql, [
        params.currentUser,
        result[0].id,
        params.frametimeId,
      ]);
    } else {
      await DBConnection.query(insert_sql, [
        params.currentUser,
        null, //rest[0].id,
        params.frametimeId,
      ]);
    }

    return { state: true };
  } catch (e) {
    console.log(e);
    return { state: false };
  }
};

const getMusicProperty = async (params) => {
  try {
    const sql = `SELECT ${Tables.tb_user_visualization}.id, ${Tables.tb_default_music}.musicname, 
                 ${Tables.tb_default_music}.musicURL, ${Tables.tb_default_music}.musictime,
                 ${Tables.tb_default_musictype}.musictype, ${Tables.tb_default_frametime}.time, ${Tables.tb_default_frametime}.type
                 FROM ${Tables.tb_user_visualization} 
                 INNER JOIN ${Tables.tb_default_music} ON ${Tables.tb_user_visualization}.musicId = ${Tables.tb_default_music}.id
                 INNER JOIN ${Tables.tb_default_musictype} ON ${Tables.tb_default_music}.musictypeId = ${Tables.tb_default_musictype}.id
                 INNER JOIN ${Tables.tb_default_frametime} ON ${Tables.tb_user_visualization}.frametimeId = ${Tables.tb_default_frametime}.id
                 WHERE ${Tables.tb_user_visualization}.userId = ?`;

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

const getMusictype = async (params) => {
  const sql = `SELECT id, musictype FROM ${Tables.tb_default_musictype}`;
  try {
    const result = await DBConnection.query(sql);
    return { state: true, items: result };
  } catch (e) {
    return { state: false };
  }
};

const getImages = async (params) => {
  
  let sql = `SELECT id, photoURL, description, state, isGratitude, isVisualization 
              FROM ${Tables.tb_user_uploadphotos} 
              WHERE remove_on IS NULL AND userId = ?`;

  if (params.isGratitude != undefined)
    sql += ` AND isGratitude = ${params.isGratitude}`;
  if (params.isVisualization != undefined)
    sql += ` AND isVisualization = ${params.isVisualization}`;
  if (params.state != undefined)
    sql += ` AND state = '${params.state}'`;
  
  try { 
    const result = await DBConnection.query(sql, [params.currentUser]);
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

const getGratitudeImages = async (params) => {

  let sql = `SELECT id, photoURL FROM ${Tables.tb_user_uploadphotos} WHERE remove_on IS NULL AND userId = ? AND isGratitude = 1`;
  
  if (params.isHistory == 1) sql += " AND description IS NOT NULL";

  const result = await DBConnection.query(sql, [params.currentUser]);
  return result;
};

const getVisualizationImages = async (params) => {
  const sql = `SELECT ${Tables.tb_user_uploadphotos}.id, ${Tables.tb_user_uploadphotos}.photoURL,
                      ${Tables.tb_user_uploadphotos}.state, ${Tables.tb_user_uploadphotos}.description,
                      ${Tables.tb_user_uploadphotos}.isGratitude, ${Tables.tb_default_music}.musicURL, 
                      ${Tables.tb_default_music}.musictime, ${Tables.tb_default_music}.musicname
              FROM ${Tables.tb_user_visualization} 
              LEFT JOIN ${Tables.tb_user_uploadphotos} ON ${Tables.tb_user_uploadphotos}.userId = ${Tables.tb_user_visualization}.userId
              LEFT JOIN ${Tables.tb_default_music} ON ${Tables.tb_default_music}.id = ${Tables.tb_user_visualization}.musicId
              WHERE ${Tables.tb_user_visualization}.userId=? AND ${Tables.tb_user_uploadphotos}.isVisualization = 1 AND ${Tables.tb_user_uploadphotos}.remove_on IS NULL`;
  try {
    const result = await DBConnection.query(sql, [params.currentUser]);
    return result;
  } catch (e) {
    return {
      state: false,
    };
  }
};

const createImages = async (params) => {
  const sql = `INSERT INTO ${Tables.tb_user_uploadphotos} (userId, photoURL, state) VALUES (?,?,?) `;

  let state = 'none';
  if (params.folderType == 1) state = 'present';
  if (params.folderType == 2) state = 'future';
  try {
    await DBConnection.query(sql, [params.currentUser, params.data.location, state]);
    return {
      state: true,
    };
  } catch (e) {
    return {
      state: false,
    };
  }
};

const updateImages = async (params) => {

  let sql = `UPDATE ${Tables.tb_user_uploadphotos} SET updated_on = CURRENT_TIMESTAMP, `;

  if (params.isGratitude != undefined)
    sql += `isGratitude = ${params.isGratitude}, `;
  if (params.isVisualization != undefined)
    sql += `isVisualization = ${params.isVisualization}, `;
  if (params.state != undefined)
    sql += `state = '${params.state}', `;
  if (params.description != undefined)
    sql += `description = '${params.description}', `;
  
  sql = sql.slice(0, -2);
  sql += ' WHERE id = ?';

  try {
    await DBConnection.query(sql, [params.id]);
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

const deleteImages = async (params) => {
  const sql = `UPDATE ${Tables.tb_user_uploadphotos} SET remove_on = CURRENT_TIMESTAMP WHERE id = ?`;
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

/***********************************Export*******************************************/
module.exports = {
  getFrametime,

  createVisualization,
  getMusicProperty,  

  getMusicByRandom,
  getMusic,
  getMusictype,

  getGratitudeImages,
  getVisualizationImages,
  getImages,
  createImages,
  updateImages,
  deleteImages
};
