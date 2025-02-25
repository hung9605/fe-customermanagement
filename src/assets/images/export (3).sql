-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: dbtest
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `date_of_birth` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `mid_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,1,'2024-12-03 13:04:40.406000','1970-01-01 08:00:00.000000','2024-12-19 13:50:53.811000','Ha Noi','tnd','Nguyen','Tuan','Dac ','098456456','tnd'),(2,0,NULL,'1970-01-19 00:00:00.000000',NULL,'Vinh Phuc2',NULL,'Nguyen','binh','Van ','0985679999',NULL),(3,1,NULL,'1970-01-01 08:00:00.000000','2024-12-19 13:51:16.471000','Phuc tho',NULL,'Nguyen','Binh','Van  ','096345123','tnd'),(25,1,'2024-12-05 16:32:08.988000','1970-01-01 08:00:00.000000','2025-02-06 14:03:56.015000','hgh','tnd','Nguyen','Tet','Dac  ','098456456','tnd'),(26,1,'2024-12-06 09:29:15.935000','2010-05-05 00:00:00.000000','2024-12-19 13:51:33.667000','vĩnh phúc','tnd','Nguyen','Tuan','Dac ','0984567845','tnd'),(31,0,NULL,'2018-01-01 00:00:00.000000','2024-12-11 17:03:21.781000','ha nam',NULL,'Nguyen','Tuan','Van  ','0981234568','tnd'),(32,0,'2024-12-09 13:48:35.877000',NULL,NULL,'hn','tnd','nguyen','i','van','098456234',NULL),(33,0,'2024-12-10 10:36:16.422000',NULL,NULL,'rere','tnd','ffdf','ffdf','','9939399393',NULL),(34,0,'2024-12-11 13:01:23.857000','2024-12-02 00:00:00.000000',NULL,'hn','tnd','pp','pp','','0985675678',NULL),(35,0,'2024-12-11 13:06:08.648000','2024-12-02 00:00:00.000000',NULL,'hn','tnd','nguyen','phuong','van','0981234568',NULL),(36,0,'2024-12-11 13:33:26.278000','2024-12-08 00:00:00.000000',NULL,'vp','tnd','ppp','ppp','','0987654986',NULL),(37,0,'2024-12-11 13:33:49.656000','2024-12-12 00:00:00.000000',NULL,'vp1','tnd','Nguyen','Tua','Van ','0981231238',NULL),(38,0,NULL,'2020-01-20 00:00:00.000000','2024-12-11 17:00:57.483000','Vinh Phuc8',NULL,'Nguyen','Anh','Van    ','0985675608','tnd'),(39,1,'2024-12-12 09:20:47.026000','2024-12-02 00:00:00.000000',NULL,'hn','tnd','pppp','pppp','','0981234565',NULL),(40,0,'2024-12-19 13:28:15.814000','2024-12-10 00:00:00.000000',NULL,'hà nội','tnd','nguyen','a','van ','0984561236',NULL),(41,1,'2024-12-19 14:05:27.431000','1996-01-12 00:00:00.000000','2024-12-25 12:38:38.446000','Hà Nội','tnd','Nguyễn','Tuấn','Đắc  ','0984554568','tnd'),(42,0,'2024-12-27 15:25:59.214000','2024-12-02 00:00:00.000000',NULL,'hà nội','tnd','nguyen','tuan','dac ','0984546565',NULL),(43,0,'2025-01-07 15:38:28.446000','2015-01-06 00:00:00.000000',NULL,'hà nội','tnd','nguyen','anh','hoang ','0988334456',NULL),(44,0,'2025-01-07 15:41:18.868000','2012-01-05 00:00:00.000000',NULL,'hải dương','tnd','nguyen','t','van ','9687444564',NULL),(45,0,'2025-01-15 16:50:39.701000','2010-01-12 00:00:00.000000',NULL,'ha noi','tnd','tesst','tesst','','0984564565',NULL),(46,0,'2025-01-16 08:56:25.818000','2015-01-06 00:00:00.000000',NULL,'ha noi','tnd','test','test','','0984564565',NULL),(47,0,'2025-01-17 09:46:41.647000','2020-01-20 00:00:00.000000',NULL,'hà nội','tnd','test','test','','0983453456',NULL),(48,0,'2025-01-17 14:30:57.734000','2015-01-08 00:00:00.000000',NULL,'hà nam','tnd','nguyễn','bình','văn ','0981231234',NULL),(49,0,'2025-01-17 14:33:53.804000','2016-01-15 00:00:00.000000',NULL,'hà nội','tnd','nguyễn','cường','văn ','0981231236',NULL),(50,0,'2025-01-17 14:39:03.236000','2025-01-16 00:00:00.000000',NULL,'ghg','tnd','hghg','hghg','','0985675678',NULL),(51,0,'2025-01-17 14:40:11.859000','2012-01-16 00:00:00.000000',NULL,'fg','tnd','ể','ể','','5556678989',NULL),(52,0,'2025-01-17 14:40:42.828000','2025-01-12 00:00:00.000000',NULL,'vf','tnd','áaa','áaa','','3344556677',NULL),(53,0,'2025-01-17 15:21:17.666000','2025-01-12 00:00:00.000000',NULL,'ggjfkgj','tnd','fdfhd','fdfhd','','0984564569',NULL),(54,0,'2025-01-20 16:48:08.918000','2015-01-12 00:00:00.000000',NULL,'hà nội','tnd','test','test','','0984546456',NULL),(55,0,'2025-01-20 17:56:14.061000','2015-01-12 00:00:00.000000',NULL,'vĩnh phúc','tnd','nguyễn','','văn t ','0981234545',NULL),(56,0,'2025-01-21 15:05:52.470000','2012-01-20 00:00:00.000000',NULL,'hà nội','tnd','test','test','','0985657567',NULL),(57,0,'2025-01-21 15:14:34.287000','2012-01-20 00:00:00.000000',NULL,'vĩnh phúc','tnd','đào','an','văn ','0961234562',NULL),(58,0,'2025-01-22 14:03:24.839000','2015-01-19 00:00:00.000000',NULL,'Hà Nam','tnd','đào','mạnh','văn ','0256456963',NULL),(59,0,'2025-01-22 14:31:05.845000','2021-01-20 00:00:00.000000',NULL,'hà tây','tnd','nguyễn','khánh','đức ','0235647896',NULL),(60,0,'2025-01-22 14:37:05.379000','2025-01-19 00:00:00.000000',NULL,'jhjh','tnd','ytyt','ytyt','','7676898999',NULL),(61,0,'2025-02-03 13:50:37.655000','2015-02-02 00:00:00.000000',NULL,'vĩnh tường','tnd','đào','mạnh','văn ','0981234564',NULL),(62,0,'2025-02-04 09:52:38.588000','2025-02-04 00:00:00.000000',NULL,'hà nội','tnd','nguyễn','an','văn ','0984546456',NULL),(63,0,'2025-02-04 09:57:26.834000','2015-02-04 00:00:00.000000',NULL,'hà nội','tnd','nguyễn','bình','văn ','0981231235',NULL),(64,0,'2025-02-04 09:58:10.887000','2015-02-02 00:00:00.000000',NULL,'hn','tnd','test','test','','0983454555',NULL),(65,0,'2025-02-04 10:10:38.082000','2025-02-02 00:00:00.000000',NULL,'hà nội','tnd','test','test','','0984564566',NULL),(66,0,'2025-02-04 12:47:50.849000','2025-02-02 00:00:00.000000',NULL,'gfg','tnd','trsst','trsst','','0981234564',NULL),(67,0,'2025-02-04 12:51:15.704000','2025-02-04 00:00:00.000000',NULL,'hjhjh','tnd','test','test','','0981231234',NULL),(68,0,'2025-02-04 13:05:06.316000','2015-02-02 00:00:00.000000',NULL,'hn','tnd','êtte','êtte','','0981231234',NULL),(69,0,'2025-02-04 13:16:41.954000','2025-02-02 00:00:00.000000',NULL,'hn','tnd','têtte','têtte','','0981231234',NULL),(70,0,'2025-02-04 13:17:41.579000','2025-02-02 00:00:00.000000',NULL,'hjhj','tnd','hjhjhj','hjhjhj','','0985678989',NULL),(71,0,'2025-02-04 13:24:14.881000','2025-02-02 00:00:00.000000',NULL,'hn','tnd','jgjgjgj','jgjgjgj','','0981231234',NULL),(72,0,'2025-02-04 13:24:59.721000','2015-02-02 00:00:00.000000',NULL,'hn','tnd','ptptptp','ptptptp','','0981231235',NULL),(73,0,'2025-02-04 13:28:04.946000','2015-02-04 00:00:00.000000',NULL,'hn','tnd','fdfdffd','fdfdffd','','0981231235',NULL),(74,0,'2025-02-04 13:30:01.519000','2025-02-02 00:00:00.000000',NULL,'hn','tnd','tutut','tutut','','0981231233',NULL),(75,0,'2025-02-05 14:27:02.906000','2012-02-02 00:00:00.000000',NULL,'hà nội','tnd','nguyễn','an','văn ','0235645632',NULL),(76,0,'2025-02-07 15:37:56.451000','2024-02-03 00:00:00.000000',NULL,'hà nội','tnd','đào','khánh','đức ','0981231235',NULL),(77,0,'2025-02-07 16:30:57.780000','2025-02-02 00:00:00.000000',NULL,'hn','tnd','nguyễn','an','văn ','0981231234',NULL),(78,0,'2025-02-07 17:05:26.789000','2025-02-05 00:00:00.000000',NULL,'hn','tnd','test','test','','5454543554',NULL),(79,0,'2025-02-07 17:15:58.765000','2025-02-06 00:00:00.000000',NULL,'hn','tnd','testt','testt','','0912342345',NULL),(80,0,'2025-02-07 18:08:24.213000','2025-02-02 00:00:00.000000',NULL,'hn','tnd','testfd','testfd','','0981231234',NULL),(81,0,'2025-02-10 10:29:26.973000','2025-02-10 00:00:00.000000',NULL,'hn','tnd','đào','khánh','đức ','0981212121',NULL),(82,0,'2025-02-10 10:42:00.483000','2025-02-10 00:00:00.000000',NULL,'hn','tnd','tetst','tetst','','0912341232',NULL),(83,0,'2025-02-10 13:55:36.938000','2025-02-10 00:00:00.000000',NULL,'hn','tnd','gfgjfkgjk','gfgjfkgjk','','0981231232',NULL),(84,0,'2025-02-10 14:35:21.289000','2025-02-10 00:00:00.000000',NULL,'hn','tnd','pppP','pppP','','1234333433',NULL),(85,0,'2025-02-10 17:17:53.204000','2025-02-10 00:00:00.000000',NULL,'hn','tnd','đào','an','văn ','0912312323',NULL),(86,0,'2025-02-10 17:22:28.009000','2025-02-10 00:00:00.000000',NULL,'hn','tnd','đào','khánh','đức ','0981231236',NULL),(87,0,'2025-02-10 17:40:11.258000','2025-02-10 00:00:00.000000',NULL,'hn','tnd','nguyễn','an','văn ','0912322121',NULL),(88,0,'2025-02-11 12:37:58.530000','2024-02-10 00:00:00.000000',NULL,'hà nội','tnd','đào','khánh','đức ','0982342345',NULL),(89,0,'2025-02-11 13:43:05.848000','2024-02-10 00:00:00.000000',NULL,'hn','tnd','test','test','','0981231232',NULL),(90,0,'2025-02-11 14:40:31.999000','2024-02-10 00:00:00.000000',NULL,'hn','tnd','nguyễn','an','văn ','0981231235',NULL),(91,0,'2025-02-11 14:48:57.187000','2025-02-10 00:00:00.000000',NULL,'hn','tnd','PPPP','PPPP','','1231231233',NULL),(92,0,'2025-02-11 14:51:10.220000','2025-02-11 00:00:00.000000',NULL,'hn','tnd','nvff','nvff','','0990902323',NULL),(93,0,'2025-02-11 16:27:10.982000','2025-02-10 00:00:00.000000',NULL,'hn','tnd','đào','an','văn ','0981231234',NULL),(94,0,'2025-02-11 16:45:38.724000','2025-02-10 00:00:00.000000',NULL,'hn','tnd','fdfdfdfd','fdfdfdfd','','0912312312',NULL),(95,0,'2025-02-11 16:58:41.108000','2025-02-11 00:00:00.000000',NULL,'HN','tnd','fdfdf','fdfdf','','0921231112',NULL),(96,0,'2025-02-12 15:06:16.090000','2025-02-10 00:00:00.000000',NULL,'hn','tnd','đào','an','văn ','0981231232',NULL),(97,0,'2025-02-12 16:24:10.195000','2025-02-09 00:00:00.000000',NULL,'hn','tnd','pppppppppp','pppppppppp','','0981231232',NULL),(98,0,'2025-02-12 16:30:32.360000','2025-02-10 00:00:00.000000',NULL,'hn','tnd','đào','khánh','đức ','0981231213',NULL),(99,0,'2025-02-12 17:14:16.496000','2025-02-10 00:00:00.000000',NULL,'hn','tnd','pkgkgkgk','pkgkgkgk','','0981222221',NULL),(100,0,'2025-02-12 17:15:27.578000','2024-02-09 00:00:00.000000',NULL,'hn','tnd','đào','khánh','đức ','0981231234',NULL),(101,0,'2025-02-12 17:17:22.176000','2024-02-10 00:00:00.000000',NULL,'hn','tnd','mvcmvcm','mvcmvcm','','0981231235',NULL),(102,0,'2025-02-13 14:44:21.785000','2025-02-13 00:00:00.000000',NULL,'hn ','tnd','đào','khánh','đức ','0981231232',NULL),(103,0,'2025-02-14 14:19:23.988000','2025-02-14 00:00:00.000000',NULL,'hà nam','tnd','nguyễn','an','văn ','0981231239',NULL),(104,0,'2025-02-17 09:39:15.193000','2025-02-17 00:00:00.000000',NULL,'hn','tnd','đào','khánh','đức ','0982342344',NULL),(105,0,'2025-02-17 17:12:35.981000','2024-02-17 00:00:00.000000',NULL,'hn','tnd','nguyễn','an','văn ','0981231222',NULL),(106,0,'2025-02-20 15:12:13.891000','2024-02-19 00:00:00.000000',NULL,'hà nội','tnd','đào','khánh','đức ','1230987655',NULL),(107,0,'2025-02-20 15:25:42.152000','2021-02-20 00:00:00.000000',NULL,'Vĩnh Phúc','tnd','đào','an','văn ','0982324234',NULL),(108,0,'2025-02-21 13:09:03.060000','2024-02-16 00:00:00.000000',NULL,'vĩnh phúc','tnd','đào','an','văn ','0981565656',NULL),(109,0,'2025-02-21 13:25:42.127000','2024-02-10 00:00:00.000000',NULL,'hà nội','tnd','đào','khánh','đức ','0922323234',NULL),(110,0,'2025-02-21 13:26:13.469000','2024-02-20 00:00:00.000000',NULL,'hà nội','tnd','nguyễn','bình','văn ','0982323322',NULL),(111,0,'2025-02-21 13:26:48.502000','2023-02-17 00:00:00.000000',NULL,'hà nội','tnd','nguyễn','tú','văn ','0985656543',NULL),(112,0,'2025-02-21 13:27:27.600000','2012-02-20 00:00:00.000000',NULL,'hà nam','tnd','đào','cường','văn ','0923234565',NULL),(113,0,'2025-02-24 12:43:21.060000','2024-02-24 00:00:00.000000',NULL,'vĩnh phúc','tnd','Nguyễn','Bình','Văn ','0983434356',NULL),(114,0,'2025-02-24 16:20:17.614000','2024-02-24 00:00:00.000000',NULL,'hà nội','tnd','đào','khánh','đức ','0981221222',NULL),(115,0,'2025-02-25 12:54:14.640000','2025-02-25 00:00:00.000000',NULL,'hà nam','tnd','nguyễn','tú','văn ','0983434322',NULL),(116,0,'2025-02-25 12:54:39.018000','2024-02-25 00:00:00.000000',NULL,'vinh phúc','tnd','đào','mạnh','văn ','0985454332',NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `pazzword` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_data`
--

DROP TABLE IF EXISTS `master_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `key_data` varchar(255) DEFAULT NULL,
  `value_data` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_data`
--

LOCK TABLES `master_data` WRITE;
/*!40000 ALTER TABLE `master_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_examination`
--

DROP TABLE IF EXISTS `medical_examination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_examination` (
  `id` int NOT NULL AUTO_INCREMENT,
  `schedule_medical_id` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `day_of_examination` varchar(255) DEFAULT NULL,
  `sympton` varchar(255) DEFAULT NULL,
  `treatment` varchar(255) DEFAULT NULL,
  `type_of_medicine` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `money` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `total_money` varchar(255) DEFAULT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK478rfy65olpiaodwdm3jwetyn` (`schedule_medical_id`),
  CONSTRAINT `FKndygc9y30bsuhpfedtepwb0yl` FOREIGN KEY (`schedule_medical_id`) REFERENCES `schedule_medical` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_examination`
--

LOCK TABLES `medical_examination` WRITE;
/*!40000 ALTER TABLE `medical_examination` DISABLE KEYS */;
INSERT INTO `medical_examination` VALUES (1,3,NULL,NULL,NULL,NULL,'test',NULL,'test',NULL,NULL,NULL,NULL,NULL),(29,41,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,55,NULL,NULL,NULL,NULL,'test',NULL,'test',NULL,NULL,NULL,NULL,NULL),(31,54,NULL,NULL,NULL,NULL,'pp1',NULL,'pp1',NULL,NULL,NULL,NULL,NULL),(32,57,NULL,NULL,NULL,NULL,'sot',NULL,'klacid',NULL,NULL,NULL,NULL,NULL),(33,59,NULL,NULL,NULL,NULL,'ho, sốt, 38 độ ',NULL,'prospan, klacid , amox , anafelon',NULL,NULL,NULL,NULL,NULL),(34,60,NULL,NULL,NULL,NULL,'nít mũi ',NULL,'nhỏ mũi ',NULL,NULL,NULL,NULL,NULL),(35,61,NULL,NULL,NULL,NULL,'cccccc',NULL,'ccc',NULL,'152000',NULL,'15200',NULL),(36,66,NULL,NULL,NULL,'2025-01-17','a',NULL,'a',NULL,'1',1,'1',NULL),(37,67,NULL,NULL,NULL,'2025-01-17','ho,sốt,',NULL,'klacid,amox',NULL,'135000,295000',1,'315000',NULL),(38,68,NULL,NULL,NULL,'2025-01-17','ho,sốt,',NULL,'hút mũi,amox',NULL,'20000,295000',1,'315000',NULL),(39,69,NULL,NULL,NULL,'2025-01-17','ffdf,ff,ff',NULL,'dsds,bb,cc',NULL,'33,88,99',1,'220',NULL),(40,70,NULL,NULL,NULL,'2025-01-17','a',NULL,'a',NULL,'1',1,'1',NULL),(41,71,NULL,NULL,NULL,'2025-01-17','áasas,âsasa',NULL,'sa,fdfd',NULL,'1,2',1,'3',NULL),(42,73,NULL,NULL,NULL,'2025-01-20','ho,sốt,',NULL,'klacid,amox',NULL,'135000,290000',1,'435000',NULL),(43,75,NULL,NULL,NULL,'2025-01-21','á,ds',NULL,'fd,fdf,434',NULL,'12,12,40',1,'64',NULL),(44,76,NULL,NULL,NULL,'2025-01-21','tyytytyt',NULL,'tytyt',NULL,'323232',1,'323232',NULL),(45,77,NULL,NULL,NULL,'2025-01-22','ho,sôt',NULL,'amox,klacid',NULL,'290000,150000',1,'440000',NULL),(46,78,NULL,NULL,NULL,'2025-01-22','ho,sôt,mũi',NULL,'klacid',NULL,'135000',1,'135000',NULL),(47,80,NULL,NULL,NULL,'2025-02-03','ho,sốt,viêm họng',NULL,'klacid,amox,chấm họng,hút mũi',NULL,'135000,260000,50000,50000',1,'495000',NULL),(48,85,NULL,NULL,NULL,'2025-02-05','ho',NULL,'amox',NULL,'135000',1,'135000',NULL),(49,86,NULL,NULL,NULL,'2025-02-07','ho,sốt,mũi ,viêm họng',NULL,'klacid,amox,hút mũi ,chấm họng',NULL,'135000,295000,50000,50000',1,'530000',NULL),(50,87,NULL,NULL,NULL,'2025-02-07','ho',NULL,'[object Object]',NULL,'90000',1,'90000',NULL),(51,88,NULL,NULL,NULL,'2025-02-07','ho',NULL,'amox',NULL,'295000',1,'295000',NULL),(52,89,NULL,NULL,NULL,'2025-02-07','ho,sốt',NULL,'amox,Ibuprofen',NULL,'295000,90000',1,'385000',NULL),(53,91,NULL,NULL,NULL,'2025-02-10','ho,sốt,sổ mũi',NULL,'[object Object],[object Object],[object Object]',NULL,'295000,135000,90000',1,'520000',NULL),(54,92,NULL,NULL,NULL,'2025-02-10','ho,sôt',NULL,'amox,paracetamon',NULL,'295000,20000',1,'315000',NULL),(55,93,NULL,NULL,NULL,'2025-02-10','ho,sôt',NULL,'amox,paracetamon',NULL,'295000,20000',1,'315000','1,1,1'),(57,94,NULL,NULL,NULL,'2025-02-10','ho,sôt',NULL,'amox,paracetamon',NULL,'295000,20000',1,'315000','1,2'),(58,95,NULL,NULL,NULL,'2025-02-10','ho,sốt,sổ mũi',NULL,'[object Object],[object Object],[object Object],[object Object]',NULL,'295000,90000,20000,265000',1,'670000','1,1,1,1'),(59,96,NULL,'2025-02-10 17:26:41.297000',NULL,'2025-02-10','ho,sốt,sổ mũi',NULL,'amox,Ibuprofen,klacid','tnd','295000,90000,135000',1,'520000','1,1,1'),(60,97,'2025-02-10 17:42:26.708000',NULL,'tnd','2025-02-10','ho,sổ mũi',NULL,'klacid,ambroxol',NULL,'135000,60000',1,'195000','1,1'),(61,98,NULL,'2025-02-11 14:15:22.120000',NULL,'2025-02-11','ho,sốt,cúm A',NULL,'tamiflu,Ibuprofen,paracetamon','tnd','360000,450000,100000',1,'910000','6,5,5'),(62,99,'2025-02-11 14:14:48.259000',NULL,'tnd','2025-02-11','ho,cúm A',NULL,'Ibuprofen,tamiflu',NULL,'900000,360000',1,'1260000','10,6'),(63,100,NULL,'2025-02-11 14:41:37.077000',NULL,'2025-02-11','ho,sốt,sổ mũi ',NULL,'klacid,amox,Ibuprofen','tnd','270.000đ,295.000đ,90.000đ',1,NULL,'2,1,1'),(64,103,'2025-02-11 16:27:32.747000',NULL,'tnd','2025-02-11','ho,sôt',NULL,'klacid,amox',NULL,'135.000đ,295.000đ',1,'430000','1,1'),(65,102,'2025-02-11 16:28:32.275000',NULL,'tnd','2025-02-11','ho',NULL,'klacid',NULL,'135.000đ',1,'135000','1'),(66,101,'2025-02-11 16:44:40.351000',NULL,'tnd','2025-02-11','ho',NULL,'klacid',NULL,'135.000đ',1,'135000','1'),(67,104,'2025-02-11 16:46:05.123000',NULL,'tnd','2025-02-11','ho,sốt,sổ mũi',NULL,'amox,klacid,Ibuprofen',NULL,'295.000đ,135.000đ,180.000đ',1,'610000','1,1,2'),(68,105,'2025-02-11 16:59:21.295000',NULL,'tnd','2025-02-11','HO,sốt',NULL,'klacid,ambroxol',NULL,'135.000đ,120.000đ',1,'255000','1,2'),(69,106,NULL,'2025-02-12 17:13:49.807000',NULL,'2025-02-12','ho,sôt',NULL,'amox,klacid,Ibuprofen','tnd','295.000đ,135.000đ,180.000đ',1,'610000','1,1,2'),(70,107,NULL,'2025-02-12 15:59:54.545000',NULL,'2025-02-12','ho,sốt,viêm họng',NULL,'klacid,amox,paracetamon','tnd','135.000đ,295.000đ,100.000đ',1,'530000','2,3,5'),(71,108,NULL,'2025-02-12 16:24:57.505000',NULL,'2025-02-12','ho,viêm họng',NULL,'klacid,paracetamon','tnd','135.000đ,20.000đ',1,'155000','1,1'),(72,109,'2025-02-12 16:31:13.146000','2025-02-12 16:32:00.970000','tnd','2025-02-12','ho,sốt,sổ mũi,viêm họng',NULL,'klacid,TAROMENTIN,Ibuprofen,paracetamon','tnd','135.000đ,265.000đ,450.000đ,20.000đ',1,'870000','1,1,5,1'),(73,110,'2025-02-12 17:14:29.202000',NULL,'tnd','2025-02-12','viêm họng',NULL,'paracetamon',NULL,'20.000đ',1,'20000','1'),(74,111,'2025-02-12 17:15:48.709000',NULL,'tnd','2025-02-12','ho,sốt ',NULL,'paracetamon,Ibuprofen',NULL,'20.000đ,180.000đ',1,'200000','1,2'),(75,112,'2025-02-12 17:17:40.680000',NULL,'tnd','2025-02-12','viêm họng,ho',NULL,'klacid,paracetamon',NULL,'135.000đ,40.000đ',1,'175000','1,2'),(76,113,'2025-02-13 14:44:45.452000',NULL,'tnd','2025-02-13','ho,sốt,viêm tai',NULL,'amox,klacid,paracetamon',NULL,'295.000đ,135.000đ,20.000đ',1,'450000','1,1,1'),(77,114,'2025-02-14 14:15:54.332000',NULL,'tnd','2025-02-14','cúm A',NULL,'tamiflu',NULL,'360.000đ',1,'360000','6'),(78,117,'2025-02-17 09:40:31.708000',NULL,'tnd','2025-02-17','ho,sốt,cúm A',NULL,'tamiflu,paracetamon',NULL,'360.000đ,360.000đ',1,'720000','6,5'),(79,119,'2025-02-20 15:12:34.496000',NULL,'tnd','2025-02-20','ho,sốt,sổ mũi ',NULL,'paracetamon,klacid',NULL,'20.000đ,135.000đ',1,'155000','1,1'),(80,126,'2025-02-24 14:39:42.049000','2025-02-24 14:45:00.412000','tnd','2025-02-24','ho,sốt,viêm họng',NULL,'amox,Ibuprofen,paracetamon','tnd','3.835.000đ,180.000đ,200.000đ',1,'4215000','13,2,10');
/*!40000 ALTER TABLE `medical_examination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_supplies`
--

DROP TABLE IF EXISTS `medical_supplies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_supplies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `medicine_name` varchar(255) DEFAULT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  `unit_price` varchar(255) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_supplies`
--

LOCK TABLES `medical_supplies` WRITE;
/*!40000 ALTER TABLE `medical_supplies` DISABLE KEYS */;
INSERT INTO `medical_supplies` VALUES (1,NULL,NULL,NULL,NULL,'TAROMENTIN','10','265000',_binary '','taromentin.png'),(2,NULL,NULL,'2025-02-24 14:39:43.220000','tnd','Ibuprofen','6','90000',_binary '','ibuprofen.png'),(3,NULL,NULL,'2025-02-24 14:39:43.220000','tnd','paracetamon','38','20000',_binary '','falgankid.png'),(4,NULL,NULL,'2025-02-24 14:39:43.220000','tnd','Betamox','15','295000',_binary '','betamox.png'),(5,NULL,NULL,'2025-02-20 15:12:34.596000','tnd','klacid','17','135000',_binary '','klacid.png'),(6,NULL,NULL,NULL,NULL,'stemark','100','10000',_binary '','stemark.png'),(7,NULL,NULL,NULL,NULL,'ambroxol','50','60000',_binary '','ambroxol.png'),(8,NULL,NULL,NULL,NULL,'ich nhi','100','45000',_binary '','ichnhi.png'),(9,NULL,NULL,NULL,NULL,'prospan','50','80000',_binary '','prospan.png'),(10,NULL,NULL,'2025-02-17 09:40:31.798000','tnd','tamiflu','88','60000',_binary '','tamiflu.png'),(19,'2025-02-25 14:14:28.118000','tnd',NULL,NULL,'test','10','25000',_binary '','history.png');
/*!40000 ALTER TABLE `medical_supplies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_parent` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `router_link` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,NULL,'2025-02-05 00:00:00.000000',NULL,'tnd','pi pi-register','Register','/register',NULL),(2,NULL,'2025-02-05 00:00:00.000000',NULL,'tnd','pi pi-listregister','List Register','/listregister',NULL),(3,NULL,'2025-02-05 00:00:00.000000',NULL,'tnd','pi pi-history','List History','/historycustomer',NULL),(4,NULL,'2025-02-05 00:00:00.000000',NULL,'tnd','pi pi-customer','List Customer','/listcustomer',NULL),(5,NULL,'2025-02-05 00:00:00.000000',NULL,'tnd','pi pi-test','Test','/test',NULL),(10,NULL,'2025-02-05 00:00:00.000000',NULL,'tnd','pi pi-money','Total Money','/money',NULL),(11,NULL,'2025-02-05 00:00:00.000000',NULL,'tnd','pi pi-backup','Backup','/db',NULL),(12,NULL,NULL,NULL,'tnd','pi pi-medicalsupplies','Medical Supplies',NULL,NULL),(13,12,'2025-02-14 00:00:00.000000',NULL,'tnd','pi pi-add','Add','/addmedicalsupplies','null'),(14,12,'2025-02-14 00:00:00.000000',NULL,'tnd','pi pi-listmedical','List','/listmedicalsupplies',NULL);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  `medical_supplies_id` int DEFAULT NULL,
  `medical_examination_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5lcsvpofki29om2jmgyu03yvv` (`medical_supplies_id`),
  KEY `FKduqr69k05d0m4in73dbuul49v` (`medical_examination_id`),
  CONSTRAINT `FK5lcsvpofki29om2jmgyu03yvv` FOREIGN KEY (`medical_supplies_id`) REFERENCES `medical_supplies` (`id`),
  CONSTRAINT `FKduqr69k05d0m4in73dbuul49v` FOREIGN KEY (`medical_examination_id`) REFERENCES `medical_examination` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` VALUES (1,NULL,NULL,NULL,NULL,'1',4,67),(2,NULL,NULL,NULL,NULL,'1',5,67),(3,NULL,NULL,NULL,NULL,'2',2,67),(4,'2025-02-11 16:59:21.343000','tnd',NULL,NULL,'1',5,68),(5,'2025-02-11 16:59:21.343000','tnd',NULL,NULL,'2',7,68),(6,'2025-02-12 15:08:14.795000','tnd',NULL,NULL,'1',5,NULL),(7,'2025-02-12 15:08:14.795000','tnd',NULL,NULL,'1',4,NULL),(23,'2025-02-12 15:59:54.586000','tnd',NULL,NULL,'2',5,70),(24,'2025-02-12 15:59:54.586000','tnd',NULL,NULL,'3',4,70),(25,'2025-02-12 15:59:54.586000','tnd',NULL,NULL,'5',3,70),(27,'2025-02-12 16:24:57.545000','tnd',NULL,NULL,'1',5,71),(28,'2025-02-12 16:24:57.545000','tnd',NULL,NULL,'1',3,71),(33,'2025-02-12 16:32:01.026000','tnd',NULL,NULL,'1',5,72),(34,'2025-02-12 16:32:01.026000','tnd',NULL,NULL,'1',1,72),(35,'2025-02-12 16:32:01.026000','tnd',NULL,NULL,'5',2,72),(36,'2025-02-12 16:32:01.026000','tnd',NULL,NULL,'1',3,72),(37,'2025-02-12 17:13:49.931000','tnd',NULL,NULL,'1',4,69),(38,'2025-02-12 17:13:49.931000','tnd',NULL,NULL,'1',5,69),(39,'2025-02-12 17:13:49.931000','tnd',NULL,NULL,'2',2,69),(40,'2025-02-12 17:14:29.262000','tnd',NULL,NULL,'1',3,73),(41,'2025-02-12 17:15:48.775000','tnd',NULL,NULL,'1',3,74),(42,'2025-02-12 17:15:48.775000','tnd',NULL,NULL,'2',2,74),(43,'2025-02-12 17:17:40.748000','tnd',NULL,NULL,'1',5,75),(44,'2025-02-12 17:17:40.748000','tnd',NULL,NULL,'2',3,75),(45,'2025-02-13 14:44:45.511000','tnd',NULL,NULL,'1',4,76),(46,'2025-02-13 14:44:45.511000','tnd',NULL,NULL,'1',5,76),(47,'2025-02-13 14:44:45.511000','tnd',NULL,NULL,'1',3,76),(48,'2025-02-14 14:15:54.449000','tnd',NULL,NULL,'6',10,77),(49,'2025-02-17 09:40:31.798000','tnd',NULL,NULL,'6',10,78),(50,'2025-02-17 09:40:31.798000','tnd',NULL,NULL,'5',3,78),(51,'2025-02-20 15:12:34.596000','tnd',NULL,NULL,'1',3,79),(52,'2025-02-20 15:12:34.596000','tnd',NULL,NULL,'1',5,79),(59,'2025-02-24 14:45:00.502000','tnd',NULL,NULL,'13',4,80),(60,'2025-02-24 14:45:00.502000','tnd',NULL,NULL,'2',2,80),(61,'2025-02-24 14:45:00.502000','tnd',NULL,NULL,'10',3,80);
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule_medical`
--

DROP TABLE IF EXISTS `schedule_medical`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule_medical` (
  `customer_id` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `date_register` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `time_register` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKocptenta905cx7uckgmg213tc` (`customer_id`),
  CONSTRAINT `FKocptenta905cx7uckgmg213tc` FOREIGN KEY (`customer_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_medical`
--

LOCK TABLES `schedule_medical` WRITE;
/*!40000 ALTER TABLE `schedule_medical` DISABLE KEYS */;
INSERT INTO `schedule_medical` VALUES (1,1,0,'2024-12-03 13:04:40.615000',NULL,'tnd','2024-12-03','nguyen dac tuan','14:04',NULL),(2,2,0,'2024-12-03 13:05:22.251000',NULL,'tnd','2024-12-03','nguyen van a','13:50',NULL),(3,3,1,'2024-12-03 13:05:55.170000',NULL,'tnd','2024-12-03','nguyen van b','16:05',NULL),(25,39,0,'2024-12-05 16:32:44.787000',NULL,'tnd','2024-12-05','nguyen dac tuan','16:29',NULL),(1,40,1,'2024-12-05 16:35:58.371000',NULL,'tnd','2024-12-05','nguyen dac tuan','16:35',NULL),(1,41,1,'2024-12-05 16:43:56.311000',NULL,'tnd','2024-12-05','nguyen dac tuan','16:41',NULL),(1,42,0,'2024-12-06 09:26:02.590000',NULL,'tnd','2024-12-06','nguyen dac tuan','10:25',NULL),(26,43,0,'2024-12-06 09:29:16.037000',NULL,'tnd','2024-12-06','nguyen dac tuan','09:29',NULL),(1,44,0,'2024-12-06 09:30:28.033000',NULL,'tnd','2024-12-06','nguyen dac tuan','11:29',NULL),(1,45,0,'2024-12-06 12:47:03.996000',NULL,'tnd','2024-12-06','nguyen dac tuan','12:46',NULL),(1,46,0,'2024-12-06 12:51:05.768000',NULL,'tnd','2024-12-06','nguyen dac tuan','12:50',NULL),(31,51,0,'2024-12-06 14:19:05.709000',NULL,'tnd','2024-12-06','nguyen van tuan','14:18',NULL),(32,52,0,'2024-12-09 13:48:36.128000',NULL,'tnd','2024-12-09','nguyen van i','13:48',NULL),(33,53,0,'2024-12-10 10:36:16.678000',NULL,'tnd','2024-12-10','ffdf','10:35',NULL),(34,54,1,'2024-12-11 13:01:24.079000',NULL,'tnd','2024-12-11','pp','13:01',NULL),(35,55,1,'2024-12-11 13:06:08.740000',NULL,'tnd','2024-12-11','nguyen van phuong','13:05',NULL),(36,56,0,'2024-12-11 13:33:26.323000',NULL,'tnd','2024-12-11','ppp','13:33',NULL),(37,57,1,'2024-12-11 13:33:49.702000',NULL,'tnd','2024-12-11','nguyen van tu','13:33',NULL),(39,58,0,'2024-12-12 09:20:47.170000',NULL,'tnd','2024-12-12','pppp','09:20',NULL),(40,59,1,'2024-12-19 13:28:15.939000',NULL,'tnd','2024-12-19','nguyen van a','14:30',NULL),(41,60,1,'2024-12-19 14:05:27.511000',NULL,'tnd','2024-12-19','nguyễn đắc tuấn','14:04',NULL),(42,61,1,'2024-12-27 15:25:59.364000',NULL,'tnd','2024-12-27','nguyen dac tuan','15:25',NULL),(43,62,0,'2025-01-07 15:38:28.642000',NULL,'tnd','2025-01-07','nguyen hoang anh','15:38',NULL),(44,63,0,'2025-01-07 15:42:37.692000',NULL,'tnd','2025-01-07','nguyen van t','16:40',NULL),(45,64,0,'2025-01-15 16:50:56.186000',NULL,'tnd','2025-01-15','tesst','16:50',NULL),(46,65,0,'2025-01-16 08:56:26.013000',NULL,'tnd','2025-01-16','test','08:56',NULL),(47,66,1,'2025-01-17 09:46:41.845000',NULL,'tnd','2025-01-17','test','09:55',NULL),(48,67,1,'2025-01-17 14:30:57.775000',NULL,'tnd','2025-01-17','nguyễn văn bình','15:30',NULL),(49,68,1,'2025-01-17 14:33:53.829000',NULL,'tnd','2025-01-17','nguyễn văn cường','14:35',NULL),(50,69,1,'2025-01-17 14:39:03.275000',NULL,'tnd','2025-01-17','hghg','14:38',NULL),(51,70,1,'2025-01-17 14:40:11.886000',NULL,'tnd','2025-01-17','ể','14:39',NULL),(52,71,1,'2025-01-17 14:40:42.918000',NULL,'tnd','2025-01-17','áaa','14:40',NULL),(53,72,0,'2025-01-17 15:21:17.752000',NULL,'tnd','2025-01-17','fdfhd','15:21',NULL),(54,73,1,'2025-01-20 16:48:09.043000',NULL,'tnd','2025-01-20','test','16:50',NULL),(55,74,0,'2025-01-20 17:56:14.160000',NULL,'tnd','2025-01-20','nguyễn văn t ','18:55',NULL),(56,75,1,'2025-01-21 15:05:52.649000',NULL,'tnd','2025-01-21','test','15:05',NULL),(57,76,1,'2025-01-21 15:14:34.349000',NULL,'tnd','2025-01-21','đào văn an','16:13',NULL),(58,77,1,'2025-01-22 14:03:25.069000',NULL,'tnd','2025-01-22','đào văn mạnh','14:10',NULL),(59,78,1,'2025-01-22 14:31:05.950000',NULL,'tnd','2025-01-22','nguyễn đức khánh','14:30',NULL),(60,79,0,'2025-01-22 14:37:05.448000',NULL,'tnd','2025-01-22','ytyt','14:36',NULL),(61,80,1,'2025-02-03 13:50:37.869000',NULL,'tnd','2025-02-03','đào văn mạnh','14:50',NULL),(62,81,0,'2025-02-04 09:56:57.973000',NULL,'tnd','2025-02-04','nguyễn văn an','09:52',NULL),(63,82,0,'2025-02-04 09:57:33.276000',NULL,'tnd','2025-02-04','nguyễn văn bình','10:52',NULL),(71,83,0,'2025-02-04 13:24:27.582000',NULL,'tnd','2025-02-04','jgjgjgj','09:53',NULL),(74,84,0,'2025-02-04 13:30:12.520000',NULL,'tnd','2025-02-04','tutut','09:55',NULL),(75,85,1,'2025-02-05 14:27:03.156000',NULL,'tnd','2025-02-05','nguyễn văn an','14:26',NULL),(76,86,1,'2025-02-07 15:37:56.679000',NULL,'tnd','2025-02-07','đào đức khánh','15:40',NULL),(77,87,1,'2025-02-07 16:30:57.905000',NULL,'tnd','2025-02-07','nguyễn văn an','17:30',NULL),(78,88,1,'2025-02-07 17:05:26.883000',NULL,'tnd','2025-02-07','test','17:05',NULL),(79,89,1,'2025-02-07 17:15:58.849000',NULL,'tnd','2025-02-07','testt','17:15',NULL),(80,90,0,'2025-02-07 18:08:24.662000',NULL,'tnd','2025-02-07','testfd','18:08',NULL),(81,91,1,'2025-02-10 10:29:27.185000',NULL,'tnd','2025-02-10','đào đức khánh','10:29',NULL),(82,92,1,'2025-02-10 10:42:00.603000',NULL,'tnd','2025-02-10','tetst','10:41',NULL),(83,93,1,'2025-02-10 13:55:37.419000',NULL,'tnd','2025-02-10','gfgjfkgjk','13:55',NULL),(84,94,1,'2025-02-10 14:35:21.433000',NULL,'tnd','2025-02-10','pppP','14:35',NULL),(85,95,1,'2025-02-10 17:17:53.420000',NULL,'tnd','2025-02-10','đào văn an','17:16',NULL),(86,96,1,'2025-02-10 17:22:28.114000',NULL,'tnd','2025-02-10','đào đức khánh','17:22',NULL),(87,97,1,'2025-02-10 17:40:11.548000',NULL,'tnd','2025-02-10','nguyễn văn an','17:39',NULL),(88,98,1,'2025-02-11 12:37:58.740000',NULL,'tnd','2025-02-11','đào đức khánh','12:45',NULL),(89,99,1,'2025-02-11 13:43:06.043000',NULL,'tnd','2025-02-11','test','13:42',NULL),(90,100,1,'2025-02-11 14:40:32.148000',NULL,'tnd','2025-02-11','nguyễn văn an','15:40',NULL),(91,101,1,'2025-02-11 14:48:57.330000',NULL,'tnd','2025-02-11','PPPP','14:48',NULL),(92,102,1,'2025-02-11 14:51:10.296000',NULL,'tnd','2025-02-11','nvff','14:50',NULL),(93,103,1,'2025-02-11 16:27:11.240000',NULL,'tnd','2025-02-11','đào văn an','16:26',NULL),(94,104,1,'2025-02-11 16:45:38.774000',NULL,'tnd','2025-02-11','fdfdfdfd','16:45',NULL),(95,105,1,'2025-02-11 16:58:41.276000',NULL,'tnd','2025-02-11','fdfdf','16:58',NULL),(96,106,1,'2025-02-12 15:06:16.552000',NULL,'tnd','2025-02-12','đào văn an','15:06',NULL),(89,107,1,'2025-02-12 15:57:50.328000',NULL,'tnd','2025-02-12','test','15:57',NULL),(97,108,1,'2025-02-12 16:24:10.309000',NULL,'tnd','2025-02-12','pppppppppp','16:24',NULL),(98,109,1,'2025-02-12 16:30:32.469000',NULL,'tnd','2025-02-12','đào đức khánh','16:30',NULL),(99,110,1,'2025-02-12 17:14:16.598000',NULL,'tnd','2025-02-12','pkgkgkgk','17:14',NULL),(100,111,1,'2025-02-12 17:15:27.639000',NULL,'tnd','2025-02-12','đào đức khánh','17:15',NULL),(101,112,1,'2025-02-12 17:17:22.256000',NULL,'tnd','2025-02-12','mvcmvcm','17:17',NULL),(102,113,1,'2025-02-13 14:44:22.449000',NULL,'tnd','2025-02-13','đào đức khánh','14:44',NULL),(102,114,1,'2025-02-14 14:14:38.744000',NULL,'tnd','2025-02-14','đào đức khánh','14:10',NULL),(102,115,0,'2025-02-14 14:14:39.198000',NULL,'tnd','2025-02-14','đào đức khánh','14:10',NULL),(103,116,0,'2025-02-14 14:19:24.079000',NULL,'tnd','2025-02-14','nguyễn văn an','14:19',NULL),(104,117,1,'2025-02-17 09:39:15.517000',NULL,'tnd','2025-02-17','đào đức khánh','09:38',NULL),(105,118,0,'2025-02-17 17:12:36.191000',NULL,'tnd','2025-02-17','nguyễn văn an','17:12',NULL),(106,119,1,'2025-02-20 15:12:14.281000',NULL,'tnd','2025-02-20','đào đức khánh','15:11',NULL),(107,120,0,'2025-02-20 15:25:42.281000',NULL,'tnd','2025-02-20','đào văn an','15:25',NULL),(108,121,0,'2025-02-21 13:09:03.613000',NULL,'tnd','2025-02-21','đào văn an','15:10',NULL),(109,122,0,'2025-02-21 13:25:42.312000',NULL,'tnd','2025-02-21','đào đức khánh','14:25',NULL),(110,123,0,'2025-02-21 13:26:13.546000',NULL,'tnd','2025-02-21','nguyễn văn bình','16:25',NULL),(111,124,0,'2025-02-21 13:26:48.553000',NULL,'tnd','2025-02-21','nguyễn văn tú','13:41',NULL),(112,125,0,'2025-02-21 13:27:27.643000',NULL,'tnd','2025-02-21','đào văn cường','13:26',NULL),(113,126,1,'2025-02-24 12:43:21.359000',NULL,'tnd','2025-02-24','Nguyễn Văn Bình','13:50',NULL),(114,127,0,'2025-02-24 16:20:17.953000',NULL,'tnd','2025-02-24','đào đức khánh','16:20',NULL),(115,128,0,'2025-02-25 12:54:15.355000',NULL,'tnd','2025-02-25','nguyễn văn tú','12:53',NULL),(116,129,0,'2025-02-25 12:54:39.047000',NULL,'tnd','2025-02-25','đào văn mạnh','12:54',NULL);
/*!40000 ALTER TABLE `schedule_medical` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-25 18:01:53
