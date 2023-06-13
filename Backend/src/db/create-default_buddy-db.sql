-- DROP DATABASE IF EXISTS mindmail_db;   
-- CREATE DATABASE IF NOT EXISTS mindmail_db;   
USE mindmail_db; 

CREATE TABLE IF NOT EXISTS default_buddy
(
       id              INT PRIMARY KEY AUTO_INCREMENT, 
       filename        VARCHAR(255),
       photoURL        TEXT,
       created_on      DATETIME NOT NULL DEFAULT NOW(),
       updated_on      DATETIME NOT NULL DEFAULT NOW(),
       remove_on       DATETIME NOT NULL DEFAULT NOW()
) 