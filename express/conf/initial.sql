create database if not exists project;

use project;

# 用户列表
create table if not exists user
(
    first_name  varchar(100)     NOT NULL,
    last_name   varchar(100)     NOT NULL,
    username    varchar(100)     NOT NULL PRIMARY KEY,
    password    varchar(100)     NOT NULL,
    gender      INT(1)           NOT NULL,
    email       varchar(100)     NOT NULL,
    permissions INT(1) DEFAULT 0 NOT NULL
);

# 私人事件
create table if not exists event
(
    # 外键
    username   varchar(100) NOT NULL,

    # 主键 UUID 唯一ID
    event_id   varchar(100) PRIMARY KEY,

    title      varchar(100) NOT NULL,
    address    varchar(100) NOT NULL,
    begin_time date         NOT NULL,
    end_time   date         NOT NULL,
    state      INT(1)       NOT NULL,
    note       varchar(255) NOT NULL,
    notice     bool         NOT NULL,

    # 私人事件 0
    type       INT(1)       NOT NULL
);

# 公共事件
create table if not exists public_event
(
    # 外键
    username   varchar(100) NOT NULL,

    # 主键 UUID 唯一ID
    event_id   varchar(100) PRIMARY KEY,

    title      varchar(100) NOT NULL,
    address    varchar(100) NOT NULL,
    begin_time date         NOT NULL,
    end_time   date         NOT NULL,
    state      INT(1)       NOT NULL,
    note       varchar(255) NOT NULL,
    notice     bool         NOT NULL,

    # 公共事件 1
    type       INT(1)       NOT NULL
);

# 测试用数据
insert into event (event_id, username, title, address, begin_time, end_time, state, note, notice, type) value
    (UUID(), 'test', 'test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 0),
    (UUID(), 'test', 'test event2', 'address', '2022-06-30-00:00', '2022-06-30-00:00', 1, 'no any note', TRUE, 0),
    (UUID(), 'xxx', 'test event1', 'address', '2022-07-28-00:00', '2022-07-28-00:00', 2, 'no any note', TRUE, 0);

insert into public_event (event_id, username, title, address, begin_time, end_time, state, note, notice, type) value
    (UUID(), 'public', 'test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 0),
    (UUID(), 'public', 'test event2', 'address', '2022-06-30-00:00', '2022-06-30-00:00', 1, 'no any note', TRUE, 0),
    (UUID(), 'public', 'test event3', 'address', '2022-07-28-00:00', '2022-07-28-00:00', 2, 'no any note', TRUE, 0);

insert into user(first_name, last_name, username, password, gender, email, permissions) value
    ('a', 'b', 'user1', 'a1', 1, '123@gmail.com', 0),
    ('aa', 'bb', 'user2', 'a2', 0, '456@gmail.com', 0),
    ('aa', 'bb', 'user3', 'a2', 0, '789@gmail.com', 0),
    ('aaa', 'bbb', 'test', '123', 0, '1111@gmail.com', 0),
    ('aaa', 'bbb', 'admin', '123', 0, '2222@gmail.com', 1);

drop table user;
drop schema project;