-- DROP DATABASE IF EXISTS mindmail_db;   
-- CREATE DATABASE IF NOT EXISTS mindmail_db;   
USE mindmail_db; 

CREATE TABLE IF NOT EXISTS default_goal
(
        id                   INT PRIMARY KEY AUTO_INCREMENT, 
        type                 VARCHAR(255),
        caption              TEXT NOT NULL
        created_on          DATETIME NOT NULL DEFAULT NOW(),
        updated_on          DATETIME NOT NULL DEFAULT NOW(),
        remove_on           DATETIME DEFAULT NULL
)