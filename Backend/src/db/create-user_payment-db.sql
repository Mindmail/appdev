 
-- DROP DATABASE IF EXISTS mindmail_db;   
-- CREATE DATABASE IF NOT EXISTS mindmail_db;   
USE mindmail_db; 
/* 
DROP TABLE IF EXISTS payment;     */

CREATE TABLE IF NOT EXISTS user_payment
(
         id              INT PRIMARY KEY auto_increment, 
         userId          INT(10) UNIQUE NOT NULL,
         payment         TEXT NOT NULL
)  