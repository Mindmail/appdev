module.exports = {
    up: `CREATE TABLE IF NOT EXISTS user_affirmation
    (
      id              INT PRIMARY KEY auto_increment, 
      userId          INT(10)  NOT NULL,
      goalId          INT(10)  NOT NULL,
      affirmationId   INT(10)  NOT NULL,
      answer          TEXT, 
      created_on      DATETIME NOT NULL DEFAULT NOW(),
      updated_on      DATETIME NOT NULL DEFAULT NOW(),
      remove_on       DATETIME NULL DEFAULT NULL
      )`,
    down: "DROP TABLE IF EXISTS user_affirmation",
  };
  