module.exports = {
  up: `CREATE TABLE IF NOT EXISTS default_music
  (
       id              INT PRIMARY KEY AUTO_INCREMENT, 
       musicname       VARCHAR(255),
       musicURL        TEXT,
       musictime       VARCHAR(255),
       musictypeId     INT(5),
       created_on      DATETIME NOT NULL DEFAULT NOW(),
       updated_on      DATETIME NOT NULL DEFAULT NOW(),
       remove_on       DATETIME NOT NULL DEFAULT NOW()
  )`,
  down: "DROP TABLE IF EXISTS default_music",
};
