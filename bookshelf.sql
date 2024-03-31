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

INSERT INTO book (title, author, image_url, categories) VALUES
('The 15th Affair: The New Women''s Murder Club Novel', 'James Patterson', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649198/bc-15th_affair_fs9zas.jpg', 'crimeDrama,thriller,novel'),
('Before the Fall', 'Noah Hawley', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649180/bc-before_the_fall_xn9ry4.jpg', 'fiction,novel'),
('Diary of a Wimpy Kid: Double Down', 'Jeff Kinney', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649214/bc-diary_of_a_wimpy_kid_odilob.jpg', 'childFiction,novel'),
('Harry Potter and the Cursed Child, Parts 1 & 2', 'J.K. Rowling', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649183/bc-harry_potter_pwzilg.jpg', 'childFiction,fantasy,play'),
('Hillbilly Elegy: A Memoir of a Family and Culture in Crisis', 'J.D. Vance', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649182/bc-hillbilly_elegy_ipelvr.jpg', 'nonFiction,critique'),
('Killing the Rising Sun: How America Vanquished World War II Japan', 'Bill O''Reilly', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649169/bc-killing_the_rising_sun_qw2dcx.jpg', 'history,critique'),
('The Black Widow', 'Daniel Silva', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649174/bc-the_black_widow_esmzpi.jpg', 'thriller,novel'),
('Night School: A Jack Reacher Novel', 'Lee Child', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649205/bc-the_jack_reacher_thriller_xwdyi7.jpg', 'fiction,novel'),
('The Last Mile', 'David Baldacci', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649196/bc-the_last_mile_fqj7tu.jpg', 'crimeDrama,novel'),
('The Whistler', 'John Grisham', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649194/bc-the_whistler_ofw7y6.jpg', 'crimeDrama,novel'),
('Truly Madly Guilty', 'Liane Moriarty', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649201/bc-truly_madly_guilty_zlsdzb.jpg', 'fiction,novel'),
('When Breath Becomes Air', 'Paul Kalanithi', 'http://res.cloudinary.com/dtj4lxtyr/image/upload/v1519649191/bc-when_breath_becomes_air_gi50fe.jpg', 'autoBiograpghy,memoir');
