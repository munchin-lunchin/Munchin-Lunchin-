DROP TABLE IF EXISTS messages;

CREATE TABLE messages(
  id int primary key,
  fromUser varchar(25),
  msg varchar(250)
)