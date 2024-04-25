DROP DATABASE IF EXISTS db_example;
CREATE DATABASE db_example;
USE db_example;
CREATE TABLE book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    categories VARCHAR(255)
);
use db_example;
delete from book where id <= 19 ;
INSERT INTO book (id, title, author, image_url, categories, description, price) VALUES
(1, 'After You', 'Jojo Moyes', 'https://images-na.ssl-images-amazon.com/images/I/81UWB7oUZ0L.jpg', 'romantic', 'Louisa Clark is no longer just an ordinary girl living an ordinary life. After the transformative six months spent.', 12.99),
(2, 'Disappearing Earth', 'Julia Phillips', 'https://images-na.ssl-images-amazon.com/images/I/A1kNdYXw0GL.jpg', 'adventure', 'Explore the complex interweaving of lives across a remote Siberian peninsula in "Disappearing Earth."', 15.49),
(3,'Lost Children Archive', 'Valeria Luiselli', 'https://images-na.ssl-images-amazon.com/images/I/81eI0ExR+VL.jpg', 'fictional', '"Lost Children Archive" delves into the heartbreak of separation and the quest for belonging as a family embarks on a road trip across America.', 17.35),
(4,'Phantoms: A Thriller', 'Dean Koontz', 'https://images-na.ssl-images-amazon.com/images/I/81OF9eJDA4L.jpg', 'business', 'A chilling narrative of mystery and terror as a small town faces an unimaginable horror in "Phantoms: A Thriller."', 9.20),
(5,'Midnight in Chernobyl', 'Adam Higginbotham', 'https://m.media-amazon.com/images/I/515FWPyZ-5L.jpg', 'technology', 'Uncover the shocking details of one of the greatest nuclear disasters in history in "Midnight in Chernobyl."', 14.88),
(6,'10 Minutes 38 Seconds', 'Elif Shafak', 'https://images-na.ssl-images-amazon.com/images/I/91dBtgERNUL.jpg', 'romatic, fictional', '"10 Minutes 38 Seconds" weaves an extraordinary tale of a woman\'s reflection on her life’s story in the moments after death.', 13.65),
(7,'The 15th Affair', 'James Patterson', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649198/bc-15th_affair_fs9zas.jpg', 'business,technology', 'A gripping chapter in the Women''s Murder Club series, filled with suspense and mystery.', 8.99),
(8,'Before the Fall', 'Noah Hawley', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649180/bc-before_the_fall_xn9ry4.jpg', 'adventure,romantic', 'A riveting tale of mystery and suspense that begins with a tragic plane crash.', 15.20),
(9,'Diary of a Wimpy Kid', 'Jeff Kinney', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649214/bc-diary_of_a_wimpy_kid_odilob.jpg', 'fictional,adventure', 'Join Greg Heffley in another comical adventure about life''s ups and downs.', 5.95),
(11,'Harry Potter and the Cursed Child, Parts 1 & 2', 'J.K. Rowling', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649183/bc-harry_potter_pwzilg.jpg', 'fictional,adventure,romantic', 'The magic continues in this play that follows the next generation of Potters.', 19.99),
(12,'Hillbilly Elegy', 'J.D. Vance', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649182/bc-hillbilly_elegy_ipelvr.jpg', 'fictional,adventure', 'An intimate account of growing up in a poor Rust Belt town that offers a broader, probing look at the struggles of America''s white working class.', 12.50),
(13,'Killing the Rising Sun', 'Bill O''Reilly', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649169/bc-killing_the_rising_sun_qw2dcx.jpg', 'business', 'A detailed historical narrative of the final moments of World War II in the Pacific.', 18.00),
(14,'The Black Widow', 'Daniel Silva', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649174/bc-the_black_widow_esmzpi.jpg', 'fictional', 'An electrifying thriller that weaves a web of espionage and intrigue.', 14.75),
(15,'Night School: A Jack Reacher Novel', 'Lee Child', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649205/bc-the_jack_reacher_thriller_xwdyi7.jpg', 'fiction,adventure', 'Jack Reacher returns in a pulse-pounding read that takes you back to his army days.', 16.50),
(16,'The Last Mile', 'David Baldacci', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649196/bc-the_last_mile_fqj7tu.jpg', 'business,technology', 'A gripping tale of death row, desperation, and the lengths one will go to for justice.', 13.40),
(17,'The Whistler', 'John Grisham', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649194/bc-the_whistler_ofw7y6.jpg', 'business,technology', 'Grisham''s latest legal thriller uncovers a corrupt judge with more secrets than most.', 17.95),
(18,'Truly Madly Guilty', 'Liane Moriarty', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649201/bc-truly_madly_guilty_zlsdzb.jpg', 'romantic,fictional', 'The complexities of friendship and marriage are explored with sharp insight and sly wit in this novel.', 12.30),
(19,'When Breath Becomes Air', 'Paul Kalanithi', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649191/bc-when_breath_becomes_air_gi50fe.jpg', 'romantic,adventure', 'A profoundly moving memoir of a young neurosurgeon faced with a terminal', 12.30);
