-- DROP DATABASE IF EXISTS mindmail_db;   
-- CREATE DATABASE IF NOT EXISTS mindmail_db;   
USE mindmail_db; 

CREATE TABLE IF NOT EXISTS default_music
(
       id              INT PRIMARY KEY AUTO_INCREMENT, 
       musicname       VARCHAR(255),
       musicURL        TEXT,
       frametimeId     INT(5),
       musictype       INT(5),
       created_on      DATETIME NOT NULL DEFAULT NOW(),
       updated_on      DATETIME NOT NULL DEFAULT NOW(),
       remove_on       DATETIME NOT NULL DEFAULT NOW()
)   