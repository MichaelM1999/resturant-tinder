DROP DATABASE IF EXISTS `picki_db`;
CREATE DATABASE `picki_db`;
USE `picki_db`;

-- TABLE NEEDS: REACTIONS, YELP_ID, and whatever else to be determined
create table restaurants (
	id integer(1) auto_increment not null,
    name varchar(150) not null,
    primary key (id)
);

