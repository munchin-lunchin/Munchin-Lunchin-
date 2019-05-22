DROP TABLE IF EXISTS users;

CREATE TABLE users(
   _id serial primary key, 
   username varchar(20)  not null unique,
   password varchar(20)  not null,
   firstname varchar  not null,
   lastname varchar  not null,
   email text not null unique
 )

 create role lunchin_svc_acct with login password 'ilovetesting';
grant all privileges on database "lunchin" to "lunchin_svc_acct";

ALTER role lunchin_svc_acct with superuser;
