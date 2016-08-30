



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

CREATE TABLE Reviews (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  headline VARCHAR(255),
  text TEXT(10000), 
  score DECIMAL(3,1),
  createdAt DATETIME NOT NULL,
  reviewerusername VARCHAR(80),
  reviewertoken VARCHAR(255),
  profileusername VARCHAR(80)
);

CREATE TABLE Photos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  photourl TEXT(10000), 
  token VARCHAR(255)
);

CREATE TABLE User (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  nickname VARCHAR(100) NOT NULL,
  typeOfLogin ENUM ('facebook', 'google', 'instagram'),
  profilepic varchar(255),
  createdAt DATETIME,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/* Manually inserts/updates of some data */

INSERT INTO Photos (photourl, token) VALUES ("https://hd.unsplash.com/photo-1433873703448-d6a62dc3285a", "insta008 ");
UPDATE Profile SET email='onsetwebsite@gmail.com' where id=3 ;
UPDATE Profile SET profilepic='https://scontent-yyz1-1.cdninstagram.com/t51.2885-19/s150x150/10369420_785605148238691_1197452344_a.jpg' where id=14 ;
UPDATE Profile SET specialities='I do make-up for TV commercials and movies.Ive worked on american movies' where id=9 ;
UPDATE Profile SET name="Christina Bloom" where id=14;
UPDATE Profile SET employment="Aveda Salon", education="Aveda Institute";
DELETE FROM Photos WHERE id < 21;
UPDATE Reviews SET reviewertoken='instagram|1526590778' ;


/* FOREIGN KEY (userId) REFERENCES user(id),
FOREIGN KEY (profileId) REFERENCES profile(id) */

