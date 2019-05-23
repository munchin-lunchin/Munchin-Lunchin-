DROP TABLE IF EXISTS following;

CREATE TABLE following(
  id int primary key,
  userid int,
  followingid int
)