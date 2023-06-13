-- DROP DATABASE IF EXISTS mindmail_db;   
-- CREATE DATABASE IF NOT EXISTS mindmail_db;   
USE mindmail_db; 

CREATE TABLE IF NOT EXISTS user_goal
(
         id                   INT PRIMARY KEY AUTO_INCREMENT, 
         userId               INT(10) NOT NULL,
         goalId               INT(10) NOT NULL,
         caption              TEXT NOT NULL
)