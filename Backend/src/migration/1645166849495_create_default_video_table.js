module.exports = {
    up: `CREATE TABLE IF NOT EXISTS default_video
    (
      id              INT PRIMARY KEY AUTO_INCREMENT,
      videoURL        VARCHAR(255),
      type            VARCHAR(31),
      created_on      DATETIME NOT NULL DEFAULT NOW(),
      updated_on      DATETIME NOT NULL DEFAULT NOW(),
      remove_on       DATETIME NULL DEFAULT NULL
    )`,
    down: "DROP TABLE IF EXISTS default_video",
};
