-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 28, 2025 at 04:21 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fee`
--

-- --------------------------------------------------------

--
-- Table structure for table `fee_structure`
--

DROP TABLE IF EXISTS `fee_structure`;
CREATE TABLE IF NOT EXISTS `fee_structure` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fee_name` varchar(50) NOT NULL,
  `fee_grade` varchar(50) NOT NULL,
  `fee_amount` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fee_structure`
--

INSERT INTO `fee_structure` (`id`, `fee_name`, `fee_grade`, `fee_amount`) VALUES
(4, 'Annual_fee', 'grade 05', 5500),
(3, 'Monthly_fee', 'grade 04', 5500),
(5, 'Monthly fee', 'grade 01', 5600),
(6, 'Annual_fee', 'grade 01', 7500),
(7, 'trip fee', 'Grade 01', 5000);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
CREATE TABLE IF NOT EXISTS `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_fee_id` int NOT NULL,
  `paid_amount` double NOT NULL,
  `payment_date` date NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `extra_note` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `student_fee_id`, `paid_amount`, `payment_date`, `payment_method`, `extra_note`) VALUES
(1, 2, 5600, '2025-06-27', 'cash', 'nothing2'),
(2, 1, 5600, '2025-06-28', 'cash', 'nothing'),
(3, 5, 7500, '2025-06-28', 'Cash', ''),
(4, 8, 7500, '2025-06-28', 'Cash', ''),
(5, 2, 5600, '2025-06-28', 'Cash', ''),
(6, 7, 7500, '2025-06-28', 'Cash', ''),
(7, 1, 444444444, '2025-06-28', 'Cash', ''),
(8, 6, 8888888888, '2025-06-28', 'Cash', ''),
(9, 5, 5600, '2025-06-28', 'Cash', ''),
(10, 3, 5600, '2025-06-28', 'Cash', ''),
(11, 4, 5600, '2025-06-28', 'Cash', ''),
(12, 6, 8888888888, '2025-06-28', 'Cash', ''),
(13, 9, 5000, '2025-06-28', 'Cash', '');

-- --------------------------------------------------------

--
-- Table structure for table `student_fee`
--

DROP TABLE IF EXISTS `student_fee`;
CREATE TABLE IF NOT EXISTS `student_fee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `fee_name` varchar(50) NOT NULL,
  `fee_amount` double NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `assigned_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `student_fee`
--

INSERT INTO `student_fee` (`id`, `student_id`, `fee_name`, `fee_amount`, `payment_status`, `assigned_date`) VALUES
(1, 1, 'Monthly fee', 444444444, 'PAID', '2025-06-28'),
(2, 3, 'Monthly fee', 5600, 'PAID', '2025-06-28'),
(3, 11, 'Monthly fee', 5600, 'PAID', '2025-06-28'),
(4, 12, 'Monthly fee', 5600, 'PAID', '2025-06-28'),
(5, 13, 'Monthly fee', 5600, 'PAID', '2025-06-28'),
(6, 1, 'Annual_fee', 8888888888, 'PAID', '2025-06-28'),
(7, 3, 'Annual_fee', 7500, 'PAID', '2025-06-28'),
(8, 13, 'Annual_fee', 7500, 'PAID', '2025-06-28'),
(9, 1, 'trip fee', 5000, 'PAID', '2025-06-28'),
(10, 3, 'trip fee', 5000, 'DUE', '2025-06-28'),
(11, 13, 'trip fee', 5000, 'DUE', '2025-06-28');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
