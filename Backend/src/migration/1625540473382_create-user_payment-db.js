module.exports = {
  up: `CREATE TABLE IF NOT EXISTS user_payment
    (
         id              INT PRIMARY KEY auto_increment, 
         userId          INT(10) UNIQUE NOT NULL,
         firstname       VARCHAR(255),
         lastname        VARCHAR(255),
         cardnumber      VARCHAR(255),
         securecode      VARCHAR(255),
         expiry          DATE NOT NULL,
         country         VARCHAR(255)
    )`,
  down: "DROP TABLE IF EXISTS user_payment",
};
