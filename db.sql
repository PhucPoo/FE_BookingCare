-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: booking_care
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `cccd` varchar(255) DEFAULT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` enum('FEMALE','MALE','OTHER') DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `refresh_token` mediumtext,
  `update_at` datetime(6) DEFAULT NULL,
  `role_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt3wava8ssfdspnh3hg4col3m1` (`role_id`),
  CONSTRAINT `FKt3wava8ssfdspnh3hg4col3m1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'Hà Nội','https://res.cloudinary.com/dcoejntp5/image/upload/v1760664609/booking_care/account/1.jpg',NULL,'035097003984','2025-10-17 01:27:29.892797','superAdmin01@gmail.com','MALE','ADMIN','$2a$10$kDXf7B5AjGZA4qK973b8LO.K0cAphlRdN5b0UN63c5jNfz/HcYYgS','0312123456','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlckFkbWluMDFAZ21haWwuY29tIiwiZXhwIjoxNzY5MzM1NzY3LCJpYXQiOjE3NjA2OTU3NjcsInVzZXIiOnsiaWQiOjEsIm5hbWUiOiJBRE1JTiIsImVtYWlsIjoic3VwZXJBZG1pbjAxQGdtYWlsLmNvbSIsImF2YXRhciI6bnVsbCwicm9sZSI6bnVsbCwiYWN0b3JUeXBlIjpudWxsLCJhY3RvcklkIjpudWxsfX0.j2E2JESUJ3tOgLRn-NKNLAdFHX0XSuZv5AgNV-ajGqHuo4TESS-sSEW-QngMpFc0UDFMqe0IDnxKO-GnOkfrZA','2025-10-17 10:09:27.994825',1),(3,'Hà Nội','https://res.cloudinary.com/dcoejntp5/image/upload/v1760670435/booking_care/account/3.jpg',NULL,'025000001568','2025-10-17 01:32:26.369302','hoa@gmail.com','FEMALE','Nguyễn Thị Hoa','$2a$10$jZCUYrH.hx0ybEUHDXqMseAOjECM6gKY6EKcPombEIhCYWU4MPpr.','0312123456',NULL,'2025-10-17 04:54:45.330647',4),(4,'Ninh Bình','https://res.cloudinary.com/dcoejntp5/image/upload/v1760677882/booking_care/account/4.jpg','1993-05-05','035299051289','2025-10-17 01:34:03.367110','hai@gmail.com','MALE','Trần Văn Hải','$2a$10$cnqxEV42vMcCRsRV68YPSuQKQG/UQo9f3Djzz29Win.dBoY65UitO','0343145388',NULL,'2025-10-17 05:11:23.492054',4),(5,'Hà Nam','https://res.cloudinary.com/dcoejntp5/image/upload/v1760677914/booking_care/account/5.jpg','2000-08-22','035204003210','2025-10-17 01:34:58.957193','dangtu7124@gmail.com','MALE','Nguyễn Tiến Hưng','$2a$10$ldEaYzqnXJjuBb3x4qP5EOuZMOJ7RHszpJDwEHelvJQitaM1OcEQO','0343145387',NULL,'2025-10-17 09:59:48.204657',4),(6,'Thanh Hóa','https://res.cloudinary.com/dcoejntp5/image/upload/v1760677945/booking_care/account/6.jpg','1999-08-09','035200006852','2025-10-17 01:36:38.686327','thang@gmail.com','MALE','Nguyễn Hải Thắng','$2a$10$CTuDQg.7lfaYqfT0BDWrXOyZWpc3ZodF6CkvR5L2DLJ/DlK5tmA76','0343145100',NULL,'2025-10-17 05:12:26.645787',4),(7,'Hà Nội',NULL,NULL,'035209006857','2025-10-17 01:38:08.762822','hoanghai@gmail.com','MALE','Hoàng Hải','$2a$10$NBdz2aa12nj4d28GUg.Unu87iLH5fgj9JaZqlYn4iFCbIQVVAwrk.','0343145101',NULL,'2025-10-17 05:24:53.750680',4),(8,'Hà Tĩnh','https://res.cloudinary.com/dcoejntp5/image/upload/v1760677982/booking_care/account/8.jpg','1999-08-18','035309601258','2025-10-17 01:39:42.025210','lua@gmail.com','FEMALE','Trần Thị Lụa','$2a$10$Pro4DkcNVBaCAfA7C038xObwY8ZT0ezhYECGaE5nPmfaV692q.SQW','0343102568',NULL,'2025-10-17 05:13:03.451450',4),(9,'Hồ Chí Minh','https://res.cloudinary.com/dcoejntp5/image/upload/v1760678004/booking_care/account/9.jpg','1997-08-20','035206002468','2025-10-17 01:41:18.414344','bach@gmail.com','MALE','Phạm Văn Bạch','$2a$10$ahstdrM2JY4OiXtG1JlmXuX9K75yO/XcTTz3ImFjT72KI0tRDyH/i','0312365824',NULL,'2025-10-17 05:42:29.796492',4),(10,'Đà Nẵng','https://res.cloudinary.com/dcoejntp5/image/upload/v1760678055/booking_care/account/10.jpg','1990-05-24','035300001046','2025-10-17 01:42:43.413472','huong@gmail.com','FEMALE','Phạm Thị Hương','$2a$10$QJwFjmswR5wf5O8ztyDrOejAP8fi60zAXnglBtEKlRo9/M9p4GsPy','0235656585',NULL,'2025-10-17 05:14:17.169494',4),(11,'Hồ Chí Minh','https://res.cloudinary.com/dcoejntp5/image/upload/v1760678042/booking_care/account/11.jpg','2003-08-11','035201006089','2025-10-17 01:44:07.429346','hung@gmail.com','MALE','Hoàng Văn Hùng','$2a$10$7af3LYU2MDuciwAC7H3BvOHPss22JDK/QCZrIp1Aq0XpqprWQiuY2','0312123666',NULL,'2025-10-17 05:14:04.286561',4),(12,'Hà Nội','https://res.cloudinary.com/dcoejntp5/image/upload/v1760678073/booking_care/account/12.jpg','2001-08-01','035305003685','2025-10-17 01:45:25.087853','lan@gmail.com','FEMALE','Bùi Thị Lan','$2a$10$xhm3Y5L5kJXI0ywYB/naa.2qpBWpOUL8BoskZQJnyM7CelMf3DXKu','0316378456',NULL,'2025-10-17 05:14:34.476797',4),(13,'Ninh Bình','https://res.cloudinary.com/dcoejntp5/image/upload/v1760678179/booking_care/account/13.jpg','2003-06-19','035309003609','2025-10-17 01:46:51.549740','ha@gmail.com','FEMALE','Phan Thị Hà','$2a$10$eaJnu8nuemLvtE//izBiIuN0L5EAlqhY61oLjkjyeBDoDnNE5jkuK','0343142398',NULL,'2025-10-17 05:16:20.805955',4),(14,'Lạng Sơn','https://res.cloudinary.com/dcoejntp5/image/upload/v1760678198/booking_care/account/14.jpg','1994-12-23','035201006521','2025-10-17 01:48:00.429558','thai@gmail.com','MALE','Vương Thái','$2a$10$nGhshaABgNBNR00CZAiweuUaBwKYHQOZnwa9xh3WzrwVxhJhvfhwu','0359682498','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aGFpQGdtYWlsLmNvbSIsImV4cCI6MTc2OTMxNzAyNywiaWF0IjoxNzYwNjc3MDI3LCJ1c2VyIjp7ImlkIjoxNCwibmFtZSI6IlbGsMahbmcgVGjDoWkiLCJlbWFpbCI6InRoYWlAZ21haWwuY29tIiwiYXZhdGFyIjpudWxsLCJyb2xlIjpudWxsLCJhY3RvclR5cGUiOm51bGwsImFjdG9ySWQiOm51bGx9fQ.97SDfApkrnKGLnJya-1zUkbo1I0oGMhiuvwO7U4Hc2eC3_G_AbjbVST4RfkjSsSAJRSW7-L3KdCzVvxXmlRKjw','2025-10-17 05:16:39.932925',4),(15,'Hà Nam','https://res.cloudinary.com/dcoejntp5/image/upload/v1760678253/booking_care/account/15.jpg','2007-08-09','035309005682','2025-10-17 01:49:19.478340','thu@gmail.com','FEMALE','Trần Thị Thư','$2a$10$90vmUd0LhvXjQ7JBb2MxsuwT.1cPvMlk436seHg5a1XBe4grLz/yW','0368952146',NULL,'2025-10-17 05:17:35.148297',4),(16,'Bình Dương',NULL,NULL,'024689753124','2025-10-17 01:52:08.944527','vinh@gmail.com','MALE','Trần Bá Vinh','$2a$10$puR2FMpfK3kJPYyc/tV.H.xhelAsqmX79mU9IeV12sMRP8SU0QvRu','0987452316',NULL,NULL,4),(17,'Phú Quốc','https://res.cloudinary.com/dcoejntp5/image/upload/v1760678240/booking_care/account/17.jpg','2000-05-18','012345678901','2025-10-17 01:54:00.391456','khang@gmail.com','MALE','Nguyễn Minh Khang','$2a$10$Uq.w8th8n8TowbJjvHTXQ.F8oT/5k9srCzgd4XpNq7TnmBnmDgseq','0987452316',NULL,'2025-10-17 05:17:21.379365',4),(18,'Hà nội','https://res.cloudinary.com/dcoejntp5/image/upload/v1760678285/booking_care/account/18.jpg','2001-05-23','037591826430','2025-10-17 01:54:58.887824','dung@gmail.com','FEMALE','Trần Thùy Dung','$2a$10$p5MJxcr2zUbxeh1Jz7qJb.VFcczq.O.lYgYAWPHd2QCj/aZQtPw3C','0916738240',NULL,'2025-10-17 05:18:06.643991',4),(19,'Thanh Hóa','https://res.cloudinary.com/dcoejntp5/image/upload/v1760678304/booking_care/account/19.jpg','2004-11-30','048273615942','2025-10-17 01:55:53.669938','tuan@gmail.com','MALE','Lê Anh Tuấn','$2a$10$E0oPt9/xOSqKl2Ql/IdYC.bq8Zb8ggBFGtN3y0vffm.O9Sft3S/He','0974112853',NULL,'2025-10-17 05:18:25.549406',4),(20,'Nghệ An','https://res.cloudinary.com/dcoejntp5/image/upload/v1760678321/booking_care/account/20.jpg','1993-09-01','071835924617','2025-10-17 01:57:01.364557','linh@gmail.com','FEMALE','Vũ Mỹ Linh','$2a$10$FIesJO0Q8hIKNo1GR3U2PelNIPMeUJ36lpIID5HwtmBlv0RlwWxPq','0859742368',NULL,'2025-10-17 05:18:42.216836',4),(21,'Hà nội','https://res.cloudinary.com/dcoejntp5/image/upload/v1760668939/booking_care/account/21.png','1991-08-23','012964753821','2025-10-17 02:26:14.551806','long@gmail.com','MALE','Nguyễn Hoàng Long','$2a$10$KDNCu66c1Wb3LKhAEa22D.Jt1v7nzDifKHaIq0KAqrqY7KHu6dHHO','0982364157',NULL,'2025-10-17 02:42:19.600176',2),(22,'Hà nội','https://res.cloudinary.com/dcoejntp5/image/upload/v1760668985/booking_care/account/22.png','1989-11-22','012964753821','2025-10-17 02:27:07.830059','quyet@gmail.com','MALE','Hà Văn Quyết','$2a$10$V4Tsap4QcrTP.lLVYTYd6.uzOFeiz5BT4UUo21lWrRzoIZ.Yq5FMK','0982364157',NULL,'2025-10-17 04:52:31.907850',2),(23,'Hà nội','https://res.cloudinary.com/dcoejntp5/image/upload/v1760669029/booking_care/account/23.png','1986-09-18','035968521357','2025-10-17 02:29:12.915557','viet@gmail.com','MALE','Lê Quốc Việt','$2a$10$2Xj5PFo8s7CnmVfbqQoN0.0id/h.4xQVbsZVakbnwpG8J0HRS0cry','0987255222',NULL,'2025-10-17 02:43:50.023980',2),(24,'nghệ an','https://res.cloudinary.com/dcoejntp5/image/upload/v1760669072/booking_care/account/24.jpg','1990-08-22','035269874123','2025-10-17 02:30:30.902398','quynh@gmail.com','MALE','Nguyễn Văn Quýnh','$2a$10$h6R9vJAhqTa4lvlfFFBaNOFt8p0mUTIPsk/A3ow8tdEYU9P1h2eym','0326555987',NULL,'2025-10-17 02:44:32.625109',2),(25,'Hồ Chí Minh','https://res.cloudinary.com/dcoejntp5/image/upload/v1760669105/booking_care/account/25.png','1987-06-11','035896548521','2025-10-17 02:32:41.790760','tronghung@gmail.com','MALE','Nguyễn Trọng Hưng','$2a$10$i2EXh5xPwVCtH7zh/95HbOec70ctJ/J2qHNaEQ588gjZz9izjPsky','0369258147',NULL,'2025-10-17 02:45:06.155084',2),(26,'Đà Nẵng','https://res.cloudinary.com/dcoejntp5/image/upload/v1760669137/booking_care/account/26.png','1990-02-07','036895421685','2025-10-17 02:34:08.891782','an@gmail.com','FEMALE','Nguyễn Thị Hoài An','$2a$10$XqzFIn5La7tZs319sUxDJufv2l1S4oxQOLr5ysPP7UAKr1jGRtKBm','0925120123',NULL,'2025-10-17 02:45:37.856569',2),(27,'Thanh Hóa','https://res.cloudinary.com/dcoejntp5/image/upload/v1760669179/booking_care/account/27.png','1993-08-26','035684529658','2025-10-17 02:35:36.148898','doanh@gmail.com','MALE','Nguyễn Văn Doanh','$2a$10$g9cRjSnc3n9qdLZnnmkE5OAiDdLPeh7BpaOVCJagLYG1yvVUkpzqW','0987265852',NULL,'2025-10-17 02:46:20.044821',2),(28,'Hà Nội','https://res.cloudinary.com/dcoejntp5/image/upload/v1760669264/booking_care/account/28.png','1993-05-19','035682657412','2025-10-17 02:37:12.787644','thao@gmail.com','MALE','Nguyễn Hữu Thảo','$2a$10$z/gsLGhO9jEJusCjiBQ5MO14mHB0p5JIRgtZ2/Nvw1sjyZ2y4W8u2','0968523156',NULL,'2025-10-17 02:47:44.726229',2),(29,'Hồ Chí Minh','https://res.cloudinary.com/dcoejntp5/image/upload/v1760669288/booking_care/account/29.png','1994-04-11','035236987412','2025-10-17 02:38:40.064689','thy@gmail.com','FEMALE','Trần Thị Mai Thy','$2a$10$SnBZBiiW2/QKOpp/F19en.BOFvtteZ324hR4FFcsc0WObhh32bqsu','0356258951',NULL,'2025-10-17 02:48:09.216053',2),(30,'Hà Nam','https://res.cloudinary.com/dcoejntp5/image/upload/v1760669307/booking_care/account/30.png','1993-07-26','035369875214','2025-10-17 02:40:41.454019','lang@gmail.com','MALE','Nguyễn Tiến Lãng','$2a$10$tYyjYlSSTQXlsnYKuU.vv.85XNlohZSwyWLBRrjdcRzEh9ULUf67O','0343145399',NULL,'2025-10-17 02:48:28.054850',2),(31,'Hà nội','https://res.cloudinary.com/dcoejntp5/image/upload/v1760670951/booking_care/account/31.jpg','1987-12-17','035625841235','2025-10-17 02:50:05.672919','hoang@gmail.com','MALE','S-Hoàng','$2a$10$4PweXrbvlVeKoqVLGasDEu8mvQmvEyZAD1C4wgluK.OdSbzU/93Z2','0586235489',NULL,'2025-10-17 10:00:30.266506',3),(32,'Hồ Chí Minh','https://res.cloudinary.com/dcoejntp5/image/upload/v1760670981/booking_care/account/32.jpg','2000-05-09','032569874123','2025-10-17 02:51:06.756318','huy@gmail.com','MALE','S-Huy','$2a$10$l8qelMA5ttmWS.Zt6dNbo.aNeEnA2KPsVwr68xnSoD.BYx0XXOt.G','0265852168',NULL,'2025-10-17 04:44:17.638929',3),(33,'Ninh Bình','https://res.cloudinary.com/dcoejntp5/image/upload/v1760671003/booking_care/account/33.jpg','1993-05-19','069852148523','2025-10-17 02:52:10.420310','luong@gmail.com','MALE','S-Lương','$2a$10$qDH5np6WIUcxjf/WDNobbeBUPcx7MsyG4PB.04U3AHe3zP66pzCXO','0968521478',NULL,'2025-10-17 03:46:21.093195',3),(34,'Hà nội','https://res.cloudinary.com/dcoejntp5/image/upload/v1760671028/booking_care/account/34.jpg','1999-11-23','058236987452','2025-10-17 02:53:03.736669','nga@gmail.com','FEMALE','S-Nga','$2a$10$D2po/ETeZ3CTTBDWJ.tbB.2fXXgN5ZgFh1c12orqaj1UcOe/Vthqe','0357852159',NULL,'2025-10-17 03:49:22.444339',3),(35,'Thanh Hóa','https://res.cloudinary.com/dcoejntp5/image/upload/v1760671050/booking_care/account/35.jpg','1993-08-25','025896547852','2025-10-17 02:54:20.815067','sthao@gmail.com','FEMALE','S-Thảo','$2a$10$VxROagy74WAwjrIaNOuNNOcwwTRdDJXrtmO2Xq7XRhVu/xHZBBFrG','0359685214',NULL,'2025-10-17 03:51:07.103007',3),(36,'Hồ Chí Minh','https://res.cloudinary.com/dcoejntp5/image/upload/v1760671078/booking_care/account/36.jpg','1996-08-29','032185697856','2025-10-17 02:55:20.517221','cay@gmail.com','MALE','S-Cậy','$2a$10$nkBvvwVM1sxKiX6CQBnXF.RvYDzhj.zik6Q/rGWGM9whskzScWPlS','0369852147',NULL,'2025-10-17 03:51:34.469803',3),(37,'Đà Nẵng','https://res.cloudinary.com/dcoejntp5/image/upload/v1760671094/booking_care/account/37.jpg','1996-11-13','025896547453','2025-10-17 02:56:13.338198','nguyet@gmail.com','FEMALE','S-Nguyệt','$2a$10$WFr6heGyUjZa9hsA6TUPD.8kSBI8fxEtbrnP6YqA4Wx6JDTDp5.XC','0968555123',NULL,'2025-10-17 03:52:01.074496',3),(38,'Hà Nội','https://res.cloudinary.com/dcoejntp5/image/upload/v1760671111/booking_care/account/38.jpg','2000-05-09','025899651258','2025-10-17 02:57:18.008946','yen@gmail.com','FEMALE','S-Yến','$2a$10$a7XV5uKJRmqSmbhzLns4Du4ddNd2HesWRuTNVeLT.IxIjpr2pKj6K','0245865792',NULL,'2025-10-17 03:52:20.572975',3),(39,'Hà nội','https://res.cloudinary.com/dcoejntp5/image/upload/v1760671132/booking_care/account/39.jpg','1999-06-10','035097003955','2025-10-17 02:58:06.770898','cong@gmail.com','MALE','S-Công','$2a$10$uD110qjmvoya0r8HN9Rw8.nh6tqRdaRHnew2HDGDwN4GyurxspZnu','0312123459',NULL,'2025-10-17 03:52:39.422101',3),(40,'Hồ Chí Minh','https://res.cloudinary.com/dcoejntp5/image/upload/v1760671149/booking_care/account/40.jpg','2006-11-23','035269874158','2025-10-17 02:59:04.292311','ngoc@gmail.com','FEMALE','S-Ngọc','$2a$10$LCD72cOKXD4//AG2EienXuWclarrhiJOzF0l15LrD4XXJqsRVNPli','0312123444','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZ29jQGdtYWlsLmNvbSIsImV4cCI6MTc2OTMxMzE3NCwiaWF0IjoxNzYwNjczMTc0LCJ1c2VyIjp7ImlkIjo0MCwibmFtZSI6IlMtTmfhu41jIiwiZW1haWwiOiJuZ29jQGdtYWlsLmNvbSIsImF2YXRhciI6bnVsbCwicm9sZSI6bnVsbCwiYWN0b3JUeXBlIjpudWxsLCJhY3RvcklkIjpudWxsfX0.uUPShXsR6pNV53zU-c6tBX-OZgT1afOQactEFqWOs2IvmaPzp3t8BdF9nL9Aexsk7mbIYCWEugKdACbyq2uzvg','2025-10-17 03:52:54.344443',3),(41,'hà nam','https://res.cloudinary.com/dcoejntp5/image/upload/v1760679835/booking_care/account/41.jpg',NULL,'035299051289','2025-10-17 05:43:15.405534','nth712004@gmail.com','MALE','Nguyễn Tiến Hưng','$2a$10$nOYY5uVXdCcq99Rywqx6SuoK.u9xM9c8X1y0voPTID4jw7GAX0w4G','0343145387',NULL,'2025-10-17 09:59:31.829099',2);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'Hà Nội','2025-10-17 01:27:29.946017',_binary '',NULL),(2,'TP. Hồ Chí Minh','2025-10-17 01:27:29.949032',_binary '',NULL),(3,'Đà Nẵng','2025-10-17 01:27:29.951440',_binary '',NULL),(4,'Hải Phòng','2025-10-17 01:27:29.952947',_binary '',NULL),(5,'Cần Thơ','2025-10-17 01:27:29.958030',_binary '',NULL),(6,'Bắc Ninh','2025-10-17 01:27:29.960042',_binary '',NULL),(7,'Quảng Ninh','2025-10-17 01:27:29.961041',_binary '',NULL),(8,'Nghệ An','2025-10-17 01:27:29.963107',_binary '',NULL),(9,'Thừa Thiên Huế','2025-10-17 01:27:29.964136',_binary '',NULL),(10,'Khánh Hòa','2025-10-17 01:27:29.966127',_binary '',NULL),(11,'Bình Dương','2025-10-17 01:27:29.968523',_binary '',NULL),(12,'Đồng Nai','2025-10-17 01:27:29.970603',_binary '',NULL);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_details`
--

DROP TABLE IF EXISTS `bill_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `service_cost` decimal(38,2) DEFAULT NULL,
  `total_service` decimal(38,2) DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  `bill_id` bigint DEFAULT NULL,
  `service_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfwm4sko9p82ndh6belyxx12bj` (`bill_id`),
  KEY `FKht6qehcgju2pjru7eul4aodt1` (`service_id`),
  CONSTRAINT `FKfwm4sko9p82ndh6belyxx12bj` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`id`),
  CONSTRAINT `FKht6qehcgju2pjru7eul4aodt1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_details`
--

LOCK TABLES `bill_details` WRITE;
/*!40000 ALTER TABLE `bill_details` DISABLE KEYS */;
INSERT INTO `bill_details` VALUES (1,'2025-10-17 03:28:08.214123',1,150000.00,150000.00,NULL,1,2),(2,'2025-10-17 03:28:08.218119',1,200000.00,200000.00,NULL,1,3),(3,'2025-10-17 03:36:14.192264',1,150000.00,150000.00,NULL,2,2),(4,'2025-10-17 03:37:00.588431',1,350000.00,350000.00,NULL,3,1),(5,'2025-10-17 03:37:00.590432',1,200000.00,200000.00,NULL,3,3),(6,'2025-10-17 03:38:22.176822',1,100000.00,100000.00,NULL,4,4),(7,'2025-10-17 03:38:22.178928',1,50000.00,50000.00,NULL,4,5),(8,'2025-10-17 03:39:55.966237',1,350000.00,350000.00,NULL,6,1),(9,'2025-10-17 03:41:40.569939',1,50000.00,50000.00,NULL,8,5),(10,'2025-10-17 03:42:54.268467',1,200000.00,200000.00,NULL,9,3),(11,'2025-10-17 03:44:02.077109',1,200000.00,200000.00,NULL,10,3),(12,'2025-10-17 03:44:02.079117',1,100000.00,100000.00,NULL,10,4),(13,'2025-10-17 03:44:20.556640',1,350000.00,350000.00,NULL,11,1),(14,'2025-10-17 03:45:08.828841',1,200000.00,200000.00,NULL,12,3),(15,'2025-10-17 03:45:08.829840',1,50000.00,50000.00,NULL,12,5),(16,'2025-10-17 03:45:59.776691',1,200000.00,200000.00,NULL,13,3),(17,'2025-10-17 03:48:23.260994',1,200000.00,200000.00,NULL,14,3),(18,'2025-10-17 03:48:42.102788',1,200000.00,200000.00,NULL,15,3),(19,'2025-10-17 03:48:42.104673',1,150000.00,150000.00,NULL,15,2),(20,'2025-10-17 03:49:13.327896',1,350000.00,350000.00,NULL,16,1),(21,'2025-10-17 03:50:02.496213',1,150000.00,150000.00,NULL,17,2),(22,'2025-10-17 03:50:17.445495',1,200000.00,200000.00,NULL,18,3),(23,'2025-10-17 03:53:10.630612',1,350000.00,350000.00,NULL,19,1);
/*!40000 ALTER TABLE `bill_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `total_bill` decimal(38,2) DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  `medical_record_id` bigint DEFAULT NULL,
  `patient_id` bigint DEFAULT NULL,
  `support_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsh9saxaw15t3siunl3in5f3fl` (`medical_record_id`),
  KEY `FKiklkhnj1odoll0m9otela7gb9` (`patient_id`),
  KEY `FKqcunk3qld4fj37mcqmhm8j0qd` (`support_id`),
  CONSTRAINT `FKiklkhnj1odoll0m9otela7gb9` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `FKqcunk3qld4fj37mcqmhm8j0qd` FOREIGN KEY (`support_id`) REFERENCES `supports` (`id`),
  CONSTRAINT `FKsh9saxaw15t3siunl3in5f3fl` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_records` (`id`),
  CONSTRAINT `bills_chk_1` CHECK ((`status` between 0 and 2))
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (1,'2024-10-17 03:28:08.205087',1,350000.00,'2025-10-17 03:28:08.224703',NULL,5,1),(2,'2024-11-17 03:36:14.190281',1,150000.00,'2025-10-17 03:36:14.195262',NULL,1,2),(3,'2024-09-17 03:37:00.585224',1,550000.00,'2025-10-17 03:37:00.591438',NULL,2,2),(4,'2025-10-17 03:38:22.172939',1,150000.00,'2025-10-17 03:38:22.180823',NULL,8,2),(6,'2025-12-17 03:39:55.963242',1,350000.00,'2025-10-17 03:39:55.968114',NULL,12,2),(8,'2025-07-17 03:41:40.566934',1,50000.00,'2025-10-17 03:41:40.571935',NULL,5,2),(9,'2025-10-17 03:42:54.265463',1,200000.00,'2025-10-17 03:42:54.270581',NULL,1,2),(10,'2025-10-17 03:44:02.073017',1,300000.00,'2025-10-17 03:44:02.081120',NULL,1,3),(11,'2025-05-17 03:44:20.553647',1,350000.00,'2025-10-17 03:44:20.558518',NULL,2,3),(12,'2025-10-17 03:45:08.824835',1,250000.00,'2025-10-17 03:45:08.831801',NULL,7,3),(13,'2025-10-17 03:45:59.772689',1,200000.00,'2025-10-17 03:45:59.778719',NULL,4,1),(14,'2025-10-17 03:48:23.257879',1,200000.00,'2025-10-17 03:48:23.262895',NULL,1,4),(15,'2025-10-17 03:48:42.098669',1,350000.00,'2025-10-17 03:48:42.105682',NULL,8,4),(16,'2025-10-17 03:49:13.324748',1,350000.00,'2025-10-17 03:49:13.330841',NULL,2,4),(17,'2025-10-17 03:50:02.494103',1,150000.00,'2025-10-17 03:50:02.499208',NULL,1,5),(18,'2025-10-17 03:50:17.442500',1,200000.00,'2025-10-17 03:50:17.448479',NULL,2,5),(19,'2025-10-17 03:53:10.627618',1,350000.00,'2025-10-17 03:53:10.633615',NULL,8,10);
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `appointment_date` date DEFAULT NULL,
  `check_feedback` bit(1) DEFAULT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` enum('CANCELLED','COMPLETED','CONFIRMED','PENDING') DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  `clinic_id` bigint DEFAULT NULL,
  `doctor_id` bigint DEFAULT NULL,
  `patient_id` bigint DEFAULT NULL,
  `time_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf1wjoh0n0fk2g10i77p00sf61` (`clinic_id`),
  KEY `FKpmatevs6gmonbk72xwx4lsklj` (`doctor_id`),
  KEY `FK9wc9wimrdcl6ocxvl0vxqfy7a` (`patient_id`),
  KEY `FKinuavu7o3ivhv6ei2wjx67v26` (`time_id`),
  CONSTRAINT `FK9wc9wimrdcl6ocxvl0vxqfy7a` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `FKf1wjoh0n0fk2g10i77p00sf61` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`),
  CONSTRAINT `FKinuavu7o3ivhv6ei2wjx67v26` FOREIGN KEY (`time_id`) REFERENCES `times` (`id`),
  CONSTRAINT `FKpmatevs6gmonbk72xwx4lsklj` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'2024-10-17',_binary '','2025-10-17 03:09:19.090806','đau','COMPLETED','2025-10-17 04:36:55.569661',1,1,1,11),(2,'0202-12-18',_binary '','2025-10-17 03:13:21.071608','mệt','COMPLETED','2025-10-17 04:53:49.471179',2,2,1,3),(3,'2024-09-18',_binary '','2025-10-17 03:13:40.283286','không khỏe','COMPLETED','2025-10-17 04:54:01.132032',3,3,1,8),(4,'2025-10-20',_binary '\0','2025-10-17 03:14:05.633467','khó chịu trong người','COMPLETED',NULL,5,5,1,7),(5,'2025-10-17',_binary '\0','2025-10-17 03:20:31.742152','mệt','CONFIRMED','2025-10-17 04:44:51.186236',1,1,2,12),(6,'2025-11-18',_binary '\0','2025-10-17 03:21:51.418001','đau','COMPLETED',NULL,2,2,2,8),(7,'2025-12-20',_binary '\0','2025-10-17 03:22:06.861276','không khỏe','COMPLETED',NULL,3,3,2,7),(8,'2025-10-22',_binary '\0','2025-10-17 03:22:58.599776','mệt','COMPLETED',NULL,4,4,2,6),(9,'2025-10-17',_binary '\0','2025-10-17 03:23:38.868423','mệt','CONFIRMED','2025-10-17 04:46:03.332934',1,1,4,8),(10,'2025-10-20',_binary '','2025-10-17 03:23:56.341417','không khỏe','COMPLETED','2025-10-17 04:56:15.130917',2,2,4,7),(11,'2025-10-20',_binary '','2025-10-17 03:24:54.324656','mệt','COMPLETED','2025-10-17 05:01:51.736433',5,5,5,8),(12,'2025-10-18',_binary '','2025-10-17 03:25:11.246036','không khỏe','COMPLETED','2025-10-17 05:02:03.652324',2,9,5,3),(13,'2025-10-22',_binary '\0','2025-10-17 03:27:17.581760','không khỏe','COMPLETED',NULL,1,8,5,7),(14,'2025-10-22',_binary '\0','2025-10-17 03:29:50.117185','mệt','CONFIRMED','2025-10-17 04:45:41.909387',1,1,6,6),(15,'2025-10-18',_binary '\0','2025-10-17 03:30:26.503146','không khỏe','COMPLETED',NULL,3,3,7,3),(16,'2025-10-18',_binary '\0','2025-10-17 03:31:27.869439','mệt','COMPLETED',NULL,2,2,8,2),(17,'2025-10-20',_binary '\0','2025-10-17 03:31:45.958531','đau','COMPLETED',NULL,4,4,8,6),(18,'2025-10-23',_binary '\0','2025-10-17 03:32:25.996177','không khỏe','COMPLETED',NULL,10,6,8,12),(19,'2025-10-22',_binary '\0','2025-10-17 03:33:00.960541','mệt','COMPLETED',NULL,1,7,9,7),(20,'2025-10-20',_binary '\0','2025-10-17 03:33:42.896527','đau','COMPLETED',NULL,1,7,10,7),(21,'2025-10-20',_binary '','2025-10-17 03:34:16.767211','đau','COMPLETED','2025-10-17 04:57:19.231063',2,2,12,12),(22,'2025-10-21',_binary '','2025-10-17 03:34:38.614953','mệt','COMPLETED','2025-10-17 04:57:28.475671',3,3,12,11),(23,'2025-10-20',_binary '','2025-10-17 05:26:25.626988','test đánh giá','COMPLETED','2025-10-17 05:27:21.322927',2,2,7,10),(24,'2025-10-21',_binary '','2025-10-17 06:34:05.398726','khám định kì','COMPLETED','2025-10-17 06:35:42.141067',1,1,3,3),(25,'2025-10-17',_binary '\0','2025-10-17 07:14:42.599876','vui','PENDING',NULL,1,1,1,9),(26,'2025-10-17',_binary '\0','2025-10-17 07:15:24.155791','vui','PENDING',NULL,1,1,1,10),(27,'2025-10-17',_binary '\0','2025-10-17 07:15:46.156118','mệt','PENDING',NULL,1,1,1,11);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinic_specialty`
--

DROP TABLE IF EXISTS `clinic_specialty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinic_specialty` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  `clinic_id` bigint NOT NULL,
  `specialty_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpi887i409nr24c6sm6qt39n25` (`clinic_id`),
  KEY `FKkbtjg9cv96v95as3qq29e1ljn` (`specialty_id`),
  CONSTRAINT `FKkbtjg9cv96v95as3qq29e1ljn` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`),
  CONSTRAINT `FKpi887i409nr24c6sm6qt39n25` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinic_specialty`
--

LOCK TABLES `clinic_specialty` WRITE;
/*!40000 ALTER TABLE `clinic_specialty` DISABLE KEYS */;
INSERT INTO `clinic_specialty` VALUES (1,'2025-10-17 02:20:46.029626',NULL,1,1),(2,'2025-10-17 02:20:46.040117',NULL,1,2),(3,'2025-10-17 02:20:46.050186',NULL,1,3),(4,'2025-10-17 02:20:46.059130',NULL,1,4),(5,'2025-10-17 02:20:46.068124',NULL,1,5),(6,'2025-10-17 02:20:46.077245',NULL,1,6),(7,'2025-10-17 02:20:46.085199',NULL,1,7),(8,'2025-10-17 02:20:46.093415',NULL,1,8),(9,'2025-10-17 02:20:46.102607',NULL,1,9),(10,'2025-10-17 02:20:46.110594',NULL,1,10),(11,'2025-10-17 02:20:46.119674',NULL,1,11),(12,'2025-10-17 02:20:46.127605',NULL,1,12),(13,'2025-10-17 02:20:46.135908',NULL,1,13),(14,'2025-10-17 02:20:46.143983',NULL,1,14),(15,'2025-10-17 02:20:46.153871',NULL,1,15),(16,'2025-10-17 02:21:13.342021',NULL,2,1),(17,'2025-10-17 02:21:13.353848',NULL,2,2),(18,'2025-10-17 02:21:13.362850',NULL,2,3),(19,'2025-10-17 02:21:13.371865',NULL,2,4),(20,'2025-10-17 02:21:13.381866',NULL,2,5),(21,'2025-10-17 02:21:13.389866',NULL,2,6),(22,'2025-10-17 02:21:13.398859',NULL,2,8),(23,'2025-10-17 02:21:13.407865',NULL,2,9),(24,'2025-10-17 02:21:13.416963',NULL,2,10),(25,'2025-10-17 02:21:13.426868',NULL,2,11),(26,'2025-10-17 02:21:13.435684',NULL,2,12),(27,'2025-10-17 02:21:13.444693',NULL,2,13),(28,'2025-10-17 02:21:13.456193',NULL,2,14),(29,'2025-10-17 02:21:13.464191',NULL,2,15),(30,'2025-10-17 02:21:39.967830',NULL,3,1),(31,'2025-10-17 02:21:39.979923',NULL,3,2),(32,'2025-10-17 02:21:39.988830',NULL,3,3),(33,'2025-10-17 02:21:39.996825',NULL,3,4),(34,'2025-10-17 02:21:40.005934',NULL,3,5),(35,'2025-10-17 02:21:40.015829',NULL,3,6),(36,'2025-10-17 02:21:40.025833',NULL,3,9),(37,'2025-10-17 02:21:40.035394',NULL,3,11),(38,'2025-10-17 02:21:40.044393',NULL,3,12),(39,'2025-10-17 02:21:40.051368',NULL,3,13),(40,'2025-10-17 02:21:40.060669',NULL,3,15),(41,'2025-10-17 02:22:00.999166',NULL,4,2),(42,'2025-10-17 02:22:01.009179',NULL,4,3),(43,'2025-10-17 02:22:01.017641',NULL,4,4),(44,'2025-10-17 02:22:01.025687',NULL,4,5),(45,'2025-10-17 02:22:01.034699',NULL,4,10),(46,'2025-10-17 02:22:01.041681',NULL,4,11),(47,'2025-10-17 02:22:01.050685',NULL,4,12),(48,'2025-10-17 02:22:01.058688',NULL,4,14),(49,'2025-10-17 02:22:01.067835',NULL,4,15),(50,'2025-10-17 02:22:19.487193',NULL,5,5),(51,'2025-10-17 02:22:19.497207',NULL,5,14),(52,'2025-10-17 02:22:43.002918',NULL,6,3),(53,'2025-10-17 02:22:43.013583',NULL,6,12),(54,'2025-10-17 02:23:02.579653',NULL,7,5),(55,'2025-10-17 02:23:02.589529',NULL,7,13),(56,'2025-10-17 02:23:02.597536',NULL,7,14),(57,'2025-10-17 02:23:20.790939',NULL,8,2),(58,'2025-10-17 02:23:20.801673',NULL,8,3),(59,'2025-10-17 02:23:20.810142',NULL,8,5),(60,'2025-10-17 02:23:20.820231',NULL,8,7),(61,'2025-10-17 02:23:20.829337',NULL,8,12),(62,'2025-10-17 02:23:20.838803',NULL,8,13),(63,'2025-10-17 02:23:20.846806',NULL,8,14),(64,'2025-10-17 02:23:32.625701',NULL,9,9),(65,'2025-10-17 02:23:32.637924',NULL,9,10),(66,'2025-10-17 02:23:32.645931',NULL,9,15),(67,'2025-10-17 02:23:46.676170',NULL,10,1),(68,'2025-10-17 02:23:46.685073',NULL,10,2),(69,'2025-10-17 02:23:46.693076',NULL,10,3),(70,'2025-10-17 02:23:46.699738',NULL,10,4),(71,'2025-10-17 02:23:46.707725',NULL,10,5),(72,'2025-10-17 02:23:46.715614',NULL,10,6),(73,'2025-10-17 02:23:46.723603',NULL,10,9),(74,'2025-10-17 02:23:46.731608',NULL,10,10),(75,'2025-10-17 02:23:46.740730',NULL,10,11),(76,'2025-10-17 02:23:46.748720',NULL,10,12),(77,'2025-10-17 02:23:46.757545',NULL,10,13),(78,'2025-10-17 02:23:46.764527',NULL,10,14),(79,'2025-10-17 02:23:46.773561',NULL,10,15);
/*!40000 ALTER TABLE `clinic_specialty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinics`
--

DROP TABLE IF EXISTS `clinics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinics` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) DEFAULT NULL,
  `description` mediumtext,
  `image` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  `address_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgxeehn94i6tisxi9i8qtks4fp` (`address_id`),
  CONSTRAINT `FKgxeehn94i6tisxi9i8qtks4fp` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinics`
--

LOCK TABLES `clinics` WRITE;
/*!40000 ALTER TABLE `clinics` DISABLE KEYS */;
INSERT INTO `clinics` VALUES (1,'2025-10-17 01:59:13.206195','Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương, hạng đặc biệt của Việt Nam. Bệnh viện có lịch sử trên 100 năm, bề dày truyền thống danh tiếng, là cái nôi của ngành ngoại khoa Việt Nam gắn liền với những thành tựu Y học quan trọng của đất nước.  Việt Đức là địa chỉ uy tín hàng đầu về ngoại khoa, tiến hành khám bệnh, chữa bệnh và thực hiện các kỹ thuật chụp chiếu, xét nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho người dân.  Bệnh viện có đội ngũ y bác sĩ hùng hậu, nhiều người kiêm là cán bộ giảng dạy tại Đại học Y khoa Hà Nội hoặc Khoa Y Dược - Đại học Quốc gia Hà Nội. Trong số họ nhiều người là chuyên gia đầu ngành và bác sĩ giàu kinh nghiệm ở các chuyên khoa khác nhau. ','https://res.cloudinary.com/dcoejntp5/image/upload/v1760666408/booking_care/clinic/1.jpg',NULL,'Bệnh viện Việt Đức','0943815720','Hà Nội','2025-10-17 02:00:08.545135',1),(2,'2025-10-17 02:01:10.324647','Bệnh viện Chợ Rẫy với lịch sử thành lập trên 100 năm, là bệnh viện hạng đặc biệt tuyến Trung ương lớn nhất cả nước với trên 1.800 giường và trên 3.000 kỹ thuật y tế được thực hiện. Hàng ngày Bệnh viện Chợ Rẫy tiếp nhận trung bình 6,000 -  8,000 bệnh nhân đến khám. Bệnh viện Chợ Rẫy là bệnh viện đa khoa hoàn chỉnh, xếp hạng đặc biệt, tuyến kỹ thuật sau cùng các tỉnh thành phía Nam, trực thuộc Bộ Y tế. Thế mạnh nổi bật tại Bệnh viện Chợ Rẫy là sự kết hợp giữa các chuyên khoa mang lại hiệu quả tốt nhất trong việc chẩn đoán và điều trị cho người bệnh.','https://res.cloudinary.com/dcoejntp5/image/upload/v1760666963/booking_care/clinic/2.jpg',NULL,'Bệnh viện Chợ Rẫy','0899674258','Hồ Chí Minh','2025-10-17 02:09:24.254537',2),(3,'2025-10-17 02:02:00.778449',' ','https://res.cloudinary.com/dcoejntp5/image/upload/v1760666979/booking_care/clinic/3.jpg',NULL,'Bệnh viện An Việt','0235656585','Hà Nội','2025-10-17 02:09:39.622639',1),(4,'2025-10-17 02:03:13.173781','Hệ thống y tế MEDLATEC bao gồm: 01 Bệnh viện Đa khoa, 07 Phòng khám Đa khoa, 33 chi nhánh, 29 văn phòng, 50 điểm thu gom mẫu trên toàn quốc.','https://res.cloudinary.com/dcoejntp5/image/upload/v1760666991/booking_care/clinic/4.png',NULL,'Hệ thông y tế Medlatec','03965821456','Hà Nội','2025-10-17 02:09:52.208732',3),(5,'2025-10-17 02:04:33.867088','Nha khoa Asia được thành lập với sứ mệnh cao cả, hướng tới việc cung cấp dịch vụ y tế chuyên sâu, an toàn và hiệu quả, góp phần nâng cao chất lượng cuộc sống cho cộng đồng. Với đội ngũ y bác sĩ dày dặn kinh nghiệm, sở hữu trình độ chuyên môn cao cùng hệ thống trang thiết bị y tế hiện đại, Nha khoa Asia cam kết mang đến những giải pháp chăm sóc sức khỏe tối ưu, được cá nhân hóa cho từng bệnh nhân. Chúng tôi thấu hiểu rằng sức khỏe là tài sản quý giá nhất của mỗi người. Vì vậy, Nha khoa Asia không ngừng phấn đấu để hoàn thiện quy trình khám chữa bệnh, tạo dựng môi trường y tế chuyên nghiệp, thân thiện, nhằm mang đến cho khách hàng những trải nghiệm dịch vụ y tế tốt nhất.','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667003/booking_care/clinic/5.png',NULL,'Nha khoa ASIA','0312658924','Hà Nội','2025-10-17 02:10:04.102295',1),(6,'2025-10-17 02:05:38.275279','Phòng Khám Chuyên Khoa Da Liễu Anh Mỹ- Anh Mỹ Clinic được thành lập với sứ mệnh cao cả, hướng tới việc cung cấp dịch vụ y tế chuyên sâu, an toàn và hiệu quả, góp phần nâng cao chất lượng cuộc sống cho cộng đồng. Với đội ngũ y bác sĩ dày dặn kinh nghiệm, sở hữu trình độ chuyên môn cao cùng hệ thống trang thiết bị y tế hiện đại, Phòng Khám Chuyên Khoa Da Liễu Anh Mỹ- Anh Mỹ Clinic cam kết mang đến những giải pháp chăm sóc sức khỏe tối ưu, được cá nhân hóa cho từng bệnh nhân. Chúng tôi thấu hiểu rằng sức khỏe là tài sản quý giá nhất của mỗi người. Vì vậy, Phòng Khám Chuyên Khoa Da Liễu Anh Mỹ- Anh Mỹ Clinic không ngừng phấn đấu để hoàn thiện quy trình khám chữa bệnh, tạo dựng môi trường y tế chuyên nghiệp, thân thiện, nhằm mang đến cho khách hàng những trải nghiệm dịch vụ y tế tốt nhất.','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667018/booking_care/clinic/6.png',NULL,'Phòng khám đa khoa da liễu Anh Mỹ - Anh Mỹ Clinic','0326951468','Hồ Chí Minh','2025-10-17 02:10:18.738559',2),(7,'2025-10-17 02:06:23.787504','Viện thẩm mỹ Anchee Clinic được thành lập với sứ mệnh cao cả, hướng tới việc cung cấp dịch vụ y tế chuyên sâu, an toàn và hiệu quả, góp phần nâng cao chất lượng cuộc sống cho cộng đồng. Với đội ngũ y bác sĩ dày dặn kinh nghiệm, sở hữu trình độ chuyên môn cao cùng hệ thống trang thiết bị y tế hiện đại, Viện thẩm mỹ Anchee Clinic cam kết mang đến những giải pháp chăm sóc sức khỏe tối ưu, được cá nhân hóa cho từng bệnh nhân. Chúng tôi thấu hiểu rằng sức khỏe là tài sản quý giá nhất của mỗi người. Vì vậy, Viện thẩm mỹ Anchee Clinic không ngừng phấn đấu để hoàn thiện quy trình khám chữa bệnh, tạo dựng môi trường y tế chuyên nghiệp, thân thiện, nhằm mang đến cho khách hàng những trải nghiệm dịch vụ y tế tốt nhất.','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667032/booking_care/clinic/7.png',NULL,'Thẩm mỹ viện Anchee','0968537421','Hà Nội','2025-10-17 02:10:33.795498',8),(8,'2025-10-17 02:07:16.902714','Nha khoa Alisa được thành lập với sứ mệnh cao cả, hướng tới việc cung cấp dịch vụ y tế chuyên sâu, an toàn và hiệu quả, góp phần nâng cao chất lượng cuộc sống cho cộng đồng. Với đội ngũ y bác sĩ dày dặn kinh nghiệm, sở hữu trình độ chuyên môn cao cùng hệ thống trang thiết bị y tế hiện đại, Nha khoa Alisa cam kết mang đến những giải pháp chăm sóc sức khỏe tối ưu, được cá nhân hóa cho từng bệnh nhân. Chúng tôi thấu hiểu rằng sức khỏe là tài sản quý giá nhất của mỗi người. Vì vậy, Nha khoa Alisa không ngừng phấn đấu để hoàn thiện quy trình khám chữa bệnh, tạo dựng môi trường y tế chuyên nghiệp, thân thiện, nhằm mang đến cho khách hàng những trải nghiệm dịch vụ y tế tốt nhất.','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667044/booking_care/clinic/8.png',NULL,'Nha khoa Alisa','0985652222','Hà Nội','2025-10-17 02:10:44.318420',1),(9,'2025-10-17 02:08:15.811221','Đông Đô IVF Center là trung tâm hỗ trợ sinh sản hàng đầu tại miền Bắc với tỷ lệ thành công làm IVF lên đến trên 80%. Tại đây, các bác sĩ đã giúp nhiều gia đình hiếm muộn thành công đón con yêu bằng phương pháp thụ tinh trong ống nghiệm và thụ tinh nhân tạo.','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667054/booking_care/clinic/9.png',NULL,'Đông Đô IVF Center','0359682541','Hà Nam','2025-10-17 02:10:54.822695',1),(10,'2025-10-17 02:11:46.384731',' ','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667119/booking_care/clinic/10.png',NULL,'Bệnh viện Hồng Ngọc','0985236874','Hà Nội','2025-10-17 02:11:59.921130',1);
/*!40000 ALTER TABLE `clinics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cost` decimal(38,2) NOT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `degree` enum('BACHELOR','DOCTOR','MASTER','PROFESSOR') NOT NULL,
  `description` mediumtext,
  `is_active` bit(1) DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  `account_id` bigint NOT NULL,
  `clinic_id` bigint NOT NULL,
  `specialty_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKfca1jj0he0x0hdwwidha1c801` (`account_id`),
  KEY `FKihqanxookqa5oh9guthqjfxxm` (`clinic_id`),
  KEY `FKb4ymcpidvwfn4kybv4adfvxcm` (`specialty_id`),
  CONSTRAINT `FKb4ymcpidvwfn4kybv4adfvxcm` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`),
  CONSTRAINT `FKihqanxookqa5oh9guthqjfxxm` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`),
  CONSTRAINT `FKmdsdc0tsj3lgvskwiweirxv44` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,250000.00,'2025-10-17 02:27:33.444040','DOCTOR',NULL,_binary '',NULL,22,1,3),(2,300000.00,'2025-10-17 02:29:28.795016','DOCTOR',NULL,_binary '',NULL,23,2,1),(3,400000.00,'2025-10-17 02:30:58.946869','DOCTOR',NULL,_binary '',NULL,24,3,4),(4,150000.00,'2025-10-17 02:33:03.768575','DOCTOR',NULL,_binary '',NULL,25,4,2),(5,230000.00,'2025-10-17 02:34:34.270449','DOCTOR',NULL,_binary '',NULL,26,5,5),(6,250000.00,'2025-10-17 02:36:08.106420','DOCTOR',NULL,_binary '',NULL,27,10,2),(7,200000.00,'2025-10-17 02:37:40.993095','MASTER',NULL,_binary '',NULL,28,1,7),(8,150000.00,'2025-10-17 02:39:15.341358','MASTER',NULL,_binary '',NULL,29,1,2),(9,200000.00,'2025-10-17 02:41:12.206810','MASTER',NULL,_binary '',NULL,30,2,8);
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `rate` int NOT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  `booking_id` bigint DEFAULT NULL,
  `doctor_id` bigint DEFAULT NULL,
  `patient_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK711wsps6w0svgsv749d0cnq1g` (`booking_id`),
  KEY `FK2uxpq6vjjodmoav4q5yhnr7xy` (`doctor_id`),
  KEY `FKk8cjtyvb0eeekpggptp23jtu6` (`patient_id`),
  CONSTRAINT `FK2uxpq6vjjodmoav4q5yhnr7xy` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`),
  CONSTRAINT `FKk8cjtyvb0eeekpggptp23jtu6` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `FKqnenmceqm1fre2qcuv9fbdw2d` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`),
  CONSTRAINT `feedbacks_chk_1` CHECK ((`rate` <= 5))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (1,'2025-10-17 04:36:55.512852','đẹp trai',5,NULL,1,1,1),(2,'2025-10-17 04:53:49.468148','giá cả hợp lý, tận tình',5,NULL,2,2,2),(3,'2025-10-17 04:54:01.129991','tận tình',5,NULL,3,3,3),(6,'2025-10-17 04:57:28.470685','tận tâm',5,NULL,22,3,3),(7,'2025-10-17 05:01:51.613712','tốt',5,NULL,11,5,5),(8,'2025-10-17 05:02:03.646016','chất lượng tuyệt',5,NULL,12,9,9),(9,NULL,'ok lắm',4,NULL,4,5,1),(10,'2025-10-17 06:35:42.107004','chất lượng tốt',5,NULL,24,1,3);
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_records`
--

DROP TABLE IF EXISTS `medical_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_records` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  `clinic_id` bigint DEFAULT NULL,
  `doctor_id` bigint DEFAULT NULL,
  `patient_id` bigint DEFAULT NULL,
  `specialty_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb4qdn2woy10qb45xret40o62r` (`clinic_id`),
  KEY `FKtny13k9v4o58styd47st3s2l5` (`doctor_id`),
  KEY `FKrav12h9aiw7pegjt62p8owwn3` (`patient_id`),
  KEY `FK9tsoovy2kf21sunn7ea5oo8id` (`specialty_id`),
  CONSTRAINT `FK9tsoovy2kf21sunn7ea5oo8id` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`),
  CONSTRAINT `FKb4qdn2woy10qb45xret40o62r` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`),
  CONSTRAINT `FKrav12h9aiw7pegjt62p8owwn3` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `FKtny13k9v4o58styd47st3s2l5` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_records`
--

LOCK TABLES `medical_records` WRITE;
/*!40000 ALTER TABLE `medical_records` DISABLE KEYS */;
/*!40000 ALTER TABLE `medical_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqye0axqv18a6egslmba3ljtcm` (`account_id`),
  CONSTRAINT `FKqye0axqv18a6egslmba3ljtcm` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp` (
  `email` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `current_submit` datetime(6) DEFAULT NULL,
  `expiry_time` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `seconds_left` bigint DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp`
--

LOCK TABLES `otp` WRITE;
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bhyt` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKk9r3mhukb7ml6ownhkekh1htj` (`account_id`),
  CONSTRAINT `FKflgrec6bbs3jrbf93o9fixjma` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'89562310',_binary '',3),(2,'87542110',_binary '',4),(3,'85654210',_binary '',5),(4,'89542110',_binary '',6),(5,'56748921',_binary '',7),(6,'54852136',_binary '',8),(7,'65952147',_binary '',9),(8,'59687243',_binary '',10),(9,'58555263',_binary '',11),(10,'98567421',_binary '',12),(11,'58632479',_binary '',13),(12,'56321059',_binary '',14),(13,'96548237',_binary '',15),(14,'87543129',_binary '',16),(15,'12345678',_binary '',17),(16,'90371456',_binary '',18),(17,'67283915',_binary '',19),(18,'54821763',_binary '',20),(19,NULL,_binary '',41);
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'2025-10-17 01:27:29.602737','role admin được khởi tạo khi dự án chạy','ADMIN',NULL),(2,'2025-10-17 01:27:29.674971','role doctor được khởi tạo khi dự án chạy','DOCTOR',NULL),(3,'2025-10-17 01:27:29.680398','role support được khởi tạo khi dự án chạy','SUPPORT',NULL),(4,'2025-10-17 01:27:29.684365','role client được khởi tạo khi dự án chạy','CLIENT',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_medical_record`
--

DROP TABLE IF EXISTS `service_medical_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_medical_record` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  `medical_record_id` bigint DEFAULT NULL,
  `service_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfjfoh4mrnyofvnbg9ske99qou` (`medical_record_id`),
  KEY `FKseu5vp59q8afddjx8kb7igr7p` (`service_id`),
  CONSTRAINT `FKfjfoh4mrnyofvnbg9ske99qou` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_records` (`id`),
  CONSTRAINT `FKseu5vp59q8afddjx8kb7igr7p` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_medical_record`
--

LOCK TABLES `service_medical_record` WRITE;
/*!40000 ALTER TABLE `service_medical_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_medical_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cost` decimal(38,2) DEFAULT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,350000.00,'2025-10-17 03:00:02.831830','','Tái khám',NULL),(2,150000.00,'2025-10-17 03:00:30.248700','','Khám lâm sàn',NULL),(3,200000.00,'2025-10-17 03:01:02.238330','','Khám sức khỏe',NULL),(4,100000.00,'2025-10-17 03:01:20.584250','','Khám thai tuần',NULL),(5,50000.00,'2025-10-17 03:01:42.341577','','Xét nghiệm máu tổng quát',NULL),(6,250000.00,'2025-10-17 03:02:10.889756','','Xét nghiệm bệnh truyền nhiễm',NULL),(7,120000.00,'2025-10-17 03:02:43.429614','','Điện tim đồ',NULL),(8,1000000.00,'2025-10-17 03:03:28.151448','','Xét nghiệm huyết thống(ADN)',NULL),(9,1200000.00,'2025-10-17 03:04:09.679189','','Tiểu phẫu nha khoa',NULL),(10,280000.00,'2025-10-17 03:04:51.865403','','Phân tích tế bào máu',NULL);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialties`
--

DROP TABLE IF EXISTS `specialties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialties` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) DEFAULT NULL,
  `description` mediumtext,
  `image` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialties`
--

LOCK TABLES `specialties` WRITE;
/*!40000 ALTER TABLE `specialties` DISABLE KEYS */;
INSERT INTO `specialties` VALUES (1,'2025-10-17 02:13:18.201228','-	Cơ xương khớp\r\n-	Danh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:\r\n-	Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm\r\n-	Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội\r\n-	Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.\r\n-	Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội Thấp khớp học,...\r\n-	Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...\r\n-	Bệnh Cơ Xương Khớp\r\n-	Gout\r\n-	Thoái hóa khớp: khớp gối, cột sống thắt lưng, cột sống cổ\r\n-	Viêm khớp dạng thấp, Viêm đa khớp, Viêm gân\r\n-	Tràn dịch khớp gối, Tràn dịch khớp háng, Tràn dịch khớp khủy, Tràn dịch khớp vai\r\n-	Loãng xương, đau nhức xương\r\n-	Viêm xương, gai xương\r\n-	Viêm cơ, Teo cơ, chứng đau mỏi cơ\r\n-	Yếu cơ, Loạn dưỡng cơ\r\n-	Các chấn thương về cơ, xương, khớp\r\n-	...\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667203/booking_care/specialty/1.png',_binary '','Cơ xương khớp','2025-10-17 02:13:24.298815'),(2,'2025-10-17 02:14:43.291377','-	Danh sách các giáo sư, bác sĩ chuyên khoa Thần kinh giỏi:\r\n-	Các giáo sư, bác sĩ uy tín đầu ngành chuyên khoa Thần kinh đã và đang công tác tại các bệnh viện lớn như: Bệnh viện Bạch Mai, Bệnh viện Việt Đức, Bệnh viện 108, Bệnh viện Đại học Y Hà Nội, Bệnh viện 103.\r\n-	Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hội Thần kinh Việt Nam, Hội Phẫu thuật Thần kinh...\r\n-	Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp.\r\n-	Khám bệnh chuyên khoa Thần kinh\r\n-	Bại Não	   \r\n-	Đau đầu, chóng mặt, buồn nôn   \r\n-	Bệnh Pakison, bệnh tiền đình	   \r\n-	Bị co cơ, căng dây thần kinh	       \r\n-	Động kinh, có những cơn vãng ý thức	   \r\n-	Bị tê bì nửa mặt, chèn dây thần kinh\r\n-	Bồn chồn, lo lắng, hồi hộp, chân tay run	   \r\n-	Có dấu hiệu tăng động	    \r\n-	Co rút cổ, đau đầu với mặt, chân tay, vã mồ hôi   \r\n-	Chấn thương đầu, dây thần kinh\r\n-	...\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667285/booking_care/specialty/2.png',_binary '','Thần kinh','2025-10-17 02:14:45.506591'),(3,'2025-10-17 02:15:19.849233','-	Danh sách các bác sĩ Tiêu hóa uy tín đầu ngành tại Việt Nam:\r\n-	Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên ngành Tiêu hóa tại Hà Nội\r\n-	Các giáo sư, phó giáo sư là giảng viên Đại học Y khoa Hà Nội\r\n-	Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như Bệnh viện Bạch Mai, Bệnh Viện Việt Đức, Bệnh Viện Nhi Trung ương, Bệnh viện Y học Cổ truyền Việt Nam...\r\n-	Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp,...\r\n-	Tư vấn, khám và điều trị các Bệnh Tiêu hóa\r\n-	Ăn uống kém, không ngon\r\n-	Rối loạn tiêu hóa, táo bón, trĩ\r\n-	Nhiễm vi khuẩn HP (Helicobacter pylori)\r\n-	Nội soi dạ dày, đại tràng, tiêu hóa\r\n-	Buồn nôn, chướng bụng, đầy bụng ợ chua, đầy hơi\r\n-	Co thắt thực quản, Hội chứng ruột kích thích\r\n-	Đau bụng, dạ dày, đại tràng, thượng vị\r\n-	Viêm đại tràng, dạ dày, tá tràng\r\n-	Ung thư dạ dày, U nang tuyến tụy\r\n-	Bệnh lý về gan, mật\r\n-	...\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667321/booking_care/specialty/3.png',_binary '','Tiêu hóa','2025-10-17 02:15:21.760032'),(4,'2025-10-17 02:15:46.084667','-	Danh dách các bác sĩ tim mạch uy tín đầu ngành tại Việt Nam:\r\n-	Các chuyên gia được đào tạo bài bản về chuyên ngành Tim mạch tại các trường đại học trong nước và quốc tế.\r\n-	Các giáo sư, phó giáo sư nghiên cứu và giảng dạy tại Đại học Y Hà Nội\r\n-	Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như Viện Tim Mạch Quốc Gia, Bệnh viện Bạch Mai, Bệnh viện Việt Đức, Bệnh Viện E, Bệnh Viện Tim Hà Nội\r\n-	Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Tim Mạch Việt Nam\r\n-	Đạt danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...\r\n-	Khám tư vấn tim mạch\r\n-	Khó thở, Đau ngực, đau tim\r\n-	Tăng huyết áp, hạ huyết áp\r\n-	Rối loạn mỡ máu, cao huyết áp, chóng mặt\r\n-	Bệnh van tim (Hẹp hở van tim), Hẹp động mạch chủ\r\n-	Cảm giác hồi hộp, tim đập nhanh	   \r\n-	Tim bẩm sinh, có tiền sử bệnh tim to, tiền sử tai biến	   \r\n-	Đã đặt stent tim, nong động mạch vành\r\n-	Giãn tĩnh mạch chân	   \r\n-	...\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667347/booking_care/specialty/4.png',_binary '','Tim mạch','2025-10-17 02:15:47.976064'),(5,'2025-10-17 02:16:14.112663','-	Danh sách các bác sĩ uy tín đầu ngành tại Việt Nam:\r\n-	Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên ngành Tai Mũi Họng tại Hà Nội\r\n-	Các giáo sư, phó giáo sư là giảng viên Đại học Y khoa Hà Nội\r\n-	Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như Bệnh viện Bạch Mai, Bệnh Viện Tai Mũi Họng Trung ương, Bệnh viện Quân Y 108...\r\n-	Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ cao cấp,...\r\n-	Các bệnh Tai Mũi Họng\r\n-	Ù tai, đau tai, chảy máu tai\r\n-	Thủng màng nhĩ, điếc đột ngột\r\n-	Viêm tai giữa\r\n-	Amidan, V.A\r\n-	Viêm xoang\r\n-	Nghẹt mũi\r\n-	Hay bị chảy máu cam\r\n-	Đau cổ họng, khó nuốt\r\n-	Ho kéo dài\r\n-	Ngủ ngáy\r\n-	...\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667376/booking_care/specialty/5.png',_binary '','Tai mũi họng','2025-10-17 02:16:16.343440'),(6,'2025-10-17 02:16:38.811488','-	Danh sách các bác sĩ Cột sống uy tín đầu ngành tại Việt Nam.\r\n-	Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên khoa Thần kinh - Cột sống - Xương khớp tại Hà Nội\r\n-	Các giáo sư, tiến sĩ, bác sĩ là giảng viên Đại học Y khoa Hà Nội, Học viện Quân Y.\r\n-	Các bác sĩ đã, đang công tác tại chuyên Khoa Thần Kinh, Cột sống, Xương Khớp - Bệnh viện Bạch Mai, Bệnh Viện Việt Đức, Bệnh Viện Trung ương Quân đội 108, Bệnh viện 103...\r\n-	Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...\r\n-	Bệnh Thần kinh - Cột sống\r\n-	Đau cột sống, đau thắt lưng\r\n-	Chấn thương cột sống\r\n-	Cột sống bị đau, sưng, cong, vẹo\r\n-	Đau mỏi cổ vai gáy, bả vai\r\n-	Đau tê mông xuống chân\r\n-	Phồng đĩa đệm\r\n-	Tê bì tay chân\r\n-	Thóa hóa đốt sống\r\n-	Thoái hóa L4, L5\r\n-	Thoát vị đĩa đệm\r\n-	Vôi hóa cột sống\r\n-	Xẹp cột sống\r\n-	...\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667400/booking_care/specialty/6.png',_binary '','Cột sống','2025-10-17 02:16:40.820214'),(7,'2025-10-17 02:17:05.892243','-	Bác sĩ Y học Cổ truyền giỏi\r\n-	Danh sách các bác sĩ Y học Cổ truyền uy tín đầu ngành tại Việt Nam:\r\n-	Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên khoa Y học Cổ truyền\r\n-	Các bác sĩ đã, đang công tác tại chuyên Khoa Y học Cổ truyền - Bệnh viện Y học Cổ truyền Trung ương, Bệnh viện Bạch Mai, Thanh Nhàn..\r\n-	Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp,..\r\n-	Tư vấn, khám và điều trị các vấn đề:\r\n-	Bệnh lý thần kinh: đau đầu, mất ngủ, suy nhược thần kinh...\r\n-	Bệnh lý cơ xương khớp: đau mỏi tay chân, thoái hóa khớp, viêm khớp...\r\n-	Bệnh lý tim mạch: Tăng huyết áp, huyết áp thấp, đau thắt ngực...\r\n-	Bệnh lý đường tiêu hóa: đau bụng, rối loạn chức năng tiêu hóa...\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667427/booking_care/specialty/7.png',_binary '','Y học cổ truyền','2025-10-17 02:17:07.651388'),(8,'2025-10-17 02:17:24.186851','-	Bác sĩ Châm cứu giỏi\r\n-	Bác sĩ Y học Cổ truyền uy tín đầu ngành tại Việt Nam:\r\n-	Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên khoa Y học Cổ truyền\r\n-	Các bác sĩ đã, đang công tác tại chuyên Khoa Y học Cổ truyền - Bệnh viện Y học Cổ truyền Trung ương, Bệnh viện Bạch Mai, Thanh Nhàn..\r\n-	Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp,..\r\n-	Tư vấn, khám và điều trị các vấn đề:\r\n-	Bệnh lý thần kinh: đau đầu, mất ngủ, suy nhược thần kinh...\r\n-	Bệnh lý cơ xương khớp: đau mỏi tay chân, thoái hóa khớp, viêm khớp...\r\n-	Bệnh lý tim mạch: Tăng huyết áp, huyết áp thấp, đau thắt ngực...\r\n-	Bệnh lý đường tiêu hóa: đau bụng, rối loạn chức năng tiêu hóa...\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667445/booking_care/specialty/8.png',_binary '','Châm cứu','2025-10-17 02:17:26.086160'),(9,'2025-10-17 02:17:48.956397','-	Bác sĩ chuyên khoa Nhi \r\n-	Danh sách bác sĩ chuyên khoa Nhi giỏi:\r\n-	Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn tại Hà Nội\r\n-	Các giảng viên đã và đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội\r\n-	Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như: Bệnh viện Nhi Trung ương, Khoa Nhi - Bệnh viện Bạch Mai.\r\n-	Khám và điều trị\r\n-	Bệnh lý sơ sinh\r\n-	Bệnh tiêu hóa\r\n-	Bệnh tuần hoàn\r\n-	Bệnh hô hấp\r\n-	Bệnh huyết học\r\n-	Bệnh thận Tiết niệu\r\n-	Bệnh thần kinh\r\n-	Bệnh ngoài da\r\n-	Bệnh xương khớp\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667470/booking_care/specialty/9.png',_binary '','Nhi khoa','2025-10-17 02:17:51.175693'),(10,'2025-10-17 02:18:13.028749','-	Bác sĩ Sản phụ khoa\r\n-	BookingCare cung cấp thông tin và lịch khám của các bác sĩ chuyên khoa sản giỏi tại Hà Nội.\r\n-	 Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên ngành Sản phụ khoa tại Hà Nội\r\n-	Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn tại Hà Nội như: Bệnh viện Phụ sản Trung ương, Bệnh viện Phụ sản Hà Nội, Khoa Sản - Bệnh viện Bạch Mai.\r\n-	Khám và điều trị\r\n-	Rối loạn kinh nguyệt, chậm kinh, đau bụng kinh   \r\n-	Tắc hai vòi trứng, Đa nang buồng trứng, Chụp vòi trứng, 	      \r\n-	Khám hiếm muộn, vô sinh	   \r\n-	Khám Phụ Khoa	   \r\n-	Khám thai sản	   \r\n-	Khám tiền hôn nhân, Tiền sinh	   \r\n-	Kiểm tra phụ khoa	   \r\n-	Loạn dưỡng vú	   \r\n-	Rong kinh kéo dài	   \r\n-	Siêu âm thai định kỳ	   \r\n-	Thai lưu\r\n-	U xơ tử cung, Viêm lộ tuyến\r\n-	...\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667494/booking_care/specialty/10.png',_binary '','Sản phụ khoa','2025-10-17 02:18:15.243967'),(11,'2025-10-17 02:18:40.752706','-	Bác sĩ Chuyên khoa Hô hấp - Phổi\r\n-	Danh sách các bác sĩ chuyên khoa Hô hấp - Phổi giỏi:\r\n-	Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện, phòng khám lớn  như: Bệnh viện Đại học Y dược, Phòng khám Phổi Sài Gòn, Bệnh viện Phổi Trung ương,...\r\n-	Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hội Phổi Việt Nam, Hội Hô Hấp Việt Nam...\r\n-	Khám và điều trị\r\n-	Lao\r\n-	Lao kháng thuốc\r\n-	Hen\r\n-	COPD\r\n-	Các bệnh Phổi nghề nghiệp\r\n-	Các bệnh hô hấp\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667522/booking_care/specialty/11.png',_binary '','Hô hấp - Phổi','2025-10-17 02:18:42.493284'),(12,'2025-10-17 02:19:03.892670','-	Bác sĩ Dị ứng Miễn dịch giỏi\r\n-	Danh sách các giáo sư, bác sĩ chuyên khoa Dị ứng miễn dịch giỏi:\r\n-	Các bác sĩ uy tín đầu ngành chuyên khoa Dị ứng miễn dịch đã và đang công tác tại các bệnh viện lớn như: Bệnh viện Đại học Y dược 1 TP.HCM, Bệnh viện E,...\r\n-	Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hội dị ứng miễn dịch châu Âu, Hội Hen – Dị ứng - Miễn dịch Lâm sàng TPHCM...\r\n-	Dị ứng\r\n-	Dị ứng thuốc, Phản ứng quá mẫn với Vacxin\r\n-	Hen phế quản\r\n-	Mày đay, Dị ứng thức ăn, Dị ứng do côn trùng đốt\r\n-	Viêm mũi dị ứng, Viêm kết mạc dị ứng, Viêm da cơ địa\r\n-	Miễn dịch\r\n-	Lupus ban đỏ hệ thống, Xơ cứng bì hệ thống\r\n-	Viêm da cơ, viêm đa cơ, Bệnh mô liên kết hỗn hợp\r\n-	Hội chứng kháng Phospholipid\r\n-	Viêm mạch Schoenlein-Henoch, Viêm gan tự miễn\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667545/booking_care/specialty/12.png',_binary '','Dị ứng miễu dịch','2025-10-17 02:19:05.402719'),(13,'2025-10-17 02:19:24.888454','-	Bác sĩ Chuyên khoa Mắt\r\n-	Hệ thống BookingCare cung cấp thông tin và lịch khám của các bác sĩ uy tín đầu ngành tại Việt Nam.\r\n-	Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn về chuyên khoa Mắt tại Hà Nội.\r\n-	Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như Bệnh viện Mắt Trung ương, Viện Y học Hàng không - Không quân, Bệnh viện Mắt Quốc tế DND...\r\n-	Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp,...\r\n-	Các bệnh về mắt\r\n-	Tật khúc xạ\r\n-	Cận thị\r\n-	Nhược thị\r\n-	Viễn thị\r\n-	Lão thị\r\n-	Loạn thị\r\n-	Các rối loạn về mắt\r\n-	Hội chứng khô mắt\r\n-	Rối loạn ở hốc mắt\r\n-	Rối loạn tuyến lệ\r\n-	Tăng nhãn áp\r\n-	Các bệnh lí khác về mắt\r\n-	Lác mắt\r\n-	Viêm giác mạc\r\n-	Đục thủy tinh thể\r\n-	Dịch kính võng mạc\r\n-	Bong võng mạc\r\n-	Bệnh thoái hóa hoàng điểm tuổi già\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667566/booking_care/specialty/13.png',_binary '','Mắt','2025-10-17 02:19:26.418067'),(14,'2025-10-17 02:19:43.626476','-	Bác sĩ Nha khoa \r\n-	Danh sách  bác sĩ Nha khoa uy tín tại Việt Nam:\r\n-	Các chuyên gia có quá trình đào tạo bài bản, nhiều năm kinh nghiệm và khám, điều trị các bệnh lý nha khoa và răng thẩm mỹ tại Hà Nội.\r\n-	Các bác sĩ đã hoặc đang công tác tại các bệnh viện, phòng khám nha khoa uy tín, với các trang thiết bị hiện đại.\r\n-	Khám tư vấn, điều trị các bệnh lý về răng, làm răng thẩm mỹ\r\n-	Nhổ răng\r\n-	Hàn răng\r\n-	Điều trị tủy\r\n-	Điều trị Viêm nha chu\r\n-	Bọc răng sứ\r\n-	Làm răng giả\r\n-	Dán sứ Veneer\r\n-	Niềng răng (nắn chỉnh răng)\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667584/booking_care/specialty/14.png',_binary '','Nha khoa','2025-10-17 02:19:45.261943'),(15,'2025-10-17 02:20:03.524038','-	Bác sĩ Siêu âm thai\r\n-	BookingCare cung cấp thông tin và lịch khám của các bác sĩ chuyên khoa sản - siêu âm thai giỏi tại Hà Nội.\r\n-	Các chuyên gia có quá trình đào tạo bài bản, kinh nghiệm công tác tại các bệnh viện lớn tại Hà Nội như: Bệnh viện Phụ sản Trung ương, Bệnh viện Phụ sản Hà Nội, Khoa Sản - Bệnh viện Bạch Mai.\r\n-	Khám và điều trị\r\n-	Dưới đây là một số vấn đề thường gặp mà các bác sĩ siêu âm thai thường khám và điều trị\r\n-	Khám thai sản\r\n-	Khám thai lần đầu\r\n-	Siêu âm thai định kỳ\r\n-	Siêu âm thai tuần thứ 12	\r\n-	Siêu âm thai tuần thứ 16	\r\n-	Siêu âm thai tuần thứ 18	\r\n-	Siêu âm thai tuần thứ 22\r\n','https://res.cloudinary.com/dcoejntp5/image/upload/v1760667604/booking_care/specialty/15.png',_binary '','Siêu âm thai','2025-10-17 02:20:05.231124');
/*!40000 ALTER TABLE `specialties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supports`
--

DROP TABLE IF EXISTS `supports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supports` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_active` bit(1) DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  `clinic_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK9jc8ebnwjani2fchsvmc87332` (`account_id`),
  KEY `FKs8vrgj9mlrvxsb8u4lwi8lc08` (`clinic_id`),
  CONSTRAINT `FKa5mm8iue17e80lyfdwfh0c17y` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `FKs8vrgj9mlrvxsb8u4lwi8lc08` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supports`
--

LOCK TABLES `supports` WRITE;
/*!40000 ALTER TABLE `supports` DISABLE KEYS */;
INSERT INTO `supports` VALUES (1,_binary '',31,1),(2,_binary '',32,2),(3,_binary '',33,3),(4,_binary '',34,4),(5,_binary '',35,5),(6,_binary '',36,6),(7,_binary '',37,7),(8,_binary '',38,8),(9,_binary '',39,9),(10,_binary '',40,10);
/*!40000 ALTER TABLE `supports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `times`
--

DROP TABLE IF EXISTS `times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `times` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) DEFAULT NULL,
  `end` varchar(255) DEFAULT NULL,
  `start` varchar(255) DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `times`
--

LOCK TABLES `times` WRITE;
/*!40000 ALTER TABLE `times` DISABLE KEYS */;
INSERT INTO `times` VALUES (1,'2025-10-17 01:27:29.907850','08:30','08:00',NULL),(2,'2025-10-17 01:27:29.910968','09:00','08:30',NULL),(3,'2025-10-17 01:27:29.912969','09:30','09:00',NULL),(4,'2025-10-17 01:27:29.915970','10:00','09:30',NULL),(5,'2025-10-17 01:27:29.917971','10:30','10:00',NULL),(6,'2025-10-17 01:27:29.919969','11:00','10:30',NULL),(7,'2025-10-17 01:27:29.922250','14:00','13:30',NULL),(8,'2025-10-17 01:27:29.923259','14:30','14:00',NULL),(9,'2025-10-17 01:27:29.925258','15:00','14:30',NULL),(10,'2025-10-17 01:27:29.927260','15:30','15:00',NULL),(11,'2025-10-17 01:27:29.929301','16:00','15:30',NULL),(12,'2025-10-17 01:27:29.931301','16:30','16:00',NULL);
/*!40000 ALTER TABLE `times` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-17 22:14:01
