module.exports = {
  up: `CREATE TABLE IF NOT EXISTS default_musictype
    (
      id              INT PRIMARY KEY AUTO_INCREMENT, 
      musictype       VARCHAR(255),
      created_on      DATETIME NOT NULL DEFAULT NOW(),
      updated_on      DATETIME NOT NULL DEFAULT NOW(),
      remove_on       DATETIME NULL DEFAULT NULL
    )`,
  down: "DROP TABLE IF EXISTS default_musictype",
};
