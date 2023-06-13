module.exports = {
  up: `CREATE TABLE IF NOT EXISTS user_visualization
  (
       id                   INT PRIMARY KEY AUTO_INCREMENT, 
       userId               INT(10),
       musicId              INT(10),
       frametimeId          INT(10)
  )`,
  down: "DROP TABLE IF EXISTS user_visualization",
};
