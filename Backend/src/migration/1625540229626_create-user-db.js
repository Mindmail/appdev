module.exports = {
  up: `CREATE TABLE IF NOT EXISTS user
  (
    id              INT PRIMARY KEY auto_increment, 
    name            VARCHAR(25) NOT NULL, 
    email           VARCHAR(100) UNIQUE NOT NULL, 
    password        CHAR(60) NOT NULL, 
    role            ENUM('Admin', 'Common') NOT NULL,
    state           INT NOT NULL DEFAULT 1,
    signtype        ENUM('Email', 'Google', 'Facebook') NOT NULL,
    code            INT(10) NOT NULL,
    reset           INT(10) NOT NULL,
    created_on      DATETIME NOT NULL DEFAULT NOW(),
    updated_on      DATETIME NOT NULL DEFAULT NOW(),
    remove_on       DATETIME NULL DEFAULT NULL
    )`,
  down: "DROP TABLE IF EXISTS user",
};
