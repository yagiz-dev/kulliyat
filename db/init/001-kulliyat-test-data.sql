-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2026 at 03:13 PM
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
-- Database: `kulliyat`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`) VALUES
(1, 'Grigoriy Petrov'),
(3, 'Jack London'),
(4, 'Victor Hugo'),
(5, 'Jane Austen'),
(6, 'George Orwell'),
(7, 'William Shakespeare'),
(8, 'Albert Camus'),
(9, 'Fyodor Mihayloviç Dostoyevski'),
(10, 'Antoine de Saint-Exupery'),
(11, 'Jose Saramago'),
(12, 'Harper Lee'),
(13, 'Ray Bradbury'),
(14, 'Aldous Huxley'),
(15, 'Gabriel García Márquez'),
(16, 'Francis Scott Key Fitzgerald'),
(17, 'John Steinbeck'),
(18, 'Franz Kafka'),
(19, 'Lev Nikolayeviç Tolstoy'),
(20, 'William Faulkner'),
(23, 'Margaret Atwood'),
(24, 'J. K. Rowling'),
(25, 'George Eliot'),
(26, 'Umberto Eco'),
(27, 'J. R. R. Tolkien'),
(28, 'Toni Morrison'),
(29, 'Isaac Asimov'),
(30, 'Mark Twain'),
(31, 'Ernest Hemingway'),
(32, 'Elena Ferrante'),
(33, 'Miguel de Cervantes Saavedra'),
(34, 'Anne Frank'),
(35, 'Jules Payot'),
(51, 'Ferenc Molnar'),
(52, 'Oğuz Atay');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `genre` enum('BILIMKURGU','BIYOGRAFI','FANTASTIK','GIZEM','KURGU','KURGU_DISI','TARIH','TEKNOLOJI') DEFAULT NULL,
  `isbn` varchar(17) NOT NULL,
  `publication_year` int(11) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `publisher_id` bigint(20) DEFAULT NULL,
  `cover_image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `created_at`, `genre`, `isbn`, `publication_year`, `summary`, `title`, `updated_at`, `publisher_id`, `cover_image_url`) VALUES
(1, '2026-08-08 23:48:55.000000', 'TARIH', '9786254053702', 1923, 'Beyaz Zambaklar Ülkesinde, Rus yazar Grigory Petrov tarafından 1923 yılında kaleme alınmış; Finlandiya halkının cehaletten, yoksulluktan ve bataklıklardan kurtulup eğitimle, iradeyle modern bir medeniyet kurma mücadelesini anlatan ilham verici bir eserdir.', 'Beyaz Zambaklar Ülkesinde', '2026-08-09 22:55:11.000000', 1, '/covers/book-1.jpg'),
(2, '2026-08-09 19:19:18.000000', 'KURGU', '9786053322122', 1909, 'Genç bir denizcinin eğitim, edebiyat ve sınıf atlama tutkusu üzerinden bireycilik, aşk ve toplumsal eşitsizlikleri ele alan yarı otobiyografik roman.', 'Martin Eden', '2026-08-09 22:55:12.000000', 1, '/covers/book-2.png'),
(3, '2026-08-09 19:19:18.000000', 'KURGU', '9786053609902', 1829, 'İdamını bekleyen bir mahkûmun son saatlerini kendi zihninden anlatan ve ölüm cezasını sorgulayan güçlü bir vicdan anlatısı.', 'Bir İdam Mahkumunun Son Günü', '2026-08-09 22:55:11.000000', 1, '/covers/book-3.jpg'),
(4, '2026-08-09 19:19:18.000000', 'KURGU', '9789754587029', 1813, 'Elizabeth Bennet ile Bay Darcy arasındaki ilişki üzerinden aşkı, sınıfı, aile baskısını ve önyargıları inceleyen klasik roman.', 'Gurur ve Önyargı', '2026-08-09 22:55:12.000000', 1, '/covers/book-4.jpg'),
(6, '2026-08-09 19:21:34.000000', 'BILIMKURGU', '9789750718533', 1949, 'Gözetim, propaganda ve düşünce denetiminin yaşamın her alanını kuşattığı totaliter bir düzende bireyin özgürlük mücadelesini anlatan distopya.', '1984', '2026-08-09 22:55:11.000000', 2, '/covers/book-6.jpg'),
(7, '2026-08-09 19:21:34.000000', 'KURGU', '9789944888004', 1597, 'Düşman iki ailenin çocukları arasındaki yasak aşkı ve köklü nefretin trajik sonuçlarını konu alan Shakespeare klasiği.', 'Romeo ve Juliet', '2026-08-09 22:55:12.000000', 1, '/covers/book-7.png'),
(8, '2026-08-09 19:21:34.000000', 'KURGU', '9789750748677', 1942, 'Meursault\'nun toplumun beklentilerine kayıtsız duruşu üzerinden yabancılaşma, anlam ve absürd kavramlarını sorgulayan roman.', 'Yabancı', '2026-08-09 22:55:12.000000', 2, '/covers/book-8.jpg'),
(9, '2026-08-09 19:21:34.000000', 'KURGU', '9789754589023', 1866, 'İşlediği cinayeti üstün insan düşüncesiyle gerekçelendiren Raskolnikov\'un vicdan, suçluluk ve kefaret mücadelesini anlatır.', 'Suç ve Ceza', '2026-08-09 22:55:12.000000', 1, '/covers/book-9.png'),
(10, '2026-08-09 19:21:34.000000', 'KURGU', '9789750724435', 1943, 'Küçük bir gezginin karşılaşmaları aracılığıyla dostluk, sevgi, sorumluluk ve yetişkin dünyasının çelişkilerini anlatan alegorik eser.', 'Küçük Prens', '2026-08-09 22:55:12.000000', 13, '/covers/book-10.jpg'),
(11, '2026-08-09 19:21:34.000000', 'KURGU', '9786254182228', 1995, 'Açıklanamayan bir körlük salgını sırasında toplum düzeninin çözülüşünü ve insan doğasının dayanışma ile vahşet arasındaki sınırlarını inceler.', 'Körlük', '2026-08-09 22:55:12.000000', 14, '/covers/book-11.jpg'),
(12, '2026-08-09 19:21:34.000000', 'KURGU', '9786051736938', 1960, 'Bir çocuğun gözünden ırkçılık, adalet ve ahlaki cesaret konularını Amerikan Güneyi\'nde geçen bir dava çevresinde ele alır.', 'Bülbülü Öldürmek', '2026-08-09 22:55:11.000000', 15, '/covers/book-12.jpg'),
(13, '2026-08-09 19:21:34.000000', 'BILIMKURGU', '9786053757818', 1953, 'Kitapların yasaklandığı bir gelecekte görevini sorgulamaya başlayan itfaiyeci Guy Montag\'ın düşünsel uyanışını anlatan distopya.', 'Fahrenheit 451', '2026-08-09 22:55:11.000000', 16, '/covers/book-13.jpg'),
(14, '2026-08-09 19:21:34.000000', 'BILIMKURGU', '9789756902165', 1932, 'İnsanların genetik olarak sınıflandırıldığı ve haz yoluyla denetlendiği kusursuz görünen bir toplumun özgürlükten ödediği bedeli sorgular.', 'Cesur Yeni Dünya', '2026-08-09 22:55:11.000000', 16, '/covers/book-14.jpg'),
(15, '2026-08-09 19:21:34.000000', 'KURGU', '9786053324744', 1862, 'Jean Valjean\'ın dönüşümü üzerinden adalet, merhamet, yoksulluk ve toplumsal eşitsizliği geniş bir tarihsel çerçevede anlatır.', 'Sefiller (2 Cilt Takım)', '2026-08-09 22:55:12.000000', 1, '/covers/book-15.jpg'),
(16, '2026-08-09 19:21:34.000000', 'KURGU', '9789750719363', 1967, 'Buendía ailesinin kuşaklar boyunca süren öyküsü aracılığıyla yalnızlık, kader ve Latin Amerika tarihini büyülü gerçekçilikle anlatır.', 'Yüzyıllık Yalnızlık', '2026-08-09 22:55:12.000000', 2, '/covers/book-16.jpg'),
(17, '2026-08-09 19:21:34.000000', 'KURGU', '9786053325956', 1925, 'Jay Gatsby\'nin erişilmez aşkı ve görkemli hayatı üzerinden Amerikan Rüyası\'nın cazibesini ve çöküşünü ele alır.', 'Muhteşem Gatsby', '2026-08-09 22:55:12.000000', 1, '/covers/book-17.jpg'),
(18, '2026-08-09 19:21:34.000000', 'KURGU', '9789750531170', 1939, 'Büyük Buhran döneminde toprağından koparılan Joad ailesinin göçünü, sömürüyü ve dayanışma arayışını anlatır.', 'Gazap Üzümleri', '2026-08-09 22:55:11.000000', 21, '/covers/book-18.jpg'),
(19, '2026-08-09 19:21:34.000000', 'KURGU', '9786053324249', 1925, 'Neden suçlandığını bilmeden bürokratik bir yargı düzenine çekilen Josef K.\'nın çaresizliğini ve yabancılaşmasını konu alır.', 'Dava', '2026-08-09 22:55:11.000000', 1, '/covers/book-19.png'),
(20, '2026-08-09 19:21:34.000000', 'TARIH', '9786053329008', 1869, 'Napolyon Savaşları sırasında Rus aristokrasisinin yaşamını, aileleri ve tarih içindeki bireysel seçimleri destansı ölçekte anlatır.', 'Savaş ve Barış (2 Cilt Takım)', '2026-08-09 22:55:12.000000', 1, '/covers/book-20.jpg'),
(21, '2026-08-09 19:21:34.000000', 'KURGU', '9789750808869', 1929, 'Compson ailesinin çözülüşünü farklı anlatıcılar ve parçalı zaman yapısıyla aktaran modernist bir Amerikan edebiyatı klasiği.', 'Ses ve Öfke', '2026-08-09 22:55:12.000000', 24, '/covers/book-21.jpg'),
(22, '2026-08-09 19:21:34.000000', 'KURGU', '9789750739880', 1880, 'Bir baba cinayeti çevresinde inanç, özgür irade, ahlak ve aile çatışmasını üç kardeşin farklı dünyaları üzerinden inceler.', 'Karamazov Kardeşler', '2026-08-09 22:55:12.000000', 2, '/covers/book-22.jpg'),
(23, '2026-08-09 19:21:34.000000', 'KURGU', '9789750739651', 1878, 'Anna\'nın yasak aşkı ile Levin\'in anlam arayışını paralel ilerleterek aile, toplum ve bireysel mutluluk üzerine çok katmanlı bir anlatı kurar.', 'Anna Karenina (2 Cilt Takım)', '2026-08-10 11:41:25.000000', 2, '/covers/book-23.png'),
(24, '2026-08-09 19:21:35.000000', 'KURGU_DISI', '9789754700114', 1971, 'Türk edebiyatının en önemli eserlerinden biri olan Tutunamayanlar’ı Berna Moran, “hem söyledikleri hem de söyleyiş biçimiyle bir başkaldırı” olarak niteler. Moran’a göre “Oğuz Atay’ın mizah gücü, duyarlılığı ve kullandığı teknik incelikler, Tutunamayanlar’ı büyük bir yeteneğin ürünü yapmış, yapıttaki bu yetkinlik Türk romanını çağdaş roman anlayışıyla aynı hizaya getirmiş ve ona çok şey kazandırmıştır.” Küçük burjuva dünyasını zekice alaya alan Atay “saldırısını, tutunanların anlamayacağı, red edeceği türden bir romanla yapar.” Tutunamayanlar, 1970 TRT Roman Ödülü’nü kazanmıştı.', 'Tutunamayanlar', '2026-08-09 23:07:56.000000', 21, '/covers/book-24.jpg'),
(25, '2026-08-09 19:21:35.000000', 'FANTASTIK', '9789750843877', 1997, 'Harry Potter\'ın büyücülük dünyasını keşfetmesini, dostluklarını ve karanlık büyücü Voldemort\'a karşı yıllara yayılan mücadelesini içeren yedi kitaplık seri.', 'Harry Potter Seti (7 Kitap)', '2026-08-09 22:55:12.000000', 24, '/covers/book-25.jpg'),
(26, '2026-08-09 19:21:35.000000', 'KURGU', '9789750846656', 1871, 'Taşra kasabasındaki farklı hayatları kesiştirerek evlilik, idealizm, siyaset ve toplumsal değişimi ayrıntılı biçimde inceler.', 'Middlemarch', '2026-08-09 22:55:12.000000', 24, '/covers/book-26.jpg'),
(27, '2026-08-09 19:21:35.000000', 'GIZEM', '9789750732737', 1980, 'Orta Çağ manastırındaki gizemli ölümleri araştıran William\'ın yolculuğu üzerinden bilgi, iktidar ve inanç çatışmasını anlatır.', 'Gülün Adı', '2026-08-09 22:55:11.000000', 2, '/covers/book-27.jpg'),
(28, '2026-08-09 19:21:35.000000', 'FANTASTIK', '9789753423472', 1954, 'Orta Dünya\'nın özgür halklarının Tek Yüzük\'ü yok etmek ve karanlık güç Sauron\'u durdurmak için verdiği destansı mücadele.', 'Yüzüklerin Efendisi (Tek Cilt Özel Basım)', '2026-08-09 22:55:12.000000', 31, '/covers/book-28.jpg'),
(29, '2026-08-09 19:21:35.000000', 'KURGU', '9789755707686', 1987, 'Kölelikten kaçan Sethe\'nin geçmişiyle ve kaybettiği çocuğun hatırasıyla yüzleşmesini travma, annelik ve özgürlük ekseninde anlatır.', 'Sevilen', '2026-08-09 22:55:12.000000', 32, '/covers/book-29.jpg'),
(30, '2026-08-09 19:21:35.000000', 'BILIMKURGU', '9786053759355', 1950, 'Geleceğin Galaktik İmparatorluğu\'nda gözden düşmüş Dünya\'ya savrulan sıradan bir insanın gezegenler arası bir komplonun merkezine yerleşmesini anlatır.', 'Gökteki Çakıl Taşı - Galaktik İmparatorluk Serisi 3', '2026-08-09 22:55:11.000000', 16, '/covers/book-30.jpg'),
(31, '2026-08-09 19:21:35.000000', 'KURGU', '9786053321194', 1884, 'Huck ile kölelikten kaçan Jim\'in Mississippi boyunca yolculuğunu özgürlük, dostluk ve toplumsal ikiyüzlülük temalarıyla anlatır.', 'Huckleberry Finn\'in Maceraları', '2026-08-09 22:55:12.000000', 1, '/covers/book-31.png'),
(32, '2026-08-09 19:21:35.000000', 'TARIH', '9789752201699', 1940, 'İspanya İç Savaşı\'nda bir köprüyü havaya uçurmakla görevlendirilen Robert Jordan\'ın görev, aşk ve ölümle yüzleşmesini konu alır.', 'Çanlar Kimin İçin Çalıyor', '2026-08-09 22:55:11.000000', 35, '/covers/book-32.jpg'),
(33, '2026-08-09 19:21:35.000000', 'BIYOGRAFI', '9786059489133', 1880, 'Aşağıya bakmak korkutucu. Eğer aşağıya bakarsam tutunduğum son şerit de elimden kaçacak ve yok olacakmışım gibi hissediyorum. Bakmıyorum, fakat bakmamak daha da kötü çünkü şimdi de son şerit koptuğunda başıma gelecek olanları düşünüyorum.\n\nMüthiş bir dehşetle gücümün son damlasını da tükettiğimi hissediyorum, sırtım boşluğa gittikçe daha da çöküyor. Bir saniye sonra düşeceğim. Aniden aklıma bir fikir geliyor: Bu gerçek olamaz. Bu yalnızca bir rüya.', 'İtiraflarım', '2026-08-09 23:03:39.000000', 144, '/covers/book-33.png'),
(34, '2026-08-09 19:21:35.000000', 'KURGU', '9789753633383', 1605, 'Şövalye romanslarından etkilenen Don Quijote ile yoldaşı Sancho Panza\'nın gerçeklik ve hayal arasındaki maceralarını anlatır.', 'Don Quijote (2 Cilt Takım Kutulu)', '2026-08-09 22:55:11.000000', 24, '/covers/book-34.jpg'),
(35, '2026-08-09 19:21:35.000000', 'KURGU', '9789750815546', 1906, 'Nemecsek, Boka ve Pál Sokağı’nın öbür çocukları 1907 yılında Budapeşte’nin yoksul Józsefváros semtinden yola çıktılar. Bugün artık bütün dünyada tanınıyorlar. Bugüne kadar her yaştan milyonlarca insan onların dokunaklı hikâyesini okudu; tıpkı Budapeşteli çocuklar gibi onlar da Boka’nın cesaretine hayran oldu, Nemecsek’in ürkek ama kararlı kahramanlığı karşısında gözyaşlarını tutamadı.\n\nŞimdi artık Pál Sokağı Çocukları’nın Arsa’sında kocaman çok katlı evler var.\n\nAma ne gam: Dünyanın bütün çocukları Pál Sokağı’ndandır!', 'Pal Sokağı Çocukları', '2026-08-09 22:59:27.000000', 24, '/covers/book-35.jpg'),
(36, '2026-08-09 19:21:35.000000', 'KURGU_DISI', '9786052245088', 1893, 'Dikkat, çalışma disiplini ve alışkanlıklar üzerinden iradenin bilinçli biçimde nasıl güçlendirilebileceğini ele alan kişisel gelişim klasiği.', 'İrade Terbiyesi', '2026-08-09 22:55:11.000000', 39, '/covers/book-36.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `book_author`
--

CREATE TABLE `book_author` (
  `book_id` bigint(20) NOT NULL,
  `author_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book_author`
--

INSERT INTO `book_author` (`book_id`, `author_id`) VALUES
(6, 6),
(32, 31),
(36, 35),
(12, 12),
(1, 1),
(3, 4),
(14, 14),
(19, 18),
(34, 33),
(13, 13),
(18, 17),
(30, 29),
(27, 26),
(4, 5),
(25, 24),
(31, 30),
(22, 9),
(11, 11),
(10, 10),
(2, 3),
(26, 25),
(17, 16),
(7, 7),
(20, 19),
(15, 4),
(21, 20),
(29, 28),
(9, 9),
(8, 8),
(28, 27),
(16, 15),
(35, 51),
(33, 19),
(24, 52),
(23, 19);

-- --------------------------------------------------------

--
-- Table structure for table `book_copies`
--

CREATE TABLE `book_copies` (
  `id` bigint(20) NOT NULL,
  `inventory_number` varchar(255) NOT NULL,
  `physical_location` varchar(255) DEFAULT NULL,
  `status` enum('AVAILABLE','LOANED','LOST','MAINTENANCE') NOT NULL,
  `book_id` bigint(20) NOT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book_copies`
--

INSERT INTO `book_copies` (`id`, `inventory_number`, `physical_location`, `status`, `book_id`, `notes`) VALUES
(1, 'TOFAS-KTP-00001', '4. kat 5A rafı', 'AVAILABLE', 1, NULL),
(2, 'TOFAS-KTP-00002', '5. kat 2A rafı', 'AVAILABLE', 1, NULL),
(3, 'TOFAS-KTP-00003', '1. kat, A bölümü, 1. raf', 'AVAILABLE', 1, NULL),
(4, 'TOFAS-KTP-00004', '1. kat, A bölümü, 1. raf', 'LOANED', 1, NULL),
(5, 'TOFAS-KTP-00005', '1. kat, A bölümü, 1. raf', 'LOANED', 1, NULL),
(6, 'TOFAS-KTP-00006', '1. kat, A bölümü, 1. raf', 'MAINTENANCE', 1, 'Kitap kapağında yırtık tespit edildi. 10 Ağustos 2026\'da tamirata yönlendirildi.'),
(7, 'TOFAS-KTP-00007', '1. kat, A bölümü, 1. raf', 'MAINTENANCE', 1, NULL),
(8, 'TOFAS-KTP-00008', '1. kat, A bölümü, 2. raf', 'LOST', 1, NULL),
(9, 'TOFAS-KTP-00009', '1. kat, A bölümü, 2. raf', 'AVAILABLE', 1, NULL),
(10, 'TOFAS-KTP-00010', '1. kat, A bölümü, 2. raf', 'LOST', 1, NULL),
(11, 'TOFAS-KTP-00011', '1. kat, A bölümü, 2. raf', 'AVAILABLE', 1, NULL),
(12, 'TOFAS-KTP-00012', '1. kat, A bölümü, 2. raf', 'MAINTENANCE', 1, NULL),
(13, 'TOFAS-KTP-00013', '1. kat, A bölümü, 3. raf', 'AVAILABLE', 1, NULL),
(14, 'TOFAS-KTP-00014', '1. kat, A bölümü, 3. raf', 'AVAILABLE', 1, NULL),
(15, 'TOFAS-KTP-00015', '1. kat, A bölümü, 3. raf', 'AVAILABLE', 1, NULL),
(16, 'TOFAS-KTP-00016', '1. kat, A bölümü, 3. raf', 'AVAILABLE', 1, NULL),
(17, 'TOFAS-KTP-00017', '1. kat, A bölümü, 3. raf', 'AVAILABLE', 1, NULL),
(18, 'TOFAS-KTP-00018', '2. kat, B bölümü, 1. raf', 'LOANED', 2, 'Bayağıdır gecikmede'),
(19, 'TOFAS-KTP-00019', '2. kat, B bölümü, 1. raf', 'LOANED', 2, NULL),
(20, 'TOFAS-KTP-00020', '2. kat, B bölümü, 1. raf', 'LOANED', 2, NULL),
(21, 'TOFAS-KTP-00021', '2. kat, B bölümü, 1. raf', 'AVAILABLE', 2, NULL),
(22, 'TOFAS-KTP-00022', '2. kat, B bölümü, 1. raf', 'AVAILABLE', 2, NULL),
(23, 'TOFAS-KTP-00023', '2. kat, B bölümü, 2. raf', 'AVAILABLE', 2, NULL),
(24, 'TOFAS-KTP-00024', '2. kat, B bölümü, 2. raf', 'AVAILABLE', 2, NULL),
(25, 'TOFAS-KTP-00025', '2. kat, B bölümü, 2. raf', 'AVAILABLE', 2, NULL),
(26, 'TOFAS-KTP-00026', '2. kat, B bölümü, 2. raf', 'AVAILABLE', 2, NULL),
(27, 'TOFAS-KTP-00027', '2. kat, B bölümü, 2. raf', 'AVAILABLE', 2, NULL),
(28, 'TOFAS-KTP-00028', '2. kat, B bölümü, 3. raf', 'AVAILABLE', 2, NULL),
(29, 'TOFAS-KTP-00029', '2. kat, B bölümü, 3. raf', 'AVAILABLE', 2, NULL),
(30, 'TOFAS-KTP-00030', '2. kat, B bölümü, 3. raf', 'AVAILABLE', 2, NULL),
(31, 'TOFAS-KTP-00031', '2. kat, B bölümü, 3. raf', 'AVAILABLE', 2, NULL),
(32, 'TOFAS-KTP-00032', '2. kat, B bölümü, 3. raf', 'AVAILABLE', 2, NULL),
(33, 'TOFAS-KTP-00033', '3. kat, C bölümü, 1. raf', 'LOANED', 3, NULL),
(34, 'TOFAS-KTP-00034', '3. kat, C bölümü, 1. raf', 'LOANED', 3, NULL),
(35, 'TOFAS-KTP-00035', '3. kat, C bölümü, 1. raf', 'LOANED', 3, NULL),
(36, 'TOFAS-KTP-00036', '3. kat, C bölümü, 1. raf', 'AVAILABLE', 3, NULL),
(37, 'TOFAS-KTP-00037', '3. kat, C bölümü, 1. raf', 'AVAILABLE', 3, NULL),
(38, 'TOFAS-KTP-00038', '3. kat, C bölümü, 2. raf', 'AVAILABLE', 3, NULL),
(39, 'TOFAS-KTP-00039', '3. kat, C bölümü, 2. raf', 'AVAILABLE', 3, NULL),
(40, 'TOFAS-KTP-00040', '3. kat, C bölümü, 2. raf', 'AVAILABLE', 3, NULL),
(41, 'TOFAS-KTP-00041', '3. kat, C bölümü, 2. raf', 'AVAILABLE', 3, NULL),
(42, 'TOFAS-KTP-00042', '3. kat, C bölümü, 2. raf', 'AVAILABLE', 3, NULL),
(43, 'TOFAS-KTP-00043', '3. kat, C bölümü, 3. raf', 'AVAILABLE', 3, NULL),
(44, 'TOFAS-KTP-00044', '3. kat, C bölümü, 3. raf', 'AVAILABLE', 3, NULL),
(45, 'TOFAS-KTP-00045', '3. kat, C bölümü, 3. raf', 'AVAILABLE', 3, NULL),
(46, 'TOFAS-KTP-00046', '3. kat, C bölümü, 3. raf', 'AVAILABLE', 3, NULL),
(47, 'TOFAS-KTP-00047', '3. kat, C bölümü, 3. raf', 'AVAILABLE', 3, NULL),
(48, 'TOFAS-KTP-00048', '1. kat, D bölümü, 1. raf', 'LOANED', 4, NULL),
(49, 'TOFAS-KTP-00049', '1. kat, D bölümü, 1. raf', 'LOANED', 4, NULL),
(50, 'TOFAS-KTP-00050', '1. kat, D bölümü, 1. raf', 'LOANED', 4, NULL),
(51, 'TOFAS-KTP-00051', '1. kat, D bölümü, 1. raf', 'AVAILABLE', 4, NULL),
(52, 'TOFAS-KTP-00052', '1. kat, D bölümü, 1. raf', 'AVAILABLE', 4, NULL),
(53, 'TOFAS-KTP-00053', '1. kat, D bölümü, 2. raf', 'AVAILABLE', 4, NULL),
(54, 'TOFAS-KTP-00054', '1. kat, D bölümü, 2. raf', 'AVAILABLE', 4, NULL),
(55, 'TOFAS-KTP-00055', '1. kat, D bölümü, 2. raf', 'AVAILABLE', 4, NULL),
(56, 'TOFAS-KTP-00056', '1. kat, D bölümü, 2. raf', 'AVAILABLE', 4, NULL),
(57, 'TOFAS-KTP-00057', '1. kat, D bölümü, 2. raf', 'AVAILABLE', 4, NULL),
(58, 'TOFAS-KTP-00058', '1. kat, D bölümü, 3. raf', 'AVAILABLE', 4, NULL),
(59, 'TOFAS-KTP-00059', '1. kat, D bölümü, 3. raf', 'AVAILABLE', 4, NULL),
(60, 'TOFAS-KTP-00060', '1. kat, D bölümü, 3. raf', 'AVAILABLE', 4, NULL),
(61, 'TOFAS-KTP-00061', '1. kat, D bölümü, 3. raf', 'AVAILABLE', 4, NULL),
(62, 'TOFAS-KTP-00062', '1. kat, D bölümü, 3. raf', 'AVAILABLE', 4, NULL),
(63, 'TOFAS-KTP-00063', '2. kat, E bölümü, 1. raf', 'AVAILABLE', 6, NULL),
(64, 'TOFAS-KTP-00064', '2. kat, E bölümü, 1. raf', 'LOANED', 6, NULL),
(65, 'TOFAS-KTP-00065', '2. kat, E bölümü, 1. raf', 'LOANED', 6, NULL),
(66, 'TOFAS-KTP-00066', '2. kat, E bölümü, 1. raf', 'AVAILABLE', 6, NULL),
(67, 'TOFAS-KTP-00067', '2. kat, E bölümü, 1. raf', 'AVAILABLE', 6, NULL),
(68, 'TOFAS-KTP-00068', '2. kat, E bölümü, 2. raf', 'AVAILABLE', 6, NULL),
(69, 'TOFAS-KTP-00069', '2. kat, E bölümü, 2. raf', 'AVAILABLE', 6, NULL),
(70, 'TOFAS-KTP-00070', '2. kat, E bölümü, 2. raf', 'AVAILABLE', 6, NULL),
(71, 'TOFAS-KTP-00071', '2. kat, E bölümü, 2. raf', 'AVAILABLE', 6, NULL),
(72, 'TOFAS-KTP-00072', '2. kat, E bölümü, 2. raf', 'AVAILABLE', 6, NULL),
(73, 'TOFAS-KTP-00073', '2. kat, E bölümü, 3. raf', 'AVAILABLE', 6, NULL),
(74, 'TOFAS-KTP-00074', '2. kat, E bölümü, 3. raf', 'AVAILABLE', 6, NULL),
(75, 'TOFAS-KTP-00075', '2. kat, E bölümü, 3. raf', 'AVAILABLE', 6, NULL),
(76, 'TOFAS-KTP-00076', '2. kat, E bölümü, 3. raf', 'AVAILABLE', 6, NULL),
(77, 'TOFAS-KTP-00077', '2. kat, E bölümü, 3. raf', 'AVAILABLE', 6, NULL),
(78, 'TOFAS-KTP-00078', '3. kat, F bölümü, 1. raf', 'AVAILABLE', 7, NULL),
(79, 'TOFAS-KTP-00079', '3. kat, F bölümü, 1. raf', 'LOANED', 7, NULL),
(80, 'TOFAS-KTP-00080', '3. kat, F bölümü, 1. raf', 'AVAILABLE', 7, NULL),
(81, 'TOFAS-KTP-00081', '3. kat, F bölümü, 1. raf', 'AVAILABLE', 7, NULL),
(82, 'TOFAS-KTP-00082', '3. kat, F bölümü, 1. raf', 'AVAILABLE', 7, NULL),
(83, 'TOFAS-KTP-00083', '3. kat, F bölümü, 2. raf', 'AVAILABLE', 7, NULL),
(84, 'TOFAS-KTP-00084', '3. kat, F bölümü, 2. raf', 'AVAILABLE', 7, NULL),
(85, 'TOFAS-KTP-00085', '3. kat, F bölümü, 2. raf', 'AVAILABLE', 7, NULL),
(86, 'TOFAS-KTP-00086', '3. kat, F bölümü, 2. raf', 'AVAILABLE', 7, NULL),
(87, 'TOFAS-KTP-00087', '3. kat, F bölümü, 2. raf', 'AVAILABLE', 7, NULL),
(88, 'TOFAS-KTP-00088', '3. kat, F bölümü, 3. raf', 'AVAILABLE', 7, NULL),
(89, 'TOFAS-KTP-00089', '3. kat, F bölümü, 3. raf', 'AVAILABLE', 7, NULL),
(90, 'TOFAS-KTP-00090', '3. kat, F bölümü, 3. raf', 'AVAILABLE', 7, NULL),
(91, 'TOFAS-KTP-00091', '3. kat, F bölümü, 3. raf', 'AVAILABLE', 7, NULL),
(92, 'TOFAS-KTP-00092', '3. kat, F bölümü, 3. raf', 'AVAILABLE', 7, NULL),
(93, 'TOFAS-KTP-00093', '1. kat, G bölümü, 1. raf', 'AVAILABLE', 8, NULL),
(94, 'TOFAS-KTP-00094', '1. kat, G bölümü, 1. raf', 'LOANED', 8, NULL),
(95, 'TOFAS-KTP-00095', '1. kat, G bölümü, 1. raf', 'AVAILABLE', 8, NULL),
(96, 'TOFAS-KTP-00096', '1. kat, G bölümü, 1. raf', 'AVAILABLE', 8, NULL),
(97, 'TOFAS-KTP-00097', '1. kat, G bölümü, 1. raf', 'AVAILABLE', 8, NULL),
(98, 'TOFAS-KTP-00098', '1. kat, G bölümü, 2. raf', 'AVAILABLE', 8, NULL),
(99, 'TOFAS-KTP-00099', '1. kat, G bölümü, 2. raf', 'AVAILABLE', 8, NULL),
(100, 'TOFAS-KTP-00100', '1. kat, G bölümü, 2. raf', 'AVAILABLE', 8, NULL),
(101, 'TOFAS-KTP-00101', '1. kat, G bölümü, 2. raf', 'AVAILABLE', 8, NULL),
(102, 'TOFAS-KTP-00102', '1. kat, G bölümü, 2. raf', 'AVAILABLE', 8, NULL),
(103, 'TOFAS-KTP-00103', '1. kat, G bölümü, 3. raf', 'AVAILABLE', 8, NULL),
(104, 'TOFAS-KTP-00104', '1. kat, G bölümü, 3. raf', 'AVAILABLE', 8, NULL),
(105, 'TOFAS-KTP-00105', '1. kat, G bölümü, 3. raf', 'AVAILABLE', 8, NULL),
(106, 'TOFAS-KTP-00106', '1. kat, G bölümü, 3. raf', 'AVAILABLE', 8, NULL),
(107, 'TOFAS-KTP-00107', '1. kat, G bölümü, 3. raf', 'AVAILABLE', 8, NULL),
(108, 'TOFAS-KTP-00108', '2. kat, H bölümü, 1. raf', 'AVAILABLE', 9, NULL),
(109, 'TOFAS-KTP-00109', '2. kat, H bölümü, 1. raf', 'LOANED', 9, NULL),
(110, 'TOFAS-KTP-00110', '2. kat, H bölümü, 1. raf', 'AVAILABLE', 9, NULL),
(111, 'TOFAS-KTP-00111', '2. kat, H bölümü, 1. raf', 'AVAILABLE', 9, NULL),
(112, 'TOFAS-KTP-00112', '2. kat, H bölümü, 1. raf', 'AVAILABLE', 9, NULL),
(113, 'TOFAS-KTP-00113', '2. kat, H bölümü, 2. raf', 'AVAILABLE', 9, NULL),
(114, 'TOFAS-KTP-00114', '2. kat, H bölümü, 2. raf', 'AVAILABLE', 9, NULL),
(115, 'TOFAS-KTP-00115', '2. kat, H bölümü, 2. raf', 'AVAILABLE', 9, NULL),
(116, 'TOFAS-KTP-00116', '2. kat, H bölümü, 2. raf', 'AVAILABLE', 9, NULL),
(117, 'TOFAS-KTP-00117', '2. kat, H bölümü, 2. raf', 'AVAILABLE', 9, NULL),
(118, 'TOFAS-KTP-00118', '2. kat, H bölümü, 3. raf', 'AVAILABLE', 9, NULL),
(119, 'TOFAS-KTP-00119', '2. kat, H bölümü, 3. raf', 'AVAILABLE', 9, NULL),
(120, 'TOFAS-KTP-00120', '2. kat, H bölümü, 3. raf', 'AVAILABLE', 9, NULL),
(121, 'TOFAS-KTP-00121', '2. kat, H bölümü, 3. raf', 'AVAILABLE', 9, NULL),
(122, 'TOFAS-KTP-00122', '2. kat, H bölümü, 3. raf', 'AVAILABLE', 9, NULL),
(123, 'TOFAS-KTP-00123', '3. kat, A bölümü, 1. raf', 'AVAILABLE', 10, NULL),
(124, 'TOFAS-KTP-00124', '3. kat, A bölümü, 1. raf', 'LOANED', 10, NULL),
(125, 'TOFAS-KTP-00125', '3. kat, A bölümü, 1. raf', 'LOANED', 10, NULL),
(126, 'TOFAS-KTP-00126', '3. kat, A bölümü, 1. raf', 'AVAILABLE', 10, NULL),
(127, 'TOFAS-KTP-00127', '3. kat, A bölümü, 1. raf', 'AVAILABLE', 10, NULL),
(128, 'TOFAS-KTP-00128', '3. kat, A bölümü, 2. raf', 'AVAILABLE', 10, NULL),
(129, 'TOFAS-KTP-00129', '3. kat, A bölümü, 2. raf', 'AVAILABLE', 10, NULL),
(130, 'TOFAS-KTP-00130', '3. kat, A bölümü, 2. raf', 'AVAILABLE', 10, NULL),
(131, 'TOFAS-KTP-00131', '3. kat, A bölümü, 2. raf', 'AVAILABLE', 10, NULL),
(132, 'TOFAS-KTP-00132', '3. kat, A bölümü, 2. raf', 'AVAILABLE', 10, NULL),
(133, 'TOFAS-KTP-00133', '3. kat, A bölümü, 3. raf', 'AVAILABLE', 10, NULL),
(134, 'TOFAS-KTP-00134', '3. kat, A bölümü, 3. raf', 'AVAILABLE', 10, NULL),
(135, 'TOFAS-KTP-00135', '3. kat, A bölümü, 3. raf', 'AVAILABLE', 10, NULL),
(136, 'TOFAS-KTP-00136', '3. kat, A bölümü, 3. raf', 'AVAILABLE', 10, NULL),
(137, 'TOFAS-KTP-00137', '3. kat, A bölümü, 3. raf', 'AVAILABLE', 10, NULL),
(138, 'TOFAS-KTP-00138', '1. kat, B bölümü, 1. raf', 'AVAILABLE', 11, NULL),
(139, 'TOFAS-KTP-00139', '1. kat, B bölümü, 1. raf', 'AVAILABLE', 11, NULL),
(140, 'TOFAS-KTP-00140', '1. kat, B bölümü, 1. raf', 'AVAILABLE', 11, NULL),
(141, 'TOFAS-KTP-00141', '1. kat, B bölümü, 1. raf', 'AVAILABLE', 11, NULL),
(142, 'TOFAS-KTP-00142', '1. kat, B bölümü, 1. raf', 'AVAILABLE', 11, NULL),
(143, 'TOFAS-KTP-00143', '1. kat, B bölümü, 2. raf', 'AVAILABLE', 11, NULL),
(144, 'TOFAS-KTP-00144', '1. kat, B bölümü, 2. raf', 'AVAILABLE', 11, NULL),
(145, 'TOFAS-KTP-00145', '1. kat, B bölümü, 2. raf', 'AVAILABLE', 11, NULL),
(146, 'TOFAS-KTP-00146', '1. kat, B bölümü, 2. raf', 'AVAILABLE', 11, NULL),
(147, 'TOFAS-KTP-00147', '1. kat, B bölümü, 2. raf', 'AVAILABLE', 11, NULL),
(148, 'TOFAS-KTP-00148', '1. kat, B bölümü, 3. raf', 'AVAILABLE', 11, NULL),
(149, 'TOFAS-KTP-00149', '1. kat, B bölümü, 3. raf', 'AVAILABLE', 11, NULL),
(150, 'TOFAS-KTP-00150', '1. kat, B bölümü, 3. raf', 'AVAILABLE', 11, NULL),
(151, 'TOFAS-KTP-00151', '1. kat, B bölümü, 3. raf', 'AVAILABLE', 11, NULL),
(152, 'TOFAS-KTP-00152', '1. kat, B bölümü, 3. raf', 'AVAILABLE', 11, NULL),
(153, 'TOFAS-KTP-00153', '2. kat, C bölümü, 1. raf', 'LOANED', 12, NULL),
(154, 'TOFAS-KTP-00154', '2. kat, C bölümü, 1. raf', 'LOANED', 12, NULL),
(155, 'TOFAS-KTP-00155', '2. kat, C bölümü, 1. raf', 'LOANED', 12, NULL),
(156, 'TOFAS-KTP-00156', '2. kat, C bölümü, 1. raf', 'AVAILABLE', 12, NULL),
(157, 'TOFAS-KTP-00157', '2. kat, C bölümü, 1. raf', 'AVAILABLE', 12, NULL),
(158, 'TOFAS-KTP-00158', '2. kat, C bölümü, 2. raf', 'AVAILABLE', 12, NULL),
(159, 'TOFAS-KTP-00159', '2. kat, C bölümü, 2. raf', 'AVAILABLE', 12, NULL),
(160, 'TOFAS-KTP-00160', '2. kat, C bölümü, 2. raf', 'AVAILABLE', 12, NULL),
(161, 'TOFAS-KTP-00161', '2. kat, C bölümü, 2. raf', 'AVAILABLE', 12, NULL),
(162, 'TOFAS-KTP-00162', '2. kat, C bölümü, 2. raf', 'AVAILABLE', 12, NULL),
(163, 'TOFAS-KTP-00163', '2. kat, C bölümü, 3. raf', 'AVAILABLE', 12, NULL),
(164, 'TOFAS-KTP-00164', '2. kat, C bölümü, 3. raf', 'AVAILABLE', 12, NULL),
(165, 'TOFAS-KTP-00165', '2. kat, C bölümü, 3. raf', 'AVAILABLE', 12, NULL),
(166, 'TOFAS-KTP-00166', '2. kat, C bölümü, 3. raf', 'AVAILABLE', 12, NULL),
(167, 'TOFAS-KTP-00167', '2. kat, C bölümü, 3. raf', 'AVAILABLE', 12, NULL),
(168, 'TOFAS-KTP-00168', '3. kat, D bölümü, 1. raf', 'LOANED', 13, NULL),
(169, 'TOFAS-KTP-00169', '3. kat, D bölümü, 1. raf', 'AVAILABLE', 13, NULL),
(170, 'TOFAS-KTP-00170', '3. kat, D bölümü, 1. raf', 'LOANED', 13, NULL),
(171, 'TOFAS-KTP-00171', '3. kat, D bölümü, 1. raf', 'AVAILABLE', 13, NULL),
(172, 'TOFAS-KTP-00172', '3. kat, D bölümü, 1. raf', 'AVAILABLE', 13, NULL),
(173, 'TOFAS-KTP-00173', '3. kat, D bölümü, 2. raf', 'AVAILABLE', 13, NULL),
(174, 'TOFAS-KTP-00174', '3. kat, D bölümü, 2. raf', 'AVAILABLE', 13, NULL),
(175, 'TOFAS-KTP-00175', '3. kat, D bölümü, 2. raf', 'AVAILABLE', 13, NULL),
(176, 'TOFAS-KTP-00176', '3. kat, D bölümü, 2. raf', 'AVAILABLE', 13, NULL),
(177, 'TOFAS-KTP-00177', '3. kat, D bölümü, 2. raf', 'AVAILABLE', 13, NULL),
(178, 'TOFAS-KTP-00178', '3. kat, D bölümü, 3. raf', 'AVAILABLE', 13, NULL),
(179, 'TOFAS-KTP-00179', '3. kat, D bölümü, 3. raf', 'AVAILABLE', 13, NULL),
(180, 'TOFAS-KTP-00180', '3. kat, D bölümü, 3. raf', 'AVAILABLE', 13, NULL),
(181, 'TOFAS-KTP-00181', '3. kat, D bölümü, 3. raf', 'AVAILABLE', 13, NULL),
(182, 'TOFAS-KTP-00182', '3. kat, D bölümü, 3. raf', 'AVAILABLE', 13, NULL),
(183, 'TOFAS-KTP-00183', '1. kat, E bölümü, 1. raf', 'LOANED', 14, NULL),
(184, 'TOFAS-KTP-00184', '1. kat, E bölümü, 1. raf', 'AVAILABLE', 14, NULL),
(185, 'TOFAS-KTP-00185', '1. kat, E bölümü, 1. raf', 'LOANED', 14, NULL),
(186, 'TOFAS-KTP-00186', '1. kat, E bölümü, 1. raf', 'AVAILABLE', 14, NULL),
(187, 'TOFAS-KTP-00187', '1. kat, E bölümü, 1. raf', 'AVAILABLE', 14, NULL),
(188, 'TOFAS-KTP-00188', '1. kat, E bölümü, 2. raf', 'AVAILABLE', 14, NULL),
(189, 'TOFAS-KTP-00189', '1. kat, E bölümü, 2. raf', 'AVAILABLE', 14, NULL),
(190, 'TOFAS-KTP-00190', '1. kat, E bölümü, 2. raf', 'AVAILABLE', 14, NULL),
(191, 'TOFAS-KTP-00191', '1. kat, E bölümü, 2. raf', 'AVAILABLE', 14, NULL),
(192, 'TOFAS-KTP-00192', '1. kat, E bölümü, 2. raf', 'AVAILABLE', 14, NULL),
(193, 'TOFAS-KTP-00193', '1. kat, E bölümü, 3. raf', 'AVAILABLE', 14, NULL),
(194, 'TOFAS-KTP-00194', '1. kat, E bölümü, 3. raf', 'AVAILABLE', 14, NULL),
(195, 'TOFAS-KTP-00195', '1. kat, E bölümü, 3. raf', 'AVAILABLE', 14, NULL),
(196, 'TOFAS-KTP-00196', '1. kat, E bölümü, 3. raf', 'AVAILABLE', 14, NULL),
(197, 'TOFAS-KTP-00197', '1. kat, E bölümü, 3. raf', 'AVAILABLE', 14, NULL),
(198, 'TOFAS-KTP-00198', '2. kat, F bölümü, 1. raf', 'LOANED', 15, NULL),
(199, 'TOFAS-KTP-00199', '2. kat, F bölümü, 1. raf', 'AVAILABLE', 15, NULL),
(200, 'TOFAS-KTP-00200', '2. kat, F bölümü, 1. raf', 'LOANED', 15, NULL),
(201, 'TOFAS-KTP-00201', '2. kat, F bölümü, 1. raf', 'AVAILABLE', 15, NULL),
(202, 'TOFAS-KTP-00202', '2. kat, F bölümü, 1. raf', 'AVAILABLE', 15, NULL),
(203, 'TOFAS-KTP-00203', '2. kat, F bölümü, 2. raf', 'AVAILABLE', 15, NULL),
(204, 'TOFAS-KTP-00204', '2. kat, F bölümü, 2. raf', 'AVAILABLE', 15, NULL),
(205, 'TOFAS-KTP-00205', '2. kat, F bölümü, 2. raf', 'AVAILABLE', 15, NULL),
(206, 'TOFAS-KTP-00206', '2. kat, F bölümü, 2. raf', 'AVAILABLE', 15, NULL),
(207, 'TOFAS-KTP-00207', '2. kat, F bölümü, 2. raf', 'AVAILABLE', 15, NULL),
(208, 'TOFAS-KTP-00208', '2. kat, F bölümü, 3. raf', 'AVAILABLE', 15, NULL),
(209, 'TOFAS-KTP-00209', '2. kat, F bölümü, 3. raf', 'AVAILABLE', 15, NULL),
(210, 'TOFAS-KTP-00210', '2. kat, F bölümü, 3. raf', 'AVAILABLE', 15, NULL),
(211, 'TOFAS-KTP-00211', '2. kat, F bölümü, 3. raf', 'AVAILABLE', 15, NULL),
(212, 'TOFAS-KTP-00212', '2. kat, F bölümü, 3. raf', 'AVAILABLE', 15, NULL),
(213, 'TOFAS-KTP-00213', '3. kat, G bölümü, 1. raf', 'AVAILABLE', 16, NULL),
(214, 'TOFAS-KTP-00214', '3. kat, G bölümü, 1. raf', 'AVAILABLE', 16, NULL),
(215, 'TOFAS-KTP-00215', '3. kat, G bölümü, 1. raf', 'LOANED', 16, NULL),
(216, 'TOFAS-KTP-00216', '3. kat, G bölümü, 1. raf', 'AVAILABLE', 16, NULL),
(217, 'TOFAS-KTP-00217', '3. kat, G bölümü, 1. raf', 'AVAILABLE', 16, NULL),
(218, 'TOFAS-KTP-00218', '3. kat, G bölümü, 2. raf', 'AVAILABLE', 16, NULL),
(219, 'TOFAS-KTP-00219', '3. kat, G bölümü, 2. raf', 'AVAILABLE', 16, NULL),
(220, 'TOFAS-KTP-00220', '3. kat, G bölümü, 2. raf', 'AVAILABLE', 16, NULL),
(221, 'TOFAS-KTP-00221', '3. kat, G bölümü, 2. raf', 'AVAILABLE', 16, NULL),
(222, 'TOFAS-KTP-00222', '3. kat, G bölümü, 2. raf', 'AVAILABLE', 16, NULL),
(223, 'TOFAS-KTP-00223', '3. kat, G bölümü, 3. raf', 'AVAILABLE', 16, NULL),
(224, 'TOFAS-KTP-00224', '3. kat, G bölümü, 3. raf', 'AVAILABLE', 16, NULL),
(225, 'TOFAS-KTP-00225', '3. kat, G bölümü, 3. raf', 'AVAILABLE', 16, NULL),
(226, 'TOFAS-KTP-00226', '3. kat, G bölümü, 3. raf', 'AVAILABLE', 16, NULL),
(227, 'TOFAS-KTP-00227', '3. kat, G bölümü, 3. raf', 'AVAILABLE', 16, NULL),
(228, 'TOFAS-KTP-00228', '1. kat, H bölümü, 1. raf', 'AVAILABLE', 17, NULL),
(229, 'TOFAS-KTP-00229', '1. kat, H bölümü, 1. raf', 'LOANED', 17, NULL),
(230, 'TOFAS-KTP-00230', '1. kat, H bölümü, 1. raf', 'LOANED', 17, NULL),
(231, 'TOFAS-KTP-00231', '1. kat, H bölümü, 1. raf', 'AVAILABLE', 17, NULL),
(232, 'TOFAS-KTP-00232', '1. kat, H bölümü, 1. raf', 'AVAILABLE', 17, NULL),
(233, 'TOFAS-KTP-00233', '1. kat, H bölümü, 2. raf', 'AVAILABLE', 17, NULL),
(234, 'TOFAS-KTP-00234', '1. kat, H bölümü, 2. raf', 'AVAILABLE', 17, NULL),
(235, 'TOFAS-KTP-00235', '1. kat, H bölümü, 2. raf', 'AVAILABLE', 17, NULL),
(236, 'TOFAS-KTP-00236', '1. kat, H bölümü, 2. raf', 'AVAILABLE', 17, NULL),
(237, 'TOFAS-KTP-00237', '1. kat, H bölümü, 2. raf', 'AVAILABLE', 17, NULL),
(238, 'TOFAS-KTP-00238', '1. kat, H bölümü, 3. raf', 'AVAILABLE', 17, NULL),
(239, 'TOFAS-KTP-00239', '1. kat, H bölümü, 3. raf', 'AVAILABLE', 17, NULL),
(240, 'TOFAS-KTP-00240', '1. kat, H bölümü, 3. raf', 'AVAILABLE', 17, NULL),
(241, 'TOFAS-KTP-00241', '1. kat, H bölümü, 3. raf', 'AVAILABLE', 17, NULL),
(242, 'TOFAS-KTP-00242', '1. kat, H bölümü, 3. raf', 'AVAILABLE', 17, NULL),
(243, 'TOFAS-KTP-00243', '2. kat, A bölümü, 1. raf', 'AVAILABLE', 18, NULL),
(244, 'TOFAS-KTP-00244', '2. kat, A bölümü, 1. raf', 'LOANED', 18, NULL),
(245, 'TOFAS-KTP-00245', '2. kat, A bölümü, 1. raf', 'LOANED', 18, NULL),
(246, 'TOFAS-KTP-00246', '2. kat, A bölümü, 1. raf', 'AVAILABLE', 18, NULL),
(247, 'TOFAS-KTP-00247', '2. kat, A bölümü, 1. raf', 'AVAILABLE', 18, NULL),
(248, 'TOFAS-KTP-00248', '2. kat, A bölümü, 2. raf', 'AVAILABLE', 18, NULL),
(249, 'TOFAS-KTP-00249', '2. kat, A bölümü, 2. raf', 'AVAILABLE', 18, NULL),
(250, 'TOFAS-KTP-00250', '2. kat, A bölümü, 2. raf', 'AVAILABLE', 18, NULL),
(251, 'TOFAS-KTP-00251', '2. kat, A bölümü, 2. raf', 'AVAILABLE', 18, NULL),
(252, 'TOFAS-KTP-00252', '2. kat, A bölümü, 2. raf', 'AVAILABLE', 18, NULL),
(253, 'TOFAS-KTP-00253', '2. kat, A bölümü, 3. raf', 'AVAILABLE', 18, NULL),
(254, 'TOFAS-KTP-00254', '2. kat, A bölümü, 3. raf', 'AVAILABLE', 18, NULL),
(255, 'TOFAS-KTP-00255', '2. kat, A bölümü, 3. raf', 'AVAILABLE', 18, NULL),
(256, 'TOFAS-KTP-00256', '2. kat, A bölümü, 3. raf', 'AVAILABLE', 18, NULL),
(257, 'TOFAS-KTP-00257', '2. kat, A bölümü, 3. raf', 'AVAILABLE', 18, NULL),
(258, 'TOFAS-KTP-00258', '3. kat, B bölümü, 1. raf', 'AVAILABLE', 19, NULL),
(259, 'TOFAS-KTP-00259', '3. kat, B bölümü, 1. raf', 'AVAILABLE', 19, NULL),
(260, 'TOFAS-KTP-00260', '3. kat, B bölümü, 1. raf', 'LOANED', 19, NULL),
(261, 'TOFAS-KTP-00261', '3. kat, B bölümü, 1. raf', 'AVAILABLE', 19, NULL),
(262, 'TOFAS-KTP-00262', '3. kat, B bölümü, 1. raf', 'AVAILABLE', 19, NULL),
(263, 'TOFAS-KTP-00263', '3. kat, B bölümü, 2. raf', 'AVAILABLE', 19, NULL),
(264, 'TOFAS-KTP-00264', '3. kat, B bölümü, 2. raf', 'AVAILABLE', 19, NULL),
(265, 'TOFAS-KTP-00265', '3. kat, B bölümü, 2. raf', 'AVAILABLE', 19, NULL),
(266, 'TOFAS-KTP-00266', '3. kat, B bölümü, 2. raf', 'AVAILABLE', 19, NULL),
(267, 'TOFAS-KTP-00267', '3. kat, B bölümü, 2. raf', 'AVAILABLE', 19, NULL),
(268, 'TOFAS-KTP-00268', '3. kat, B bölümü, 3. raf', 'AVAILABLE', 19, NULL),
(269, 'TOFAS-KTP-00269', '3. kat, B bölümü, 3. raf', 'AVAILABLE', 19, NULL),
(270, 'TOFAS-KTP-00270', '3. kat, B bölümü, 3. raf', 'AVAILABLE', 19, NULL),
(271, 'TOFAS-KTP-00271', '3. kat, B bölümü, 3. raf', 'AVAILABLE', 19, NULL),
(272, 'TOFAS-KTP-00272', '3. kat, B bölümü, 3. raf', 'AVAILABLE', 19, NULL),
(273, 'TOFAS-KTP-00273', '1. kat, C bölümü, 1. raf', 'LOANED', 20, NULL),
(274, 'TOFAS-KTP-00274', '1. kat, C bölümü, 1. raf', 'LOANED', 20, NULL),
(275, 'TOFAS-KTP-00275', '1. kat, C bölümü, 1. raf', 'LOANED', 20, NULL),
(276, 'TOFAS-KTP-00276', '1. kat, C bölümü, 1. raf', 'AVAILABLE', 20, NULL),
(277, 'TOFAS-KTP-00277', '1. kat, C bölümü, 1. raf', 'AVAILABLE', 20, NULL),
(278, 'TOFAS-KTP-00278', '1. kat, C bölümü, 2. raf', 'AVAILABLE', 20, NULL),
(279, 'TOFAS-KTP-00279', '1. kat, C bölümü, 2. raf', 'AVAILABLE', 20, NULL),
(280, 'TOFAS-KTP-00280', '1. kat, C bölümü, 2. raf', 'AVAILABLE', 20, NULL),
(281, 'TOFAS-KTP-00281', '1. kat, C bölümü, 2. raf', 'AVAILABLE', 20, NULL),
(282, 'TOFAS-KTP-00282', '1. kat, C bölümü, 2. raf', 'AVAILABLE', 20, NULL),
(283, 'TOFAS-KTP-00283', '1. kat, C bölümü, 3. raf', 'AVAILABLE', 20, NULL),
(284, 'TOFAS-KTP-00284', '1. kat, C bölümü, 3. raf', 'AVAILABLE', 20, NULL),
(285, 'TOFAS-KTP-00285', '1. kat, C bölümü, 3. raf', 'AVAILABLE', 20, NULL),
(286, 'TOFAS-KTP-00286', '1. kat, C bölümü, 3. raf', 'AVAILABLE', 20, NULL),
(287, 'TOFAS-KTP-00287', '1. kat, C bölümü, 3. raf', 'AVAILABLE', 20, NULL),
(288, 'TOFAS-KTP-00288', '2. kat, D bölümü, 1. raf', 'AVAILABLE', 21, NULL),
(289, 'TOFAS-KTP-00289', '2. kat, D bölümü, 1. raf', 'AVAILABLE', 21, NULL),
(290, 'TOFAS-KTP-00290', '2. kat, D bölümü, 1. raf', 'LOANED', 21, NULL),
(291, 'TOFAS-KTP-00291', '2. kat, D bölümü, 1. raf', 'AVAILABLE', 21, NULL),
(292, 'TOFAS-KTP-00292', '2. kat, D bölümü, 1. raf', 'AVAILABLE', 21, NULL),
(293, 'TOFAS-KTP-00293', '2. kat, D bölümü, 2. raf', 'AVAILABLE', 21, NULL),
(294, 'TOFAS-KTP-00294', '2. kat, D bölümü, 2. raf', 'AVAILABLE', 21, NULL),
(295, 'TOFAS-KTP-00295', '2. kat, D bölümü, 2. raf', 'AVAILABLE', 21, NULL),
(296, 'TOFAS-KTP-00296', '2. kat, D bölümü, 2. raf', 'AVAILABLE', 21, NULL),
(297, 'TOFAS-KTP-00297', '2. kat, D bölümü, 2. raf', 'AVAILABLE', 21, NULL),
(298, 'TOFAS-KTP-00298', '2. kat, D bölümü, 3. raf', 'AVAILABLE', 21, NULL),
(299, 'TOFAS-KTP-00299', '2. kat, D bölümü, 3. raf', 'AVAILABLE', 21, NULL),
(300, 'TOFAS-KTP-00300', '2. kat, D bölümü, 3. raf', 'AVAILABLE', 21, NULL),
(301, 'TOFAS-KTP-00301', '2. kat, D bölümü, 3. raf', 'AVAILABLE', 21, NULL),
(302, 'TOFAS-KTP-00302', '2. kat, D bölümü, 3. raf', 'AVAILABLE', 21, NULL),
(303, 'TOFAS-KTP-00303', '3. kat, E bölümü, 1. raf', 'LOANED', 22, NULL),
(304, 'TOFAS-KTP-00304', '3. kat, E bölümü, 1. raf', 'LOANED', 22, NULL),
(305, 'TOFAS-KTP-00305', '3. kat, E bölümü, 1. raf', 'LOANED', 22, NULL),
(306, 'TOFAS-KTP-00306', '3. kat, E bölümü, 1. raf', 'AVAILABLE', 22, NULL),
(307, 'TOFAS-KTP-00307', '3. kat, E bölümü, 1. raf', 'AVAILABLE', 22, NULL),
(308, 'TOFAS-KTP-00308', '3. kat, E bölümü, 2. raf', 'AVAILABLE', 22, NULL),
(309, 'TOFAS-KTP-00309', '3. kat, E bölümü, 2. raf', 'AVAILABLE', 22, NULL),
(310, 'TOFAS-KTP-00310', '3. kat, E bölümü, 2. raf', 'AVAILABLE', 22, NULL),
(311, 'TOFAS-KTP-00311', '3. kat, E bölümü, 2. raf', 'AVAILABLE', 22, NULL),
(312, 'TOFAS-KTP-00312', '3. kat, E bölümü, 2. raf', 'AVAILABLE', 22, NULL),
(313, 'TOFAS-KTP-00313', '3. kat, E bölümü, 3. raf', 'AVAILABLE', 22, NULL),
(314, 'TOFAS-KTP-00314', '3. kat, E bölümü, 3. raf', 'AVAILABLE', 22, NULL),
(315, 'TOFAS-KTP-00315', '3. kat, E bölümü, 3. raf', 'AVAILABLE', 22, NULL),
(316, 'TOFAS-KTP-00316', '3. kat, E bölümü, 3. raf', 'AVAILABLE', 22, NULL),
(317, 'TOFAS-KTP-00317', '3. kat, E bölümü, 3. raf', 'AVAILABLE', 22, NULL),
(318, 'TOFAS-KTP-00318', '1. kat, F bölümü, 1. raf', 'AVAILABLE', 23, NULL),
(319, 'TOFAS-KTP-00319', '1. kat, F bölümü, 1. raf', 'AVAILABLE', 23, NULL),
(320, 'TOFAS-KTP-00320', '1. kat, F bölümü, 1. raf', 'LOANED', 23, NULL),
(321, 'TOFAS-KTP-00321', '1. kat, F bölümü, 1. raf', 'AVAILABLE', 23, NULL),
(322, 'TOFAS-KTP-00322', '1. kat, F bölümü, 1. raf', 'AVAILABLE', 23, NULL),
(323, 'TOFAS-KTP-00323', '1. kat, F bölümü, 2. raf', 'AVAILABLE', 23, NULL),
(324, 'TOFAS-KTP-00324', '1. kat, F bölümü, 2. raf', 'AVAILABLE', 23, NULL),
(325, 'TOFAS-KTP-00325', '1. kat, F bölümü, 2. raf', 'AVAILABLE', 23, NULL),
(326, 'TOFAS-KTP-00326', '1. kat, F bölümü, 2. raf', 'AVAILABLE', 23, NULL),
(327, 'TOFAS-KTP-00327', '1. kat, F bölümü, 2. raf', 'AVAILABLE', 23, NULL),
(328, 'TOFAS-KTP-00328', '1. kat, F bölümü, 3. raf', 'AVAILABLE', 23, NULL),
(329, 'TOFAS-KTP-00329', '1. kat, F bölümü, 3. raf', 'AVAILABLE', 23, NULL),
(330, 'TOFAS-KTP-00330', '1. kat, F bölümü, 3. raf', 'AVAILABLE', 23, NULL),
(331, 'TOFAS-KTP-00331', '1. kat, F bölümü, 3. raf', 'AVAILABLE', 23, NULL),
(332, 'TOFAS-KTP-00332', '1. kat, F bölümü, 3. raf', 'AVAILABLE', 23, NULL),
(333, 'TOFAS-KTP-00333', '2. kat, G bölümü, 1. raf', 'AVAILABLE', 24, NULL),
(334, 'TOFAS-KTP-00334', '2. kat, G bölümü, 1. raf', 'LOANED', 24, NULL),
(335, 'TOFAS-KTP-00335', '2. kat, G bölümü, 1. raf', 'LOANED', 24, NULL),
(336, 'TOFAS-KTP-00336', '2. kat, G bölümü, 1. raf', 'AVAILABLE', 24, NULL),
(337, 'TOFAS-KTP-00337', '2. kat, G bölümü, 1. raf', 'AVAILABLE', 24, NULL),
(338, 'TOFAS-KTP-00338', '2. kat, G bölümü, 2. raf', 'AVAILABLE', 24, NULL),
(339, 'TOFAS-KTP-00339', '2. kat, G bölümü, 2. raf', 'AVAILABLE', 24, NULL),
(340, 'TOFAS-KTP-00340', '2. kat, G bölümü, 2. raf', 'AVAILABLE', 24, NULL),
(341, 'TOFAS-KTP-00341', '2. kat, G bölümü, 2. raf', 'AVAILABLE', 24, NULL),
(342, 'TOFAS-KTP-00342', '2. kat, G bölümü, 2. raf', 'AVAILABLE', 24, NULL),
(343, 'TOFAS-KTP-00343', '2. kat, G bölümü, 3. raf', 'AVAILABLE', 24, NULL),
(344, 'TOFAS-KTP-00344', '2. kat, G bölümü, 3. raf', 'AVAILABLE', 24, NULL),
(345, 'TOFAS-KTP-00345', '2. kat, G bölümü, 3. raf', 'AVAILABLE', 24, NULL),
(346, 'TOFAS-KTP-00346', '2. kat, G bölümü, 3. raf', 'AVAILABLE', 24, NULL),
(347, 'TOFAS-KTP-00347', '2. kat, G bölümü, 3. raf', 'AVAILABLE', 24, NULL),
(348, 'TOFAS-KTP-00348', '3. kat, H bölümü, 1. raf', 'AVAILABLE', 25, NULL),
(349, 'TOFAS-KTP-00349', '3. kat, H bölümü, 1. raf', 'LOANED', 25, NULL),
(350, 'TOFAS-KTP-00350', '3. kat, H bölümü, 1. raf', 'LOANED', 25, NULL),
(351, 'TOFAS-KTP-00351', '3. kat, H bölümü, 1. raf', 'AVAILABLE', 25, NULL),
(352, 'TOFAS-KTP-00352', '3. kat, H bölümü, 1. raf', 'AVAILABLE', 25, NULL),
(353, 'TOFAS-KTP-00353', '3. kat, H bölümü, 2. raf', 'AVAILABLE', 25, NULL),
(354, 'TOFAS-KTP-00354', '3. kat, H bölümü, 2. raf', 'AVAILABLE', 25, NULL),
(355, 'TOFAS-KTP-00355', '3. kat, H bölümü, 2. raf', 'AVAILABLE', 25, NULL),
(356, 'TOFAS-KTP-00356', '3. kat, H bölümü, 2. raf', 'AVAILABLE', 25, NULL),
(357, 'TOFAS-KTP-00357', '3. kat, H bölümü, 2. raf', 'AVAILABLE', 25, NULL),
(358, 'TOFAS-KTP-00358', '3. kat, H bölümü, 3. raf', 'AVAILABLE', 25, NULL),
(359, 'TOFAS-KTP-00359', '3. kat, H bölümü, 3. raf', 'AVAILABLE', 25, NULL),
(360, 'TOFAS-KTP-00360', '3. kat, H bölümü, 3. raf', 'AVAILABLE', 25, NULL),
(361, 'TOFAS-KTP-00361', '3. kat, H bölümü, 3. raf', 'AVAILABLE', 25, NULL),
(362, 'TOFAS-KTP-00362', '3. kat, H bölümü, 3. raf', 'AVAILABLE', 25, NULL),
(363, 'TOFAS-KTP-00363', '1. kat, A bölümü, 1. raf', 'AVAILABLE', 26, NULL),
(364, 'TOFAS-KTP-00364', '1. kat, A bölümü, 1. raf', 'LOANED', 26, NULL),
(365, 'TOFAS-KTP-00365', '1. kat, A bölümü, 1. raf', 'LOANED', 26, NULL),
(366, 'TOFAS-KTP-00366', '1. kat, A bölümü, 1. raf', 'AVAILABLE', 26, NULL),
(367, 'TOFAS-KTP-00367', '1. kat, A bölümü, 1. raf', 'AVAILABLE', 26, NULL),
(368, 'TOFAS-KTP-00368', '1. kat, A bölümü, 2. raf', 'AVAILABLE', 26, NULL),
(369, 'TOFAS-KTP-00369', '1. kat, A bölümü, 2. raf', 'AVAILABLE', 26, NULL),
(370, 'TOFAS-KTP-00370', '1. kat, A bölümü, 2. raf', 'AVAILABLE', 26, NULL),
(371, 'TOFAS-KTP-00371', '1. kat, A bölümü, 2. raf', 'AVAILABLE', 26, NULL),
(372, 'TOFAS-KTP-00372', '1. kat, A bölümü, 2. raf', 'AVAILABLE', 26, NULL),
(373, 'TOFAS-KTP-00373', '1. kat, A bölümü, 3. raf', 'AVAILABLE', 26, NULL),
(374, 'TOFAS-KTP-00374', '1. kat, A bölümü, 3. raf', 'AVAILABLE', 26, NULL),
(375, 'TOFAS-KTP-00375', '1. kat, A bölümü, 3. raf', 'AVAILABLE', 26, NULL),
(376, 'TOFAS-KTP-00376', '1. kat, A bölümü, 3. raf', 'AVAILABLE', 26, NULL),
(377, 'TOFAS-KTP-00377', '1. kat, A bölümü, 3. raf', 'AVAILABLE', 26, NULL),
(378, 'TOFAS-KTP-00378', '2. kat, B bölümü, 1. raf', 'LOANED', 27, NULL),
(379, 'TOFAS-KTP-00379', '2. kat, B bölümü, 1. raf', 'LOANED', 27, NULL),
(380, 'TOFAS-KTP-00380', '2. kat, B bölümü, 1. raf', 'LOANED', 27, NULL),
(381, 'TOFAS-KTP-00381', '2. kat, B bölümü, 1. raf', 'AVAILABLE', 27, NULL),
(382, 'TOFAS-KTP-00382', '2. kat, B bölümü, 1. raf', 'AVAILABLE', 27, NULL),
(383, 'TOFAS-KTP-00383', '2. kat, B bölümü, 2. raf', 'AVAILABLE', 27, NULL),
(384, 'TOFAS-KTP-00384', '2. kat, B bölümü, 2. raf', 'AVAILABLE', 27, NULL),
(385, 'TOFAS-KTP-00385', '2. kat, B bölümü, 2. raf', 'AVAILABLE', 27, NULL),
(386, 'TOFAS-KTP-00386', '2. kat, B bölümü, 2. raf', 'AVAILABLE', 27, NULL),
(387, 'TOFAS-KTP-00387', '2. kat, B bölümü, 2. raf', 'AVAILABLE', 27, NULL),
(388, 'TOFAS-KTP-00388', '2. kat, B bölümü, 3. raf', 'AVAILABLE', 27, NULL),
(389, 'TOFAS-KTP-00389', '2. kat, B bölümü, 3. raf', 'AVAILABLE', 27, NULL),
(390, 'TOFAS-KTP-00390', '2. kat, B bölümü, 3. raf', 'AVAILABLE', 27, NULL),
(391, 'TOFAS-KTP-00391', '2. kat, B bölümü, 3. raf', 'AVAILABLE', 27, NULL),
(392, 'TOFAS-KTP-00392', '2. kat, B bölümü, 3. raf', 'AVAILABLE', 27, NULL),
(393, 'TOFAS-KTP-00393', '3. kat, C bölümü, 1. raf', 'LOANED', 28, NULL),
(394, 'TOFAS-KTP-00394', '3. kat, C bölümü, 1. raf', 'LOANED', 28, NULL),
(395, 'TOFAS-KTP-00395', '3. kat, C bölümü, 1. raf', 'LOANED', 28, NULL),
(396, 'TOFAS-KTP-00396', '3. kat, C bölümü, 1. raf', 'AVAILABLE', 28, NULL),
(397, 'TOFAS-KTP-00397', '3. kat, C bölümü, 1. raf', 'AVAILABLE', 28, NULL),
(398, 'TOFAS-KTP-00398', '3. kat, C bölümü, 2. raf', 'AVAILABLE', 28, NULL),
(399, 'TOFAS-KTP-00399', '3. kat, C bölümü, 2. raf', 'AVAILABLE', 28, NULL),
(400, 'TOFAS-KTP-00400', '3. kat, C bölümü, 2. raf', 'AVAILABLE', 28, NULL),
(401, 'TOFAS-KTP-00401', '3. kat, C bölümü, 2. raf', 'AVAILABLE', 28, NULL),
(402, 'TOFAS-KTP-00402', '3. kat, C bölümü, 2. raf', 'AVAILABLE', 28, NULL),
(403, 'TOFAS-KTP-00403', '3. kat, C bölümü, 3. raf', 'AVAILABLE', 28, NULL),
(404, 'TOFAS-KTP-00404', '3. kat, C bölümü, 3. raf', 'AVAILABLE', 28, NULL),
(405, 'TOFAS-KTP-00405', '3. kat, C bölümü, 3. raf', 'AVAILABLE', 28, NULL),
(406, 'TOFAS-KTP-00406', '3. kat, C bölümü, 3. raf', 'AVAILABLE', 28, NULL),
(407, 'TOFAS-KTP-00407', '3. kat, C bölümü, 3. raf', 'AVAILABLE', 28, NULL),
(408, 'TOFAS-KTP-00408', '1. kat, D bölümü, 1. raf', 'AVAILABLE', 29, NULL),
(409, 'TOFAS-KTP-00409', '1. kat, D bölümü, 1. raf', 'LOANED', 29, NULL),
(410, 'TOFAS-KTP-00410', '1. kat, D bölümü, 1. raf', 'LOANED', 29, NULL),
(411, 'TOFAS-KTP-00411', '1. kat, D bölümü, 1. raf', 'AVAILABLE', 29, NULL),
(412, 'TOFAS-KTP-00412', '1. kat, D bölümü, 1. raf', 'AVAILABLE', 29, NULL),
(413, 'TOFAS-KTP-00413', '1. kat, D bölümü, 2. raf', 'AVAILABLE', 29, NULL),
(414, 'TOFAS-KTP-00414', '1. kat, D bölümü, 2. raf', 'AVAILABLE', 29, NULL),
(415, 'TOFAS-KTP-00415', '1. kat, D bölümü, 2. raf', 'AVAILABLE', 29, NULL),
(416, 'TOFAS-KTP-00416', '1. kat, D bölümü, 2. raf', 'AVAILABLE', 29, NULL),
(417, 'TOFAS-KTP-00417', '1. kat, D bölümü, 2. raf', 'AVAILABLE', 29, NULL),
(418, 'TOFAS-KTP-00418', '1. kat, D bölümü, 3. raf', 'AVAILABLE', 29, NULL),
(419, 'TOFAS-KTP-00419', '1. kat, D bölümü, 3. raf', 'AVAILABLE', 29, NULL),
(420, 'TOFAS-KTP-00420', '1. kat, D bölümü, 3. raf', 'AVAILABLE', 29, NULL),
(421, 'TOFAS-KTP-00421', '1. kat, D bölümü, 3. raf', 'AVAILABLE', 29, NULL),
(422, 'TOFAS-KTP-00422', '1. kat, D bölümü, 3. raf', 'AVAILABLE', 29, NULL),
(423, 'TOFAS-KTP-00423', '2. kat, E bölümü, 1. raf', 'AVAILABLE', 30, NULL),
(424, 'TOFAS-KTP-00424', '2. kat, E bölümü, 1. raf', 'LOANED', 30, NULL),
(425, 'TOFAS-KTP-00425', '2. kat, E bölümü, 1. raf', 'LOANED', 30, NULL),
(426, 'TOFAS-KTP-00426', '2. kat, E bölümü, 1. raf', 'AVAILABLE', 30, NULL),
(427, 'TOFAS-KTP-00427', '2. kat, E bölümü, 1. raf', 'AVAILABLE', 30, NULL),
(428, 'TOFAS-KTP-00428', '2. kat, E bölümü, 2. raf', 'AVAILABLE', 30, NULL),
(429, 'TOFAS-KTP-00429', '2. kat, E bölümü, 2. raf', 'AVAILABLE', 30, NULL),
(430, 'TOFAS-KTP-00430', '2. kat, E bölümü, 2. raf', 'AVAILABLE', 30, NULL),
(431, 'TOFAS-KTP-00431', '2. kat, E bölümü, 2. raf', 'AVAILABLE', 30, NULL),
(432, 'TOFAS-KTP-00432', '2. kat, E bölümü, 2. raf', 'AVAILABLE', 30, NULL),
(433, 'TOFAS-KTP-00433', '2. kat, E bölümü, 3. raf', 'AVAILABLE', 30, NULL),
(434, 'TOFAS-KTP-00434', '2. kat, E bölümü, 3. raf', 'AVAILABLE', 30, NULL),
(435, 'TOFAS-KTP-00435', '2. kat, E bölümü, 3. raf', 'AVAILABLE', 30, NULL),
(436, 'TOFAS-KTP-00436', '2. kat, E bölümü, 3. raf', 'AVAILABLE', 30, NULL),
(437, 'TOFAS-KTP-00437', '2. kat, E bölümü, 3. raf', 'AVAILABLE', 30, NULL),
(438, 'TOFAS-KTP-00438', '3. kat, F bölümü, 1. raf', 'AVAILABLE', 31, NULL),
(439, 'TOFAS-KTP-00439', '3. kat, F bölümü, 1. raf', 'LOANED', 31, NULL),
(440, 'TOFAS-KTP-00440', '3. kat, F bölümü, 1. raf', 'LOANED', 31, NULL),
(441, 'TOFAS-KTP-00441', '3. kat, F bölümü, 1. raf', 'AVAILABLE', 31, NULL),
(442, 'TOFAS-KTP-00442', '3. kat, F bölümü, 1. raf', 'AVAILABLE', 31, NULL),
(443, 'TOFAS-KTP-00443', '3. kat, F bölümü, 2. raf', 'AVAILABLE', 31, NULL),
(444, 'TOFAS-KTP-00444', '3. kat, F bölümü, 2. raf', 'AVAILABLE', 31, NULL),
(445, 'TOFAS-KTP-00445', '3. kat, F bölümü, 2. raf', 'AVAILABLE', 31, NULL),
(446, 'TOFAS-KTP-00446', '3. kat, F bölümü, 2. raf', 'AVAILABLE', 31, NULL),
(447, 'TOFAS-KTP-00447', '3. kat, F bölümü, 2. raf', 'AVAILABLE', 31, NULL),
(448, 'TOFAS-KTP-00448', '3. kat, F bölümü, 3. raf', 'AVAILABLE', 31, NULL),
(449, 'TOFAS-KTP-00449', '3. kat, F bölümü, 3. raf', 'AVAILABLE', 31, NULL),
(450, 'TOFAS-KTP-00450', '3. kat, F bölümü, 3. raf', 'AVAILABLE', 31, NULL),
(451, 'TOFAS-KTP-00451', '3. kat, F bölümü, 3. raf', 'AVAILABLE', 31, NULL),
(452, 'TOFAS-KTP-00452', '3. kat, F bölümü, 3. raf', 'AVAILABLE', 31, NULL),
(453, 'TOFAS-KTP-00453', '1. kat, G bölümü, 1. raf', 'AVAILABLE', 32, NULL),
(454, 'TOFAS-KTP-00454', '1. kat, G bölümü, 1. raf', 'LOANED', 32, NULL),
(455, 'TOFAS-KTP-00455', '1. kat, G bölümü, 1. raf', 'LOANED', 32, NULL),
(456, 'TOFAS-KTP-00456', '1. kat, G bölümü, 1. raf', 'AVAILABLE', 32, NULL),
(457, 'TOFAS-KTP-00457', '1. kat, G bölümü, 1. raf', 'AVAILABLE', 32, NULL),
(458, 'TOFAS-KTP-00458', '1. kat, G bölümü, 2. raf', 'AVAILABLE', 32, NULL),
(459, 'TOFAS-KTP-00459', '1. kat, G bölümü, 2. raf', 'AVAILABLE', 32, NULL),
(460, 'TOFAS-KTP-00460', '1. kat, G bölümü, 2. raf', 'AVAILABLE', 32, NULL),
(461, 'TOFAS-KTP-00461', '1. kat, G bölümü, 2. raf', 'AVAILABLE', 32, NULL),
(462, 'TOFAS-KTP-00462', '1. kat, G bölümü, 2. raf', 'AVAILABLE', 32, NULL),
(463, 'TOFAS-KTP-00463', '1. kat, G bölümü, 3. raf', 'AVAILABLE', 32, NULL),
(464, 'TOFAS-KTP-00464', '1. kat, G bölümü, 3. raf', 'AVAILABLE', 32, NULL),
(465, 'TOFAS-KTP-00465', '1. kat, G bölümü, 3. raf', 'AVAILABLE', 32, NULL),
(466, 'TOFAS-KTP-00466', '1. kat, G bölümü, 3. raf', 'AVAILABLE', 32, NULL),
(467, 'TOFAS-KTP-00467', '1. kat, G bölümü, 3. raf', 'AVAILABLE', 32, NULL),
(468, 'TOFAS-KTP-00468', '2. kat, H bölümü, 1. raf', 'AVAILABLE', 33, NULL),
(469, 'TOFAS-KTP-00469', '2. kat, H bölümü, 1. raf', 'LOANED', 33, NULL),
(470, 'TOFAS-KTP-00470', '2. kat, H bölümü, 1. raf', 'LOANED', 33, NULL),
(471, 'TOFAS-KTP-00471', '2. kat, H bölümü, 1. raf', 'AVAILABLE', 33, NULL),
(472, 'TOFAS-KTP-00472', '2. kat, H bölümü, 1. raf', 'AVAILABLE', 33, NULL),
(473, 'TOFAS-KTP-00473', '2. kat, H bölümü, 2. raf', 'AVAILABLE', 33, NULL),
(474, 'TOFAS-KTP-00474', '2. kat, H bölümü, 2. raf', 'AVAILABLE', 33, NULL),
(475, 'TOFAS-KTP-00475', '2. kat, H bölümü, 2. raf', 'AVAILABLE', 33, NULL),
(476, 'TOFAS-KTP-00476', '2. kat, H bölümü, 2. raf', 'AVAILABLE', 33, NULL),
(477, 'TOFAS-KTP-00477', '2. kat, H bölümü, 2. raf', 'AVAILABLE', 33, NULL),
(478, 'TOFAS-KTP-00478', '2. kat, H bölümü, 3. raf', 'AVAILABLE', 33, NULL),
(479, 'TOFAS-KTP-00479', '2. kat, H bölümü, 3. raf', 'AVAILABLE', 33, NULL),
(480, 'TOFAS-KTP-00480', '2. kat, H bölümü, 3. raf', 'AVAILABLE', 33, NULL),
(481, 'TOFAS-KTP-00481', '2. kat, H bölümü, 3. raf', 'AVAILABLE', 33, NULL),
(482, 'TOFAS-KTP-00482', '2. kat, H bölümü, 3. raf', 'AVAILABLE', 33, NULL),
(483, 'TOFAS-KTP-00483', '3. kat, A bölümü, 1. raf', 'LOANED', 34, NULL),
(484, 'TOFAS-KTP-00484', '3. kat, A bölümü, 1. raf', 'LOANED', 34, NULL),
(485, 'TOFAS-KTP-00485', '3. kat, A bölümü, 1. raf', 'LOANED', 34, NULL),
(486, 'TOFAS-KTP-00486', '3. kat, A bölümü, 1. raf', 'AVAILABLE', 34, NULL),
(487, 'TOFAS-KTP-00487', '3. kat, A bölümü, 1. raf', 'AVAILABLE', 34, NULL),
(488, 'TOFAS-KTP-00488', '3. kat, A bölümü, 2. raf', 'AVAILABLE', 34, NULL),
(489, 'TOFAS-KTP-00489', '3. kat, A bölümü, 2. raf', 'AVAILABLE', 34, NULL),
(490, 'TOFAS-KTP-00490', '3. kat, A bölümü, 2. raf', 'AVAILABLE', 34, NULL),
(491, 'TOFAS-KTP-00491', '3. kat, A bölümü, 2. raf', 'AVAILABLE', 34, NULL),
(492, 'TOFAS-KTP-00492', '3. kat, A bölümü, 2. raf', 'AVAILABLE', 34, NULL),
(493, 'TOFAS-KTP-00493', '3. kat, A bölümü, 3. raf', 'AVAILABLE', 34, NULL),
(494, 'TOFAS-KTP-00494', '3. kat, A bölümü, 3. raf', 'AVAILABLE', 34, NULL),
(495, 'TOFAS-KTP-00495', '3. kat, A bölümü, 3. raf', 'AVAILABLE', 34, NULL),
(496, 'TOFAS-KTP-00496', '3. kat, A bölümü, 3. raf', 'AVAILABLE', 34, NULL),
(497, 'TOFAS-KTP-00497', '3. kat, A bölümü, 3. raf', 'AVAILABLE', 34, NULL),
(498, 'TOFAS-KTP-00498', '1. kat, B bölümü, 1. raf', 'LOANED', 35, NULL),
(499, 'TOFAS-KTP-00499', '1. kat, B bölümü, 1. raf', 'LOANED', 35, NULL),
(500, 'TOFAS-KTP-00500', '1. kat, B bölümü, 1. raf', 'LOANED', 35, NULL),
(501, 'TOFAS-KTP-00501', '1. kat, B bölümü, 1. raf', 'AVAILABLE', 35, NULL),
(502, 'TOFAS-KTP-00502', '1. kat, B bölümü, 1. raf', 'AVAILABLE', 35, NULL),
(503, 'TOFAS-KTP-00503', '1. kat, B bölümü, 2. raf', 'AVAILABLE', 35, NULL),
(504, 'TOFAS-KTP-00504', '1. kat, B bölümü, 2. raf', 'AVAILABLE', 35, NULL),
(505, 'TOFAS-KTP-00505', '1. kat, B bölümü, 2. raf', 'AVAILABLE', 35, NULL),
(506, 'TOFAS-KTP-00506', '1. kat, B bölümü, 2. raf', 'AVAILABLE', 35, NULL),
(507, 'TOFAS-KTP-00507', '1. kat, B bölümü, 2. raf', 'AVAILABLE', 35, NULL),
(508, 'TOFAS-KTP-00508', '1. kat, B bölümü, 3. raf', 'AVAILABLE', 35, NULL),
(509, 'TOFAS-KTP-00509', '1. kat, B bölümü, 3. raf', 'AVAILABLE', 35, NULL),
(510, 'TOFAS-KTP-00510', '1. kat, B bölümü, 3. raf', 'AVAILABLE', 35, NULL),
(511, 'TOFAS-KTP-00511', '1. kat, B bölümü, 3. raf', 'AVAILABLE', 35, NULL),
(512, 'TOFAS-KTP-00512', '1. kat, B bölümü, 3. raf', 'AVAILABLE', 35, NULL),
(513, 'TOFAS-KTP-00513', '2. kat, C bölümü, 1. raf', 'AVAILABLE', 36, NULL),
(514, 'TOFAS-KTP-00514', '2. kat, C bölümü, 1. raf', 'LOANED', 36, NULL),
(515, 'TOFAS-KTP-00515', '2. kat, C bölümü, 1. raf', 'LOANED', 36, NULL),
(516, 'TOFAS-KTP-00516', '2. kat, C bölümü, 1. raf', 'AVAILABLE', 36, NULL),
(517, 'TOFAS-KTP-00517', '2. kat, C bölümü, 1. raf', 'AVAILABLE', 36, NULL),
(518, 'TOFAS-KTP-00518', '2. kat, C bölümü, 2. raf', 'AVAILABLE', 36, NULL),
(519, 'TOFAS-KTP-00519', '2. kat, C bölümü, 2. raf', 'AVAILABLE', 36, NULL),
(520, 'TOFAS-KTP-00520', '2. kat, C bölümü, 2. raf', 'AVAILABLE', 36, NULL),
(521, 'TOFAS-KTP-00521', '2. kat, C bölümü, 2. raf', 'AVAILABLE', 36, NULL),
(522, 'TOFAS-KTP-00522', '2. kat, C bölümü, 2. raf', 'AVAILABLE', 36, NULL),
(523, 'TOFAS-KTP-00523', '2. kat, C bölümü, 3. raf', 'AVAILABLE', 36, NULL),
(524, 'TOFAS-KTP-00524', '2. kat, C bölümü, 3. raf', 'AVAILABLE', 36, NULL),
(525, 'TOFAS-KTP-00525', '2. kat, C bölümü, 3. raf', 'AVAILABLE', 36, NULL),
(526, 'TOFAS-KTP-00526', '2. kat, C bölümü, 3. raf', 'AVAILABLE', 36, NULL),
(527, 'TOFAS-KTP-00527', '2. kat, C bölümü, 3. raf', 'AVAILABLE', 36, NULL),
(528, 'TOFAS-KTP-00528', '2. kat tofaş rafı', 'AVAILABLE', 19, 'qe'),
(529, 'TOFAS-KTP-00529', '2. kat, B bölümü, 5. raf', 'AVAILABLE', 1, 'Yeni basım'),
(530, 'TOFAS-KTP-00530', '1. kat', 'AVAILABLE', 6, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `id` bigint(20) NOT NULL,
  `checkout_date` date NOT NULL,
  `due_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `book_copy_id` bigint(20) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `issued_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loans`
--

INSERT INTO `loans` (`id`, `checkout_date`, `due_date`, `return_date`, `book_copy_id`, `member_id`, `issued_by`) VALUES
(1, '2026-08-09', '2026-08-23', '2026-08-09', 1, 1, 'yagizhan'),
(2, '2026-08-09', '2026-08-23', '2026-08-09', 1, 2, 'yagizhan'),
(3, '2026-07-07', '2026-07-21', '2026-08-09', 1, 13, 'yagizhan'),
(4, '2026-07-06', '2026-07-20', '2026-08-09', 2, 2, 'yagizhan'),
(5, '2026-07-05', '2026-07-19', '2026-08-11', 3, 1, 'yagizhan'),
(6, '2026-07-04', '2026-07-18', '2026-08-09', 123, 2, 'yagizhan'),
(7, '2026-07-03', '2026-07-17', '2026-08-09', 138, 5, 'yagizhan'),
(8, '2026-07-02', '2026-07-16', NULL, 153, 9, 'yagizhan'),
(9, '2026-07-01', '2026-07-15', NULL, 168, 10, 'yagizhan'),
(10, '2026-06-30', '2026-07-14', '2026-08-09', 183, 11, 'yagizhan'),
(11, '2026-06-29', '2026-07-13', NULL, 198, 12, 'yagizhan'),
(12, '2026-06-28', '2026-07-12', '2026-08-09', 213, 13, 'yagizhan'),
(13, '2026-06-27', '2026-07-11', '2026-08-11', 228, 1, 'yagizhan'),
(14, '2026-06-26', '2026-07-10', '2026-08-09', 243, 2, 'yagizhan'),
(15, '2026-07-10', '2026-07-24', '2026-08-09', 258, 5, 'yagizhan'),
(16, '2026-07-09', '2026-07-23', NULL, 18, 9, 'yagizhan'),
(17, '2026-07-08', '2026-07-22', NULL, 273, 10, 'yagizhan'),
(18, '2026-07-07', '2026-07-21', '2026-08-09', 288, 11, 'yagizhan'),
(19, '2026-07-06', '2026-07-20', NULL, 303, 12, 'yagizhan'),
(20, '2026-07-05', '2026-07-19', '2026-08-09', 318, 13, 'yagizhan'),
(21, '2026-07-04', '2026-07-18', '2026-08-11', 333, 1, 'yagizhan'),
(22, '2026-07-03', '2026-07-17', '2026-08-09', 348, 2, 'yagizhan'),
(23, '2026-07-02', '2026-07-16', '2026-08-09', 363, 5, 'yagizhan'),
(24, '2026-07-01', '2026-07-15', NULL, 378, 9, 'yagizhan'),
(25, '2026-06-30', '2026-07-14', NULL, 393, 10, 'yagizhan'),
(26, '2026-06-29', '2026-07-13', '2026-08-09', 408, 11, 'yagizhan'),
(27, '2026-06-28', '2026-07-12', NULL, 33, 12, 'yagizhan'),
(28, '2026-06-27', '2026-07-11', '2026-08-09', 423, 13, 'yagizhan'),
(29, '2026-06-26', '2026-07-10', '2026-08-11', 438, 1, 'yagizhan'),
(30, '2026-07-10', '2026-07-24', '2026-08-09', 453, 2, 'yagizhan'),
(31, '2026-07-09', '2026-07-23', '2026-08-09', 468, 5, 'yagizhan'),
(32, '2026-07-08', '2026-07-22', NULL, 483, 9, 'yagizhan'),
(33, '2026-07-07', '2026-07-21', NULL, 498, 10, 'yagizhan'),
(34, '2026-07-06', '2026-07-20', '2026-08-09', 513, 11, 'yagizhan'),
(35, '2026-07-05', '2026-07-19', NULL, 48, 12, 'yagizhan'),
(36, '2026-07-04', '2026-07-18', '2026-08-09', 63, 13, 'yagizhan'),
(37, '2026-07-03', '2026-07-17', '2026-08-11', 78, 1, 'yagizhan'),
(38, '2026-07-02', '2026-07-16', '2026-08-09', 93, 2, 'yagizhan'),
(39, '2026-07-01', '2026-07-15', '2026-08-09', 108, 5, 'yagizhan'),
(40, '2026-06-30', '2026-07-14', NULL, 4, 9, 'yagizhan'),
(41, '2026-06-29', '2026-07-13', NULL, 124, 10, 'yagizhan'),
(42, '2026-06-28', '2026-07-12', '2026-08-09', 139, 11, 'yagizhan'),
(43, '2026-06-27', '2026-07-11', NULL, 154, 12, 'yagizhan'),
(44, '2026-06-26', '2026-07-10', '2026-08-09', 169, 13, 'yagizhan'),
(45, '2026-07-10', '2026-07-24', '2026-08-11', 184, 1, 'yagizhan'),
(46, '2026-07-09', '2026-07-23', '2026-08-09', 199, 2, 'yagizhan'),
(47, '2026-07-08', '2026-07-22', '2026-08-09', 214, 5, 'yagizhan'),
(48, '2026-07-07', '2026-07-21', NULL, 229, 9, 'yagizhan'),
(49, '2026-07-06', '2026-07-20', NULL, 244, 10, 'yagizhan'),
(50, '2026-07-05', '2026-07-19', '2026-08-09', 259, 11, 'yagizhan'),
(51, '2026-07-04', '2026-07-18', NULL, 19, 12, 'yagizhan'),
(52, '2026-08-06', '2026-08-20', NULL, 274, 13, 'yagizhan'),
(53, '2026-07-02', '2026-07-16', '2026-08-11', 289, 1, 'yagizhan'),
(54, '2026-08-04', '2026-08-18', NULL, 304, 2, 'yagizhan'),
(55, '2026-06-30', '2026-07-14', '2026-08-09', 319, 5, 'yagizhan'),
(56, '2026-06-29', '2026-07-13', NULL, 334, 9, 'yagizhan'),
(57, '2026-08-08', '2026-08-22', NULL, 349, 10, 'yagizhan'),
(58, '2026-08-07', '2026-08-21', NULL, 364, 11, 'yagizhan'),
(59, '2026-08-06', '2026-08-20', NULL, 379, 12, 'yagizhan'),
(60, '2026-08-05', '2026-08-19', NULL, 394, 13, 'yagizhan'),
(61, '2026-08-04', '2026-08-18', NULL, 409, 1, 'yagizhan'),
(62, '2026-08-03', '2026-08-17', NULL, 34, 2, 'yagizhan'),
(63, '2026-08-09', '2026-08-23', NULL, 424, 5, 'yagizhan'),
(64, '2026-08-08', '2026-08-22', NULL, 439, 9, 'yagizhan'),
(65, '2026-08-07', '2026-08-21', NULL, 454, 10, 'yagizhan'),
(66, '2026-08-06', '2026-08-20', NULL, 469, 11, 'yagizhan'),
(67, '2026-08-05', '2026-08-19', NULL, 484, 12, 'yagizhan'),
(68, '2026-08-04', '2026-08-18', NULL, 499, 13, 'yagizhan'),
(69, '2026-08-03', '2026-08-17', NULL, 514, 1, 'yagizhan'),
(70, '2026-08-09', '2026-08-23', NULL, 49, 2, 'yagizhan'),
(71, '2026-08-08', '2026-08-22', NULL, 64, 5, 'yagizhan'),
(72, '2026-08-07', '2026-08-21', NULL, 79, 9, 'yagizhan'),
(73, '2026-08-06', '2026-08-20', NULL, 94, 10, 'yagizhan'),
(74, '2026-08-05', '2026-08-19', NULL, 109, 11, 'yagizhan'),
(75, '2026-08-04', '2026-08-18', NULL, 5, 12, 'yagizhan'),
(76, '2026-08-03', '2026-08-17', NULL, 125, 13, 'yagizhan'),
(77, '2026-08-09', '2026-08-23', '2026-08-11', 140, 1, 'yagizhan'),
(78, '2026-08-08', '2026-08-22', NULL, 155, 2, 'yagizhan'),
(79, '2026-08-07', '2026-08-21', NULL, 170, 5, 'yagizhan'),
(80, '2026-08-06', '2026-08-20', NULL, 185, 9, 'yagizhan'),
(81, '2026-08-05', '2026-08-19', NULL, 200, 10, 'yagizhan'),
(82, '2026-08-04', '2026-08-18', NULL, 215, 11, 'yagizhan'),
(83, '2026-08-03', '2026-08-17', NULL, 230, 12, 'yagizhan'),
(84, '2026-08-09', '2026-08-23', NULL, 245, 13, 'yagizhan'),
(85, '2026-08-08', '2026-08-22', NULL, 260, 1, 'yagizhan'),
(86, '2026-08-07', '2026-08-21', NULL, 20, 2, 'yagizhan'),
(87, '2026-08-06', '2026-08-20', NULL, 275, 5, 'yagizhan'),
(88, '2026-08-05', '2026-08-19', NULL, 290, 9, 'yagizhan'),
(89, '2026-08-04', '2026-08-18', NULL, 305, 10, 'yagizhan'),
(90, '2026-08-03', '2026-08-17', NULL, 320, 11, 'yagizhan'),
(91, '2026-08-09', '2026-08-23', NULL, 335, 12, 'yagizhan'),
(92, '2026-08-08', '2026-08-22', NULL, 350, 13, 'yagizhan'),
(93, '2026-08-07', '2026-08-21', NULL, 365, 1, 'yagizhan'),
(94, '2026-08-06', '2026-08-20', NULL, 380, 2, 'yagizhan'),
(95, '2026-08-05', '2026-08-19', NULL, 395, 5, 'yagizhan'),
(96, '2026-08-04', '2026-08-18', NULL, 410, 9, 'yagizhan'),
(97, '2026-08-03', '2026-08-17', NULL, 35, 10, 'yagizhan'),
(98, '2026-08-09', '2026-08-23', NULL, 425, 11, 'yagizhan'),
(99, '2026-08-08', '2026-08-22', NULL, 440, 12, 'yagizhan'),
(100, '2026-08-07', '2026-08-21', NULL, 455, 13, 'yagizhan'),
(101, '2026-08-06', '2026-08-20', NULL, 470, 1, 'yagizhan'),
(102, '2026-08-05', '2026-08-19', NULL, 485, 5, 'yagizhan'),
(103, '2026-08-04', '2026-08-18', NULL, 500, 9, 'yagizhan'),
(104, '2026-08-03', '2026-08-17', NULL, 515, 10, 'yagizhan'),
(105, '2026-08-09', '2026-08-23', NULL, 50, 11, 'yagizhan'),
(106, '2026-08-08', '2026-08-22', NULL, 65, 12, 'yagizhan'),
(107, '2026-08-09', '2026-08-23', '2026-08-09', 1, 2, 'yagizhan'),
(108, '2026-08-10', '2026-08-24', NULL, 183, 13, 'yagizhan'),
(109, '2026-08-10', '2026-08-24', '2026-08-10', 9, 17, 'seckin.buyuk'),
(110, '2026-08-11', '2026-08-25', '2026-08-11', 9, 1, 'seckin.buyuk');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `joined_at` datetime(6) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `email`, `first_name`, `joined_at`, `last_name`, `phone_number`) VALUES
(1, 'yagizhan@tofas.com.tr', 'Yağızhan Burak', '2026-08-09 13:45:56.000000', 'Yakar', '+905068560976'),
(2, 'seckin.buyuk@tofas.com.tr', 'Seçkin', '2026-08-09 19:03:26.000000', 'Büyük', '+90555555555'),
(5, 'd_yunusm@tofas.com.tr', 'Yunus', '2026-08-09 19:04:04.000000', 'Meriç', '+90555555554'),
(9, 'hoca@fenerbahce.org', 'İsmail', '2026-08-09 20:12:34.000000', 'Kartal', '+905019071907'),
(10, 'guendouzi@fenerbahce.org', 'Mattéo', '2026-08-09 20:12:41.000000', 'Guendouzi', '+33209320289'),
(11, 'furkan.demir@partner.tofas.com.tr', 'Furkan', '2026-08-09 20:12:49.000000', 'Demir', '+95320000011'),
(12, 'asensioooooo@fenerbahce.org', 'Marco', '2026-08-09 20:12:57.000000', 'Asensio', '+34687849335'),
(13, 'enesberke.karaoglan@partner.tofas.com.tr', 'Enes Berke', '2026-08-09 20:13:06.000000', 'Karaoğlan', '+90532000013'),
(14, 'baskan@fenerbahce.org', 'Aziz', '2026-08-09 22:08:26.000000', 'Yıldırım', '+905000001907'),
(15, 'alikoc@koc.com.tr', 'Ali', '2026-08-09 22:09:10.000000', 'Koç', '+905001111111'),
(16, 'milan.skriniar@fenerbahce.org', 'Milan', '2026-08-09 22:36:57.000000', 'Škriniar', '+421439104469'),
(17, 'mustafacemkarainci55@gmail.com', 'Mustafa Cem', '2026-08-10 18:11:55.000000', 'Karainci', '+903231313131313');

-- --------------------------------------------------------

--
-- Table structure for table `publishers`
--

CREATE TABLE `publishers` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publishers`
--

INSERT INTO `publishers` (`id`, `name`) VALUES
(1, 'İş Bankası Kültür Yayınları'),
(2, 'Can Yayınları'),
(13, 'Can Çocuk Yayınları'),
(14, 'Kırmızı Kedi Yayınevi'),
(15, 'Epsilon Yayınevi'),
(16, 'İthaki Yayınları'),
(21, 'İletişim Yayınevi'),
(24, 'Yapı Kredi Yayınları'),
(27, 'Doğan Kitap'),
(31, 'Metis Yayınları'),
(32, 'Sel Yayıncılık'),
(35, 'Bilgi Yayınevi'),
(36, 'Everest Yayınları'),
(39, 'Flipper Yayıncılık'),
(144, 'Karbon Kitaplar');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` bigint(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `password`, `role`, `username`, `first_name`, `last_name`) VALUES
(1, '$2a$10$YdNRk8SHlH1.0saqlrExquNcREO0atEfBOzOztKSeFNETgpqDKSBy', 'ROLE_ADMIN', 'yagizhan', 'Yağızhan Burak', 'Yakar'),
(3, '$2a$10$YdNRk8SHlH1.0saqlrExquNcREO0atEfBOzOztKSeFNETgpqDKSBy', 'ROLE_ADMIN', 'seckin.buyuk', 'Seçkin', 'Büyük');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKkibbepcitr0a3cpk3rfr7nihn` (`isbn`),
  ADD KEY `FKayy5edfrqnegqj3882nce6qo8` (`publisher_id`);

--
-- Indexes for table `book_author`
--
ALTER TABLE `book_author`
  ADD KEY `FKro54jqpth9cqm1899dnuu9lqg` (`author_id`),
  ADD KEY `FK91ierknt446aaqnjl4uxjyls3` (`book_id`);

--
-- Indexes for table `book_copies`
--
ALTER TABLE `book_copies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK2cljd120x678w4t245t66jqgw` (`inventory_number`),
  ADD KEY `FKhlawea8y2e2dv0ta58vc6f5nr` (`book_id`);

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK5mtk5pet0elnq2vncrx2tc9ch` (`book_copy_id`),
  ADD KEY `FKcx90n1minpb22v3jw4ojinqm` (`member_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK9d30a9u1qpg8eou0otgkwrp5d` (`email`),
  ADD UNIQUE KEY `UK99xbxdwmyun0ehfiwpbntlqs5` (`phone_number`);

--
-- Indexes for table `publishers`
--
ALTER TABLE `publishers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKn5ib031h2ipdsj507srabt3kf` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `book_copies`
--
ALTER TABLE `book_copies`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=531;

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `publishers`
--
ALTER TABLE `publishers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `FKayy5edfrqnegqj3882nce6qo8` FOREIGN KEY (`publisher_id`) REFERENCES `publishers` (`id`);

--
-- Constraints for table `book_author`
--
ALTER TABLE `book_author`
  ADD CONSTRAINT `FK91ierknt446aaqnjl4uxjyls3` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `FKro54jqpth9cqm1899dnuu9lqg` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`);

--
-- Constraints for table `book_copies`
--
ALTER TABLE `book_copies`
  ADD CONSTRAINT `FKhlawea8y2e2dv0ta58vc6f5nr` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

--
-- Constraints for table `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `FK5mtk5pet0elnq2vncrx2tc9ch` FOREIGN KEY (`book_copy_id`) REFERENCES `book_copies` (`id`),
  ADD CONSTRAINT `FKcx90n1minpb22v3jw4ojinqm` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
