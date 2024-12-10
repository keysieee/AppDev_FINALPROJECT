-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2024 at 02:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rj_cgt`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `branch` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `time_in` time DEFAULT current_timestamp(),
  `time_out` time DEFAULT current_timestamp(),
  `date` date DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `employee_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `branch`, `location`, `time_in`, `time_out`, `date`, `created_at`, `updated_at`, `employee_id`) VALUES
(32, 'calapan', 'sta. isabel', '15:15:00', '17:35:38', '2024-12-08', '2024-12-08 07:15:33', '2024-12-08 09:35:38', '110521'),
(33, 'calapaa', 'singko', '12:20:00', '12:20:49', '2024-12-09', '2024-12-09 04:20:45', '2024-12-09 04:20:49', '110521');

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `manager_name` varchar(255) NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `year_established` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `branch_name`, `location`, `manager_name`, `contact_number`, `year_established`) VALUES
(1, 'dito', 'calapan', 'kc dd', '325', 1915),
(3, 'basta', 'dito lang', 'ewan', '12345679', 2024),
(4, 'R&J', 'masipit', 'keysie dela cruz', '0936132461', 2000),
(10, 'onzengko', 'bayanan', 'keysie dela cruz', '0936132461', 1918),
(11, 'ozc', 'naujan', 'jun pasno', '09595456555', 2024),
(12, 'nhggt', 'njvjhb', ' HNJM', '.0465123', 1916);

-- --------------------------------------------------------

--
-- Table structure for table `dashboard_data`
--

CREATE TABLE `dashboard_data` (
  `id` int(11) NOT NULL,
  `total_tasks` int(11) DEFAULT 0,
  `total_employees` int(11) DEFAULT 0,
  `total_inventory` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `discount_promotions`
--

CREATE TABLE `discount_promotions` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `item` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(5,2) NOT NULL,
  `price_after_discount` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discount_promotions`
--

INSERT INTO `discount_promotions` (`id`, `customer_name`, `item`, `price`, `discount`, `price_after_discount`, `created_at`) VALUES
(3, 'kc', 'comb', 200.00, 2.00, 196.00, '2024-12-03 16:17:41'),
(4, 'keysie', 'mang juan', 21.00, 1.00, 20.79, '2024-12-09 19:50:02');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('employee','admin') NOT NULL DEFAULT 'employee',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `first_name`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
('000', 'rindi', '$2a$10$nL7XhS.6PM81CubfAtU2vOvZhNpvSYvr6X0C4fXu3OqSwWndnCtYC', 'employee', '2024-12-01 16:19:25', '2024-12-01 16:19:25'),
('00001', 'Jhon', '$2a$10$Au5uYF9mosj8mjTPfmK1ve2WC6.pAoJEnjt0L0rJr13y3msjiptei', 'employee', '2024-12-02 01:28:49', '2024-12-02 01:28:49'),
('010', 'jenny', '$2a$10$x9.U64b0ItZ1P0R4AXZDyOzJMX9JLUiyrGtX0CWd7MUTkwh2F3w6q', 'employee', '2024-12-02 03:17:20', '2024-12-02 03:17:20'),
('0131', 'andrea', '$2a$10$mvoOF6y4YRY5R5Ltajf0Z.s8EL2YPYq19rglG9.OkwKxbdnCTQHT2', 'employee', '2024-12-04 04:03:03', '2024-12-04 04:03:03'),
('0456', 'andrea', '$2a$10$YwkWaoMlLopn/go3W2IAx.p9/WOdLVJgHvIAo0CGspwuEniVwznT2', 'employee', '2024-12-02 01:17:33', '2024-12-02 01:17:33'),
('0521', 'kc', '$2a$10$7DrtvJxH1Yr4rhaok9N07eGtbrzmRfTybqiGverbwkRZTqUzCwemG', 'admin', '2024-12-08 07:16:25', '2024-12-08 07:16:57'),
('0555', 'tangina', '$2a$10$9iI3SRISUD2Gcel512wNiexbF/Tr519chI/613wMqKEVUoCxVG46u', 'employee', '2024-12-02 02:47:47', '2024-12-02 02:47:47'),
('077', 'kai', '$2a$10$pCgxh/UQag7Dr3/a1kD7R.7F6CxQyxsS93m5e6P4TymOrzbftt9oq', 'employee', '2024-12-02 03:05:28', '2024-12-02 03:05:28'),
('090', 'Jhon', '$2a$10$JoFwibi7gyY6DHf6H83JDe3lj0U7SSEBD8z6zLKjGkXsMUs9imFuC', 'employee', '2024-12-02 04:01:12', '2024-12-02 04:01:12'),
('098', 'Jhon', '$2a$10$s.yk5CusZHK0fgRXgPofVODcbMBhcwpT6hcNSFFzoAI41iznYJm36', 'employee', '2024-12-02 03:15:03', '2024-12-02 03:15:03'),
('110521', 'keysie', '$2a$10$Qoj9tvorv/DCiF0vnbMBeeQeoDpR3YAFXn6H/3lXDzR6i/QRH2ahW', 'employee', '2024-12-08 07:14:58', '2024-12-08 07:14:58'),
('1111', 'Alvin', '$2a$10$mWFPq5TboPLkLT1FFdaM2uQQtUxul153ZT62v3W/PY.zd/BLFf.XK', 'employee', '2024-12-01 15:19:17', '2024-12-01 15:19:17'),
('1212', 'Ariana', '$2a$10$900vYGOvevcjdc..zLFuQ.6j6Je.2JeOh7oZTtYXYwd96oYaHvE0G', 'employee', '2024-12-02 01:31:07', '2024-12-02 01:31:07'),
('123', 'matt', '$2a$10$IjC2EqYZQhMv07RJkiM8dO5ropPlx9E9eObWfsFTmmdFliV.SoyYm', 'employee', '2024-11-27 00:48:30', '2024-11-27 00:48:30'),
('1234', 'lea', '$2a$10$9WGFEmiZVVHcaUlb7omE4OwLpURPoZgsUKief8mq7LwMG2zKTtjXy', 'admin', '2024-11-08 15:26:32', '2024-11-22 02:55:16'),
('125', 'jun', '$2a$10$3Tj0TkOLNZjZEoMSuK9gmuMQRi8GgtdU.YLDmeoTM4KomqCoGmwai', 'employee', '2024-11-26 07:27:24', '2024-11-26 07:27:24'),
('222', 'shena', '$2a$10$5F.MVzTEdoBaKuE0cVvnxu6oJw73sVtK/fFVtot826Tv5aYfRD1uO', 'employee', '2024-12-02 00:57:17', '2024-12-02 00:57:17'),
('2893', 'Alvin Villaverde', '$2a$10$zzhVz2lcal9G6ehuTDVz1.2LSV358m1vzdeZMjrZfR9EFoNvBkxGu', 'employee', '2024-11-09 02:19:47', '2024-11-09 02:19:47'),
('321', 'Jhon', '$2a$10$sD7fjTMCYvS5i.EG4cjGWemgUK3pmalI.RbVAwD/CwANg9AywsLd6', 'employee', '2024-12-01 15:16:58', '2024-12-01 15:16:58'),
('333', 'mar', '$2a$10$Ad5IvZjBamWInzyje3eAFO0tTel/2C50N/bMRQ0SzkHhiLKblYN/G', 'employee', '2024-11-24 01:40:35', '2024-11-24 01:40:35'),
('3636', 'lai', '$2a$10$zw.uCR4d1DfN.BFOnAUlbe4p5H.t5DBiePITdRjpPXqP6FgddDX2W', 'employee', '2024-12-02 02:37:54', '2024-12-02 02:37:54'),
('444', 'clone', '$2a$10$.ZMZVRfGT3ugCxzwRRgdPOuLdc60oVxQbID7tAZBEEvQNtDjODZm6', 'employee', '2024-12-01 16:05:11', '2024-12-01 16:05:11'),
('456', 'las', '$2a$10$prPJuEEiEZOS4KhjHdlvU.c54yYaClmORD2VW8RTLEOagmEllUsJy', 'employee', '2024-10-28 23:17:17', '2024-10-28 23:17:17'),
('555', 'lambot ', '$2a$10$tmznXWLbj3hijIrW.RVkNelFl6y43ako31gJN3dvhmwfwHp28qOvK', 'employee', '2024-12-01 15:52:59', '2024-12-01 15:52:59'),
('SE204', 'FORCIA LHYAM C. DE GUZMAN', '$2a$10$S2HKKrNU41dpkz7i6wx2meKNbfTLxOSnrieL.gBLrb73WGW7G1JfW', 'employee', '2024-10-29 08:25:03', '2024-10-29 08:25:03'),
('test123', 'John', 'hashedPassword', 'employee', '2024-12-02 01:34:12', '2024-12-02 01:34:12');

-- --------------------------------------------------------

--
-- Table structure for table `employee_info`
--

CREATE TABLE `employee_info` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(255) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_info`
--

INSERT INTO `employee_info` (`id`, `employee_id`, `first_name`, `last_name`, `email`, `phone_number`, `address`, `gender`, `password`) VALUES
(2, 'test123', 'John', 'Doe', 'john.doe@example.com', '1234567890', '123 Street', 'Male', 'hashedPassword'),
(3, '098', 'Jhon', 'Pasno', 'pasnojhonrey2@gmail.com', '09060349225', 'Bayanan II, Calapan City, Oriental Mindoro', 'Male', '$2a$10$s.yk5CusZHK0fgRXgPofVODcbMBhcwpT6hcNSFFzoAI41iznYJm36'),
(4, '010', 'jenny', 'lamo', 'jenny@gmail.com', '09361328461', 'calapan', 'Female', '$2a$10$x9.U64b0ItZ1P0R4AXZDyOzJMX9JLUiyrGtX0CWd7MUTkwh2F3w6q'),
(5, '090', 'Jhon', 'Pasno', 'pasnojhonrey2@gmail.com', '09060349225', 'Bayanan II, Calapan City, Oriental Mindoro', 'Male', '$2a$10$JoFwibi7gyY6DHf6H83JDe3lj0U7SSEBD8z6zLKjGkXsMUs9imFuC'),
(7, '0131', 'andrea', 'dela cruz', 'andrea@gmail.com', '0936132461', 'calapan', 'Female', '$2a$10$mvoOF6y4YRY5R5Ltajf0Z.s8EL2YPYq19rglG9.OkwKxbdnCTQHT2'),
(8, '110521', 'keysie', 'dela cruz', 'keysie@gmail.com', '09756532703', 'calapan', 'Female', '$2a$10$Qoj9tvorv/DCiF0vnbMBeeQeoDpR3YAFXn6H/3lXDzR6i/QRH2ahW'),
(9, '0521', 'kc', 'dela cruz', 'kc@gmail.com', '09060949225', 'calapan', 'Female', '$2a$10$7DrtvJxH1Yr4rhaok9N07eGtbrzmRfTybqiGverbwkRZTqUzCwemG');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stocks` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `return_refunds`
--

CREATE TABLE `return_refunds` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `item` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `reason` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `return_refunds`
--

INSERT INTO `return_refunds` (`id`, `customer_name`, `item`, `quantity`, `reason`, `price`, `created_at`, `updated_at`) VALUES
(5, 'kal', 'kal', 2, 'lo', 123.00, '2024-12-09 11:39:41', '2024-12-09 11:39:41');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(50) NOT NULL,
  `task_description` text NOT NULL,
  `task_date` date NOT NULL,
  `is_done` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_employee_id` (`employee_id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dashboard_data`
--
ALTER TABLE `dashboard_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discount_promotions`
--
ALTER TABLE `discount_promotions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `employee_info`
--
ALTER TABLE `employee_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `return_refunds`
--
ALTER TABLE `return_refunds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `dashboard_data`
--
ALTER TABLE `dashboard_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `discount_promotions`
--
ALTER TABLE `discount_promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employee_info`
--
ALTER TABLE `employee_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `return_refunds`
--
ALTER TABLE `return_refunds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee_info`
--
ALTER TABLE `employee_info`
  ADD CONSTRAINT `employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
