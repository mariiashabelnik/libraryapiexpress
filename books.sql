-- -------------------------------------------------------------
-- TablePlus 4.7.0(427)
--
-- https://tableplus.com/
--
-- Database: library
-- Generation Time: 2022-06-08 15:11:20.5780
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `category` enum('DRAMA','ROMANCE','FICTION','HUMOR','HISTORY','KIDS','DETECTIVE') NOT NULL,
  `author` text NOT NULL,
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `released` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `books` (`id`, `title`, `category`, `author`, `added`, `released`) VALUES
(1, 'Musse & Helium. En oväntad vändning', 'KIDS', 'Camilla Brinck', '2022-06-08 14:20:22', '2022-06-07'),
(2, 'Skolmysteriet', 'KIDS', 'Martin Widmark', '2022-06-08 14:34:57', '2016-09-01'),
(3, 'The Fellowship of the Ring', 'FICTION', 'J R R Tolkien', '2022-06-08 14:34:57', '2005-10-01'),
(4, 'Sveriges långa historia : människor, makt och gudar under 14000 år', 'HISTORY', 'Jonathan Lindström', '2022-06-08 14:50:16', '2022-03-14'),
(5, 'Drömmarnas tid : berättelsen om affärsgeniet Axel Johnson', 'HISTORY', 'Axel Odelberg', '2022-06-08 14:50:16', '2022-05-16'),
(6, '\"\"De kommer att vara annorlunda svenskar\"\" : berättelsen om Sveriges första muslimer', 'HISTORY', 'Simon Sorgenfrei', '2022-06-08 14:50:16', '2022-04-22'),
(7, 'Sovjetunionens skendöd : en historia om det moderna Ryssland', 'HISTORY', 'Kristian Gerner', '2022-06-08 14:50:16', '2021-09-20'),
(8, 'Bridgerton: Romancing Mr Bridgerton (Bridgertons Book 4)', 'ROMANCE', 'Julia Quinn', '2022-06-08 14:50:16', '2021-02-04'),
(9, 'Eufori : en roman om Sylvia Plath', 'FICTION', 'Elin Cullhed', '2022-06-08 14:50:16', '2022-04-07'),
(10, 'Egenmäktigt förfarande : en roman om kärlek', 'ROMANCE', 'Lena Andersson\n', '2022-06-08 14:50:16', '2014-04-08'),
(11, 'Am I Overthinking This?', 'HUMOR', 'Michelle Rial', '2022-06-08 15:01:01', '2019-08-13'),
(12, 'Caesars papyrus', 'HUMOR', 'René Goscinny', '2022-06-08 15:01:01', '2015-10-30'),
(13, 'Take Away Skämt', 'HUMOR', 'Fady Negm El Din', '2022-06-08 15:01:01', '2022-04-13'),
(14, 'Ett fynd att dö för', 'DETECTIVE', 'Anders De la Motte', '2022-06-08 15:07:26', '2022-05-27'),
(15, 'Andra sidan månen', 'DETECTIVE', 'Mari Jungstedt', '2022-06-08 15:07:26', '2022-06-07'),
(16, 'Döden för oss samman', 'DETECTIVE', 'Håkan Mattsson', '2022-06-08 15:07:26', '2022-05-19'),
(17, 'Under falkens vingar', 'DETECTIVE', 'Anton Marklund', '2022-06-08 15:07:26', '2022-05-25'),
(18, 'Bröderna Lejonhjärta', 'KIDS', 'Astrid Lindgren', '2022-06-08 15:10:08', '2013-09-26'),
(19, 'Den där Emil', 'KIDS', 'Astrid Lindgren', '2022-06-08 15:10:08', '2010-06-09');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;