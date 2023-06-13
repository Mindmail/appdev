module.exports = {
  up: `CREATE TABLE IF NOT EXISTS user_uploadphotos
  (
         id              INT PRIMARY KEY AUTO_INCREMENT, 
         userId          INT(10)  NOT NULL,
         photoURL        TEXT,
         description     TEXT,
         state           ENUM('none', 'present', 'future') DEFAULT 'none',
         isGratitude     BOOLEAN DEFAULT FALSE,
         isVisualization  BOOLEAN DEFAULT FALSE,
         created_on      DATETIME NOT NULL DEFAULT NOW(),
         updated_on      DATETIME NOT NULL DEFAULT NOW(),
         remove_on       DATETIME NULL DEFAULT NULL
  )`,
  down: "DROP TABLE IF EXISTS user_uploadphotos",
};
