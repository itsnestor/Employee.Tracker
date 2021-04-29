create database employeeTracker_db;

use employeeTracker_db;

create table department (
	id int not null auto_increment,
	name varchar(30) not null,
    primary key (id)
);

create table role (
	id int not null auto_increment,
    title varchar(30),
    salary decimal(10, 4),
    department_id int,
    primary key (id)
);

create table employee (
	id int not null auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    primary key (id)
);