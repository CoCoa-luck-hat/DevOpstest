-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Dec 05, 2025 at 03:40 AM
-- Server version: 9.5.0
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `DevOpsV4`
--

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id_report` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `photo` longtext NOT NULL,
  `message` varchar(255) NOT NULL,
  `minHum` int NOT NULL,
  `maxHum` int NOT NULL,
  `minTemp` decimal(5,2) NOT NULL,
  `maxTemp` decimal(5,2) NOT NULL,
  `id_user` int NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id_report`, `title`, `photo`, `message`, `minHum`, `maxHum`, `minTemp`, `maxTemp`, `id_user`, `created_at`) VALUES
(3, 'asfasf', '1764870367827.png', 'awefawfafawfkuhaw awlifhawiol awiolgjawoil;gawjgoli;awjgoiawjg o;iaw gjaw;oi awoig awjgawopo', 0, 100, 26.30, 32.30, 1, '2025-12-04'),
(4, 'vdfsvd', '1764867580851.jpg', 'fbdfbfsdfagae ahfu weaheiouahfuaowifhawiouf hjawoif awhjiofawj aw fa', 0, 100, 27.10, 32.30, 1, '2025-12-04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','menager','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'test1211', 'test@gmail.com', '12345678', 'user', '2025-12-04'),
(4, 'fasfas', 'fasfa@asgn.com', 'au31892y', 'user', '2025-12-04'),
(5, 'fafw', 'awf@gmasi.com', 'afoajwfpoiawjfgawg', 'menager', '2025-12-04'),
(6, 'dasawfwa', 'fwafaw@gail.comad', '1yh98saef', 'menager', '2025-12-04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id_report`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id_report` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
