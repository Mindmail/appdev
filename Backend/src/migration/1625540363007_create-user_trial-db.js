module.exports = {
  up: `CREATE TABLE IF NOT EXISTS user_trial
  (
       id              INT PRIMARY KEY AUTO_INCREMENT, 
       userId          INT(10) UNIQUE NOT NULL,
       type            ENUM('chill', 'powerful', 'deep') DEFAULT 'powerful',
       purchase        ENUM('none', 'free', 'peryear') DEFAULT 'free',
       created_on      DATETIME NOT NULL DEFAULT NOW()
  )`,
  down: "DROP TABLE IF EXISTS user_trial",
};
