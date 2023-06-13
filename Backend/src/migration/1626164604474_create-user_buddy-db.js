module.exports = {
  up: `CREATE TABLE IF NOT EXISTS user_buddy
  (
         id              INT PRIMARY KEY AUTO_INCREMENT, 
         userId          INT(10),
         buddyId         INT(10),
         botname         VARCHAR(255),
         created_on      DATETIME NOT NULL DEFAULT NOW(),
         updated_on      DATETIME NOT NULL DEFAULT NOW(),
         remove_on       DATETIME NULL DEFAULT NULL
  ) `,
  down: "DROP TABLE IF EXISTS user_buddy",
};
