



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

ALTER TABLE Profile ADD employment TEXT;
ALTER TABLE Profile ADD education VARCHAR(255);





INSERT INTO Photos (photourl, token) VALUES ("https://hd.unsplash.com/photo-1433873703448-d6a62dc3285a", "insta008 ");
INSERT INTO Photos (photourl, token) VALUES ("https://hd.unsplash.com/photo-1432807653616-37f5f5c2508e", "insta008 ");
INSERT INTO Photos (photourl, token) VALUES ("https://hd.unsplash.com/photo-1458232546092-9fcbb14b2c1d", "insta008 ");
INSERT INTO Photos (photourl, token) VALUES ("https://hd.unsplash.com/photo-1443180528392-bf4de2d8e2c8", "insta003");
INSERT INTO Photos (photourl, token) VALUES ("https://hd.unsplash.com/photo-1447194537595-69d5dd826707", "insta003");
INSERT INTO Photos (photourl, token) VALUES ("https://hd.unsplash.com/photo-1462804993656-fac4ff489837", "insta003");
INSERT INTO Photos (photourl, token) VALUES ("https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-0/p206x206/11329982_829604363799194_5366373428100012826_n.jpg?oh=e29717b5da43ac3c341ae46f193c98dc&oe=584B90BA", "insta5245");
INSERT INTO Photos (photourl, token) VALUES ("https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-0/p206x206/11873551_879642315462065_6597657287330249639_n.jpg?oh=1bd56f1897d93e3cedf5d0ef4d175fb3&oe=584A7EC6", "insta5245");

UPDATE Profile SET email='onsetwebsite@gmail.com' where id=3 ;
UPDATE Profile SET profilepic='https://scontent-yyz1-1.cdninstagram.com/t51.2885-19/s150x150/10369420_785605148238691_1197452344_a.jpg' where id=14 ;
UPDATE Profile SET specialities='I do make-up for TV commercials and movies.Ive worked on american movies' where id=9 ;
UPDATE Profile SET name="Christina Bloom" where id=14;

UPDATE Profile SET employment="Aveda Salon", education="Aveda Institute";




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


ALTER TABLE Reviews
ADD reviewerusername VARCHAR(100);
ALTER TABLE Reviews
ADD headline VARCHAR(255);

DELETE FROM Photos WHERE id < 21;

instagram|8293734 

ALTER TABLE Reviews CHANGE token reviewertoken VARCHAR(100);

UPDATE Reviews SET reviewertoken='instagram|1526590778' ;


/* FOREIGN KEY (userId) REFERENCES user(id),
FOREIGN KEY (profileId) REFERENCES profile(id) */

UPDATE table_name
SET column1=value1,column2=value2,...
WHERE some_column=some_value;


--  profile_type ENUM ('artist', 'client') DEFAULT 'client',
-- This creates the users table. The username field is constrained to unique




INSERT INTO Profile 
(token, specialities, city, email, profilepic, category, username, name, availability, photosprovided, employment, education, createdAt, updatedAt)
VALUES (
"insta5245",
"20 years total experience with a 10 year main focus on coloring.
Coloring : 10 years of focussing mainly on coloring; all colors, balayage, highlighting, bleach out, color correction, basically everything.
Cutting : Specialized in men and women hair; curly. clippers, curly hair, all hair types. I have experience in all the different techniques for each hair.
Styles : Blow outs, flat ironing, beach waves",
"Montreal", 
"jason@gmail.com", 
"http://salonhelmet.ca/wp-content/uploads/2014/03/jason1.png",
"Hairstylist", "Jason12", "Jason Krejberg", "Monday-Friday 11am to 8pm", "yes", 
"Owner - Helmet Salon (2009 to present)",
"Axis (Vancouver -1996)
Coupe-bizzarre (Toronto)
Vidal Sassoon (Toronto) 
Coupe-bizarre (Montreal, one training with stylist)", CURDATE(), CURDATE());