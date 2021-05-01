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
    salary decimal(10, 2),
    department_id int,
    primary key (id),
    foreign key (department_id) references department(id)
);

create table employee (
	id int not null auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    primary key (id),
    foreign key (role_id) references role(id),
    foreign key (manager_id) references employee(id)
);


-- info to test with 
insert into department (name) values ('Sales');
insert into department (name) values ('Engineering');
insert into department (name) values ('Finance');
insert into department (name) values ('Legal');

insert into role (title, salary, department_id) values ('Sales Lead', 100000, 1);
insert into role (title, salary, department_id) values ('Salesperson', 80000, 1);
insert into role (title, salary, department_id) values ('Lead Engineer', 150000, 2);
insert into role (title, salary, department_id) values ('Legal Team Lead', 250000, 4);
insert into role (title, salary, department_id) values ('Lawyer', 190000, 4);
insert into role (title, salary, department_id) values ('Accountant', 125000, 3);
insert into role (title, salary, department_id) values ('Software Engineer', 120000, 2);


insert into employee (first_name, last_name, role_id) values ('Nestor', 'Campaner', 3);
insert into employee (first_name, last_name, role_id, manager_id) values ('Ceejay', 'Reyes', 7, 1);
insert into employee (first_name, last_name, role_id) values ('Julian', 'Seepaul', 1);
insert into employee (first_name, last_name, role_id, manager_id) values ('Charles', 'Reyes', 2, 3);
insert into employee (first_name, last_name, role_id) values ('Julia', 'Reyes', 4);
insert into employee (first_name, last_name, role_id, manager_id) values ('Ejay', 'Reyes', 5, 5);
insert into employee (first_name, last_name, role_id) values ('Kevin', 'Ramos', 6);
insert into employee (first_name, last_name, role_id, manager_id) values ('Vince', 'Hisatake', 7, 1);