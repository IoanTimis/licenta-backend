-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: license
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `completeProfileTokens`
--

DROP TABLE IF EXISTS `completeProfileTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `completeProfileTokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `completeProfileTokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `completeProfileTokens`
--

LOCK TABLES `completeProfileTokens` WRITE;
/*!40000 ALTER TABLE `completeProfileTokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `completeProfileTokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complete_profile_tokens`
--

DROP TABLE IF EXISTS `complete_profile_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complete_profile_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `complete_profile_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complete_profile_tokens`
--

LOCK TABLES `complete_profile_tokens` WRITE;
/*!40000 ALTER TABLE `complete_profile_tokens` DISABLE KEYS */;
INSERT INTO `complete_profile_tokens` VALUES (1,'841567fcd09f9b95db4aa7fa4bb62e29b7a0be7a71c7f14cc92004d267e3ca6f',15,'2025-03-15 15:44:45','2025-03-15 15:44:45');
/*!40000 ALTER TABLE `complete_profile_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculties`
--

DROP TABLE IF EXISTS `faculties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculties`
--

LOCK TABLES `faculties` WRITE;
/*!40000 ALTER TABLE `faculties` DISABLE KEYS */;
INSERT INTO `faculties` VALUES (1,'UVT','Facultate UVT','2025-01-14 15:26:22','2025-01-14 15:26:22'),(2,'POLI','Facultate POLI','2025-01-14 15:26:44','2025-01-14 15:26:44');
/*!40000 ALTER TABLE `faculties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite_topics`
--

DROP TABLE IF EXISTS `favorite_topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite_topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `topic_id` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `favorite_topics_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favorite_topics_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_topics`
--

LOCK TABLES `favorite_topics` WRITE;
/*!40000 ALTER TABLE `favorite_topics` DISABLE KEYS */;
INSERT INTO `favorite_topics` VALUES (23,1,39,'2025-03-06 16:44:02','2025-03-06 16:44:02'),(24,1,32,'2025-03-06 16:44:03','2025-03-06 16:44:03'),(25,1,39,'2025-03-06 17:16:27','2025-03-06 17:16:27'),(26,1,39,'2025-03-06 17:40:05','2025-03-06 17:40:05'),(27,15,32,'2025-03-15 16:40:12','2025-03-15 16:40:12'),(28,1,39,'2025-05-08 09:20:06','2025-05-08 09:20:06');
/*!40000 ALTER TABLE `favorite_topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_students`
--

DROP TABLE IF EXISTS `my_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher_id` int NOT NULL,
  `student_id` int NOT NULL,
  `request_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teacher_id` (`teacher_id`),
  KEY `student_id` (`student_id`),
  KEY `request_id` (`request_id`),
  CONSTRAINT `my_students_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `my_students_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `my_students_ibfk_3` FOREIGN KEY (`request_id`) REFERENCES `topic_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_students`
--

LOCK TABLES `my_students` WRITE;
/*!40000 ALTER TABLE `my_students` DISABLE KEYS */;
/*!40000 ALTER TABLE `my_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requested_topic_comments`
--

DROP TABLE IF EXISTS `requested_topic_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requested_topic_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `request_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `request_id` (`request_id`),
  CONSTRAINT `requested_topic_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `requested_topic_comments_ibfk_2` FOREIGN KEY (`request_id`) REFERENCES `topic_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requested_topic_comments`
--

LOCK TABLES `requested_topic_comments` WRITE;
/*!40000 ALTER TABLE `requested_topic_comments` DISABLE KEYS */;
INSERT INTO `requested_topic_comments` VALUES (59,'test',15,141,'2025-03-22 13:08:58','2025-03-22 13:08:58'),(60,'test',15,142,'2025-03-22 13:10:59','2025-03-22 13:10:59');
/*!40000 ALTER TABLE `requested_topic_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specializations`
--

DROP TABLE IF EXISTS `specializations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specializations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `faculty_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `faculty_id` (`faculty_id`),
  CONSTRAINT `specializations_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specializations`
--

LOCK TABLES `specializations` WRITE;
/*!40000 ALTER TABLE `specializations` DISABLE KEYS */;
INSERT INTO `specializations` VALUES (1,'IR','Specializare UVT',1,'2025-01-14 15:27:06','2025-01-14 15:27:06'),(2,'IE','Specializare UVT',1,'2025-01-14 15:27:25','2025-01-14 15:27:25'),(3,'IM','Specializare POLI',2,'2025-01-14 15:28:05','2025-01-14 15:28:05'),(4,'IS','Specializare POLI',2,'2025-01-14 15:28:18','2025-01-14 15:28:18');
/*!40000 ALTER TABLE `specializations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specializations_topics`
--

DROP TABLE IF EXISTS `specializations_topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specializations_topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `specialization_id` int NOT NULL,
  `topic_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `specializations_topics_topic_id_specialization_id_unique` (`specialization_id`,`topic_id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `specializations_topics_ibfk_1` FOREIGN KEY (`specialization_id`) REFERENCES `specializations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `specializations_topics_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specializations_topics`
--

LOCK TABLES `specializations_topics` WRITE;
/*!40000 ALTER TABLE `specializations_topics` DISABLE KEYS */;
INSERT INTO `specializations_topics` VALUES (43,1,39,'2025-02-28 12:00:25','2025-02-28 12:00:25'),(44,2,39,'2025-02-28 12:00:25','2025-02-28 12:00:25'),(57,1,32,'2025-03-04 14:16:52','2025-03-04 14:16:52'),(73,1,48,'2025-03-06 10:18:38','2025-03-06 10:18:38'),(74,2,49,'2025-03-06 17:30:17','2025-03-06 17:30:17'),(75,2,50,'2025-03-06 17:33:38','2025-03-06 17:33:38'),(76,2,51,'2025-03-06 17:34:37','2025-03-06 17:34:37'),(77,2,52,'2025-03-06 17:34:59','2025-03-06 17:34:59'),(78,2,53,'2025-03-06 17:36:02','2025-03-06 17:36:02'),(79,2,54,'2025-03-06 17:36:14','2025-03-06 17:36:14'),(80,2,55,'2025-03-06 17:36:53','2025-03-06 17:36:53'),(81,2,56,'2025-03-06 17:36:55','2025-03-06 17:36:55'),(82,2,57,'2025-03-06 17:36:56','2025-03-06 17:36:56'),(83,2,58,'2025-03-06 17:37:50','2025-03-06 17:37:50'),(84,2,59,'2025-03-06 17:38:05','2025-03-06 17:38:05'),(85,2,60,'2025-03-06 17:39:40','2025-03-06 17:39:40'),(86,2,61,'2025-03-06 17:39:56','2025-03-06 17:39:56'),(87,2,62,'2025-05-08 09:20:45','2025-05-08 09:20:45');
/*!40000 ALTER TABLE `specializations_topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_emails`
--

DROP TABLE IF EXISTS `teacher_emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_emails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_emails`
--

LOCK TABLES `teacher_emails` WRITE;
/*!40000 ALTER TABLE `teacher_emails` DISABLE KEYS */;
INSERT INTO `teacher_emails` VALUES (1,'ioan.timis02@e-uvt.ro',NULL,NULL);
/*!40000 ALTER TABLE `teacher_emails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_requests`
--

DROP TABLE IF EXISTS `topic_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` enum('pending','accepted','rejected','confirmed') NOT NULL DEFAULT 'pending',
  `teacher_id` int NOT NULL,
  `student_id` int NOT NULL,
  `topic_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teacher_id` (`teacher_id`),
  KEY `student_id` (`student_id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `topic_requests_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `topic_requests_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `topic_requests_ibfk_3` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_requests`
--

LOCK TABLES `topic_requests` WRITE;
/*!40000 ALTER TABLE `topic_requests` DISABLE KEYS */;
INSERT INTO `topic_requests` VALUES (141,'pending',2,15,32,'2025-03-22 13:08:58','2025-03-22 13:08:58'),(142,'pending',2,15,39,'2025-03-22 13:10:59','2025-03-22 13:10:59');
/*!40000 ALTER TABLE `topic_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `keywords` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `education_level` enum('bsc','msc') NOT NULL DEFAULT 'bsc',
  `slots` int NOT NULL DEFAULT '1',
  `user_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (32,'Aplicatie Web','js python java nodeJs nextJs','Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam tincidunt nunc non mi maximus fringilla. Nunc feugiat lacus ut nisl tincidunt, dictum fringilla sem vulputate. Nunc quis pretium lectus. Curabitur hendrerit consectetur erat, at maximus risus sagittis et. Integer ac augue vel massa porta elementum. Vestibulum nec felis sollicitudin, vestibulum purus quis, blandit erat. Integer sem nulla, imperdiet quis sollicitudin ut, feugiat sed nisl. Vivamus erat purus, tincidunt dictum aliquam eget, malesuada et nunc. Pellentesque mollis cursus nisi, eu faucibus orci molestie id.\n\nNam rhoncus consequat nisi vitae feugiat. Vestibulum et turpis non velit rutrum ornare. Duis placerat venenatis odio sed ornare. Duis et diam at nisl pharetra laoreet. In pellentesque congue erat, dignissim tincidunt tellus semper sollicitudin. Praesent non faucibus neque. Nam posuere vehicula risus a congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur justo at sapien euismod tempor. Nulla elementum enim in sapien auctor, eu ultricies dolor tincidunt. Aliquam posuere justo ex, at laoreet mi auctor aliquet. Morbi dui augue, posuere non risus a, interdum semper tellus. Ut euismod elementum lorem sit amet tincidunt. Nulla libero quam, elementum a lectus sodales, malesuada dictum erat. In porta lacus at tortor aliquam tempus. Quisque ac tincidunt nisl, nec condimentum mi.','bsc',4,2,'2025-02-12 09:10:40','2025-03-15 15:37:25'),(39,'Aplicatie selectie teme BSC/MSC online','html css js react','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum lacus quis est consectetur, in mollis dolor hendrerit. Donec massa arcu, gravida ac ultrices in, tempor volutpat sem. In tellus velit, bibendum sed enim vitae, pretium placerat libero. Phasellus quam magna, pulvinar quis sodales at, accumsan non leo. Vivamus interdum consequat lorem a vulputate. Sed quis molestie arcu. Donec feugiat quam pulvinar augue interdum interdum at id erat. Cras semper leo lacus, ac venenatis magna ornare vitae. Phasellus dapibus enim nisi. Curabitur felis turpis, laoreet vel vestibulum a, luctus nec libero. Sed quis molestie elit, vitae dapibus lorem.\n\nInteger sodales, ligula quis ultrices vulputate, felis ante lacinia quam, nec vulputate felis nisl et metus. Praesent a lacinia dui. Quisque iaculis lacus at vestibulum porttitor. Nam quis scelerisque ante. In laoreet felis sit amet felis rhoncus pretium. Aliquam sagittis velit ac euismod iaculis. Nam suscipit et felis et tempus. Fusce molestie dapibus lectus, quis scelerisque lorem pretium quis. Etiam ullamcorper risus a semper rhoncus. Phasellus vitae mi turpis.\n\nNunc sagittis pulvinar eros non hendrerit. Fusce non malesuada quam, non fermentum augue. Fusce et accumsan lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris id diam elementum, auctor urna eu, dictum sapien. Integer varius diam quis magna dignissim eleifend ultrices quis felis. Sed a mi ullamcorper, venenatis justo eu, mollis mauris. Praesent interdum, arcu nec vestibulum ullamcorper, ex ipsum ultricies urna, quis condimentum leo libero a urna. Donec eu elit vehicula, tincidunt mauris vel, suscipit felis. Vivamus tristique, nulla nec ornare condimentum, massa nibh sollicitudin nunc, quis elementum urna nibh a augue. Ut eros urna, convallis sit amet molestie eu, luctus sit amet mauris. Duis ac posuere lorem. Phasellus quis iaculis ligula. Pellentesque est mi, malesuada venenatis leo vel, pellentesque consectetur tellus.','bsc',7,2,'2025-02-28 12:00:25','2025-03-06 17:08:51'),(48,'test','test','test','bsc',3,2,'2025-03-06 10:18:38','2025-03-15 17:12:41'),(49,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-03-06 17:30:17','2025-03-06 17:30:17'),(50,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-03-06 17:33:38','2025-03-06 17:33:38'),(51,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-03-06 17:34:37','2025-03-06 17:34:37'),(52,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-03-06 17:34:59','2025-03-06 17:34:59'),(53,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-03-06 17:36:02','2025-03-06 17:36:02'),(54,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-03-06 17:36:14','2025-03-06 17:36:14'),(55,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-03-06 17:36:53','2025-03-06 17:36:53'),(56,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-03-06 17:36:55','2025-03-06 17:36:55'),(57,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-03-06 17:36:56','2025-03-06 17:36:56'),(58,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-03-06 17:37:50','2025-03-06 17:37:50'),(59,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-03-06 17:38:05','2025-03-06 17:38:05'),(60,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-03-06 17:39:40','2025-03-06 17:39:40'),(61,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-03-06 17:39:56','2025-03-06 17:39:56'),(62,'Test Topic','test, cypress, automation','This is a test topic','bsc',5,1,'2025-05-08 09:20:45','2025-05-08 09:20:45');
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `education_level` enum('bsc','msc') DEFAULT NULL,
  `type` enum('student','teacher','admin') DEFAULT NULL,
  `complete_profile` tinyint(1) DEFAULT '0',
  `faculty_id` int DEFAULT NULL,
  `specialization_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `faculty_id` (`faculty_id`),
  KEY `specialization_id` (`specialization_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`specialization_id`) REFERENCES `specializations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin@gmail.com','','$2a$08$saxLe9W5N/AnwNtE/79f.eMF.8hCaLWJZYg2erSt6LhnseI.zI8cW',NULL,'admin',1,NULL,NULL,'2025-01-14 15:25:24','2025-01-14 15:25:24'),(2,'Ioan','Prof','ioan.timis02@e-uvt.ro','Dr','$2a$08$dlwHvo9BlsqsySdw50UsweNP7Q3Onu/hYJPiyBEUXUplIrL7cQWHy',NULL,'teacher',1,NULL,NULL,'2025-01-14 15:29:37','2025-01-14 15:29:42'),(14,'test','test','test@example.com',NULL,'$2a$08$7Ofsxcw0FPe1R5i/WgATq.4YjXws.P7/6QuVsuNuVqsJ9A23w26Zi',NULL,'student',1,NULL,NULL,'2025-03-06 15:38:05','2025-03-06 15:38:05'),(15,'Ioan','Timiș','timisionut2000@gmail.com',NULL,'$2a$08$khhWG7qmdaRR8UCLmaGm4OM4xJRyV6oVSUflvQxe7476e1pIUbUwS','bsc','student',1,1,1,'2025-03-15 15:44:45','2025-03-15 15:56:18');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-03 10:48:22
