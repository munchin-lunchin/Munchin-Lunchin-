DROP TABLE IF EXISTS likes;

CREATE TABLE likes(
  _id serial unique, 
  primary key ( user_id , rest_id ) ,
  rest_id  int REFERENCES restaurant (_id),
  user_id  int REFERENCES  users (_id) 
);
