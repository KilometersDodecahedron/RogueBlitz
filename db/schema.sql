DROP DATABASE IF EXISTS rogueBlitz_db;
CREATE DATABASE rogueBlitz_db;
USE rogueBlitz_db;

CREATE TABLE high_scores (
	id int auto_increment not null,
    score int not null,
    primary key (id)
);