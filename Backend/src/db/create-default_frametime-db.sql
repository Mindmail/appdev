
USE mindmail_db; 

CREATE TABLE IF NOT EXISTS default_frametime
(
         id              INT PRIMARY KEY AUTO_INCREMENT, 
         time            INT(10),
         type            VARCHAR(5),
         defined         BOOLEAN DEFAULT FALSE,
         created_on      DATETIME NOT NULL DEFAULT NOW(),
        updated_on      DATETIME NOT NULL DEFAULT NOW(),
        remove_on       DATETIME NULL DEFAULT NULL
)