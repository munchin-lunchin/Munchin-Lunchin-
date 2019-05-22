DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS following;
DROP TABLE IF EXISTS restaurant;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
   _id serial primary key, 
   username varchar(20)  not null unique,
   password varchar(20)  not null,
   firstname varchar  not null,
   lastname varchar  not null,
   email text not null unique
 )

INSERT INTO users (username, password, firstname, lastname, email)
VALUES ('codesmith', 'ilovetesting', 'code', 'smith', 'code@codesmith.io' ); 


CREATE TABLE restaurant (
    _id serial NOT NULL,
    rating numeric NOT NULL,
    "reviewCount" smallint NOT NULL,
    "yelpID" character varying(50) NOT NULL,
    name character varying(500) NOT NULL,
    "displayAddress" character varying(500) NOT NULL,
    "imageURL" character varying(200) NOT NULL,
    url character varying(200) NOT NULL,
    price character varying(5) NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL
);

CREATE TABLE likes (
    _id serial NOT NULL,
    user_id integer NOT NULL,
    rest_id integer NOT NULL
);


CREATE TABLE following (
    _id serial NOT NULL,
    userid integer NOT NULL,
    followingid integer NOT NULL
);


ALTER TABLE ONLY restaurant
    ADD CONSTRAINT restaurant_yelp_id_key UNIQUE ("yelpID");


ALTER TABLE ONLY restaurant
    ADD CONSTRAINT restaurant_url_key UNIQUE (url);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);

ALTER TABLE ONLY users
  ADD CONSTRAINT users_pkey PRIMARY KEY (_id);


ALTER TABLE ONLY restaurant
 ADD CONSTRAINT restaurant_pkey PRIMARY KEY (_id);


ALTER TABLE ONLY likes
    ADD CONSTRAINT likes_rest_id_fkey FOREIGN KEY (rest_id) REFERENCES restaurant(_id);


ALTER TABLE ONLY likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(_id);

ALTER TABLE ONLY following
    ADD CONSTRAINT following_followingid_fkey FOREIGN KEY (followingid) REFERENCES public.users(_id);


ALTER TABLE ONLY following
    ADD CONSTRAINT following_userid_fkey FOREIGN KEY (userid) REFERENCES users(_id);

