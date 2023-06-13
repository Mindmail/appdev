module.exports = {
    up: `CREATE TABLE IF NOT EXISTS default_goal
    (
      id              INT PRIMARY KEY auto_increment, 
      type            VARCHAR(255) NOT NULL, 
      icon            VARCHAR(255), 
      caption         TEXT, 
      question        TEXT, 
      created_on      DATETIME NOT NULL DEFAULT NOW(),
      updated_on      DATETIME NOT NULL DEFAULT NOW(),
      remove_on       DATETIME NULL DEFAULT NULL
      )`,
    down: "DROP TABLE IF EXISTS default_goal",
  };
  