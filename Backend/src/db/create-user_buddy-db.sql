-- DROP DATABASE IF EXISTS mindmail_db;   
-- CREATE DATABASE IF NOT EXISTS mindmail_db;   
USE mindmail_db; 

CREATE TABLE IF NOT EXISTS user_buddy
(
       id              INT PRIMARY KEY AUTO_INCREMENT, 
       userID          INT(10),
       srcID           INT(10),
       name            VARCHAR(255),
       created_on      DATETIME NOT NULL DEFAULT NOW(),
       updated_on      DATETIME NOT NULL DEFAULT NOW(),
       remove_on       DATETIME NOT NULL DEFAULT NOW()
) 