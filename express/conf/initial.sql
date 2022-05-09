create database if not exists project;

use project;

# 用户列表
create table if not exists user
(
    first_name varchar(100),
    last_name  varchar(100),
    username   varchar(100),
    password   varchar(100),
    gender     varchar(6),
    email      varchar(100)
);

# 测试用数据
insert into user(first_name, last_name, username, password, gender, email) value
    ('a', 'b', 'user1', 'a1', 'man', '123456789@gmail.com'),
    ('aa', 'bb', 'user2', 'a2', 'woman', '123456789@gmail.com'),
    ('aa', 'bb', 'user2', 'a2', 'woman', '123456789@gmail.com'),
    ('aaa', 'bbb', 'test', '123', 'woman', '123456789@gmail.com');

# 管理员列表
create table if not exists Administrator
(
    Administrator_account varchar(100)
);

insert into Administrator(Administrator_account) value
    ('user3');

drop table Administrator;
drop table user;