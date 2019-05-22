DROP TABLE IF EXISTS restaurant;


CREATE TABLE restaurant(
  _id int primary key ,
  rating numeric   not null,
  "reviewCount" numeric not null,
  "yelpID" varchar(50)  not null unique,
  name varchar(500),
  "displayAddress" varchar(500),
  "imageURL" varchar(500),
  url varchar(500) unique,
  price varchar(5),
  latitude numeric,
  longitude numeric
)