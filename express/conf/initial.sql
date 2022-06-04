drop schema if exists project;

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

# 事件
create table if not exists event
(
    # 主键 UUID 唯一ID
    event_id   INT AUTO_INCREMENT PRIMARY KEY,

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

# 多对多中间表
create table if not exists event_list
(
    username varchar(100) NOT NULL,
    event_id INT          NOT NULL,

    # 确定 外键
    FOREIGN KEY (username) REFERENCES user (username),
    FOREIGN KEY (event_id) REFERENCES event (event_id)
);

# 测试用数据

insert into user(first_name, last_name, username, password, gender, email, permissions) value
    ('a', 'b', 'user1', 'a1', 1, '123@gmail.com', 0),
    ('aa', 'bb', 'user2', 'a2', 0, '456@gmail.com', 0),
    ('aa', 'bb', 'user3', 'a2', 0, '789@gmail.com', 0),
    ('aaa', 'bbb', 'test', '123', 0, '1111@gmail.com', 0),
    ('aaa', 'bbb', 'admin2', '123', 0, '3333@gmail.com', 1),
    ('aaa', 'bbb', 'admin', '123', 0, '2222@gmail.com', 1);

insert into event (title, address, begin_time, end_time, state, note, notice, type) value
    ('test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 0);

INSERT INTO event_list(username, event_id)
VALUES ('test', LAST_INSERT_ID());

insert into event (title, address, begin_time, end_time, state, note, notice, type) value
    ('public event', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 1, 'no any note', TRUE, 1);

INSERT INTO event_list(username, event_id)
VALUES ('test', LAST_INSERT_ID());

insert into event (title, address, begin_time, end_time, state, note, notice, type) value
    ('test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 1),
    ('test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 1),
    ('test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 1),
    ('test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 1),
    ('test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 1),
    ('test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 1),
    ('test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 1),
    ('test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 1),
    ('test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 1),
    ('test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 1),
    ('test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 1),
    ('test event1', 'address', '2022-06-23-00:00', '2022-06-23-00:00', 0, 'no any note', TRUE, 1);