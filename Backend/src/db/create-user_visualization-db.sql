-- DROP DATABASE IF EXISTS mindmail_db;   
-- CREATE DATABASE IF NOT EXISTS mindmail_db;   
USE mindmail_db; 

CREATE TABLE IF NOT EXISTS user_visualization
(
       id                   INT PRIMARY KEY AUTO_INCREMENT, 
       userId               INT(10),
       musicId              INT(10),
       frametimeId          INT(10)
)    