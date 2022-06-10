-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: project
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

--
-- Current Database: `project`
--

CREATE DATABASE /*!32312 IF NOT EXISTS */ `project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `project`;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event`
(
    `event_id`   int          NOT NULL AUTO_INCREMENT,
    `title`      varchar(100) NOT NULL,
    `address`    varchar(100) NOT NULL,
    `begin_time` datetime     NOT NULL,
    `end_time`   datetime     NOT NULL,
    `state`      int          NOT NULL,
    `note`       varchar(255) NOT NULL,
    `notice`     tinyint(1)   NOT NULL,
    `type`       int          NOT NULL,
    PRIMARY KEY (`event_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event`
    DISABLE KEYS */;
INSERT INTO `event`
VALUES (1, 'test event1', 'address', '2022-06-15 12:00:00', '2022-06-15 14:00:00', 0, 'no any note', 1, 0),
       (2, 'public event', 'address', '2022-06-11 07:00:00', '2022-06-12 08:00:00', 1, 'no any note', 1, 1),
       (3, 'test event1', 'address', '2022-06-23 05:00:00', '2022-06-23 09:00:00', 0, 'no any note', 1, 1),
       (4, 'test event1', 'address', '2022-06-26 13:00:00', '2022-06-26 17:00:00', 1, 'no any note', 1, 1),
       (5, 'test event1', 'address', '2022-06-27 16:00:00', '2022-06-29 18:00:00', 2, 'no any note', 1, 1);
/*!40000 ALTER TABLE `event`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_list`
--

DROP TABLE IF EXISTS `event_list`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_list`
(
    `username` varchar(100) NOT NULL,
    `event_id` int          NOT NULL,
    KEY `username` (`username`),
    KEY `event_id` (`event_id`),
    CONSTRAINT `event_list_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
    CONSTRAINT `event_list_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_list`
--

LOCK TABLES `event_list` WRITE;
/*!40000 ALTER TABLE `event_list`
    DISABLE KEYS */;
INSERT INTO `event_list`
VALUES ('test', 1),
       ('test', 2);
/*!40000 ALTER TABLE `event_list`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user`
(
    `first_name`  varchar(100) NOT NULL,
    `last_name`   varchar(100) NOT NULL,
    `username`    varchar(100) NOT NULL,
    `password`    varchar(100) NOT NULL,
    `gender`      int          NOT NULL,
    `email`       varchar(100) NOT NULL,
    `permissions` int          NOT NULL DEFAULT '0',
    PRIMARY KEY (`username`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user`
    DISABLE KEYS */;
INSERT INTO `user`
VALUES ('aaa', 'bbb', 'admin', '123', 0, '2222@gmail.com', 1),
       ('aaa', 'bbb', 'admin2', '123', 0, '3333@gmail.com', 1),
       ('aaa', 'bbb', 'test', '123', 0, '1111@gmail.com', 0),
       ('a', 'b', 'user1', 'a1', 1, '123@gmail.com', 0),
       ('aa', 'bb', 'user2', 'a2', 0, '456@gmail.com', 0),
       ('aa', 'bb', 'user3', 'a2', 0, '789@gmail.com', 0);
/*!40000 ALTER TABLE `user`
    ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE = @OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;

-- Dump completed on 2022-06-10  7:57:27
