-- This creates the users table. The username field is constrained to unique

CREATE TABLE User (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL, 
  email VARCHAR(255) NOT NULL,
  nickname VARCHAR(100) NOT NULL,
  typeOfLogin ENUM ('facebook', 'google', 'instagram'),
  profilepic varchar(255),
  createdAt DATETIME,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- This creates profiles. Each user has a client profile or an artist profile. The userId column references the id column of
-- users. If a user is deleted, the corresponding posts' userIds will be set NULL.

CREATE TABLE Profile (
  id int(11) NOT NULL AUTO_INCREMENT,
  profile_type ENUM ('artist', 'client') DEFAULT 'client',
  url varchar(2000) DEFAULT NULL,
  userId int(11) DEFAULT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  
CREATE TABLE Reviews (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  text TEXT(10000), 
  score DECIMAL(2,1),
  createdAt DATETIME NOT NULL,
  userId INT,
  profileId INT
);

/* FOREIGN KEY (userId) REFERENCES user(id),
FOREIGN KEY (profileId) REFERENCES profile(id) */

