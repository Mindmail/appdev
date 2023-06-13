module.exports = {
  up: `CREATE TABLE IF NOT EXISTS user_goal
  (
           id                   INT PRIMARY KEY AUTO_INCREMENT, 
           userId               INT(10) NOT NULL,
           goalId               TEXT,
           caption              TEXT,
           created_on      DATETIME NOT NULL DEFAULT NOW(),
           updated_on      DATETIME NOT NULL DEFAULT NOW(),
           remove_on       DATETIME NULL DEFAULT NULL

  )`,
  down: "DROP TABLE IF EXISTS user_goal",
};
