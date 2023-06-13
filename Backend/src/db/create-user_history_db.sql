-- DROP DATABASE IF EXISTS mindmail_db;   
-- CREATE DATABASE IF NOT EXISTS mindmail_db;   
USE mindmail_db; 

CREATE TABLE IF NOT EXISTS user_history
(
         id                   INT PRIMARY KEY AUTO_INCREMENT, 
         userId               INT(10) NOT NULL,
         type                 ENUM('SIGNIN', 'SIGNOUT') NOT NULL,
         created_on           DATETIME NOT NULL DEFAULT NOW(),
         updated_on           DATETIME NOT NULL DEFAULT NOW(),
         remove_on            DATETIME NOT NULL DEFAULT NOW()
)