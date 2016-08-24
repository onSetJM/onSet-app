



-- This creates profiles. Each user has a client profile or an artist profile. The userId column references the id column of
-- users. If a user is deleted, the corresponding posts' userIds will be set NULL.

CREATE TABLE Profile (
  id int(11) NOT NULL AUTO_INCREMENT,
  token VARCHAR (255),
  specialities text,
  city VARCHAR(60),
  email VARCHAR (255),
  profilepic VARCHAR (255),
  category VARCHAR(60),
  username VARCHAR(60),
  name VARCHAR(100),
  availability VARCHAR(100),
  photosprovided VARCHAR(60),
  employment TEXT,
  education TEXT,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE Profile ADD employment TEXT;
ALTER TABLE Profile ADD education VARCHAR(255);


UPDATE Profile SET employment="Aveda Salon", education="Aveda Institute";


CREATE TABLE Reviews (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  headline VARCHAR(255),
  text TEXT(10000), 
  score DECIMAL(3,1),
  createdAt DATETIME NOT NULL,
  reviewertoken VARCHAR(255),
  profileusername VARCHAR(60),
  reviewerusername VARCHAR(100)
);

ALTER TABLE Reviews
ADD reviewerusername VARCHAR(100);
ALTER TABLE Reviews
ADD headline VARCHAR(255);

ALTER TABLE Reviews CHANGE token reviewertoken VARCHAR(100);

UPDATE Reviews SET reviewertoken='instagram|1526590778' ;

CREATE TABLE Photos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  photourl TEXT(10000), 
  token VARCHAR(255)
);

/* FOREIGN KEY (userId) REFERENCES user(id),
FOREIGN KEY (profileId) REFERENCES profile(id) */

UPDATE table_name
SET column1=value1,column2=value2,...
WHERE some_column=some_value;


--  profile_type ENUM ('artist', 'client') DEFAULT 'client',
-- This creates the users table. The username field is constrained to unique

-- CREATE TABLE User (
--   id INT(11) NOT NULL AUTO_INCREMENT,
--   username VARCHAR(50) NOT NULL,
--   email VARCHAR(255) NOT NULL,
--   nickname VARCHAR(100) NOT NULL,
--   typeOfLogin ENUM ('facebook', 'google', 'instagram'),
--   profilepic varchar(255),
--   createdAt DATETIME,
--   PRIMARY KEY (id)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8;