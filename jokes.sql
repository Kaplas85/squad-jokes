CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE topics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE jokes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  topic_id INT NOT NULL,
  content TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (topic_id) REFERENCES topics(id)
);

INSERT INTO users (name) VALUES
  ('Manolito'),
  ('Pepe'),
  ('Isabel'),
  ('Pedro');

INSERT INTO topics (name) VALUES
  ('humor negro'),
  ('humor amarillo'),
  ('chistes verdes');

INSERT INTO jokes (user_id, topic_id, content) VALUES
  (1,1,'Chiste humor negro 1 de Manolito'),
  (1,1,'Chiste humor negro 2 de Manolito'),
  (1,1,'Chiste humor negro 3 de Manolito'),
  (1,2,'Chiste humor amarillo 1 de Manolito'),
  (1,2,'Chiste humor amarillo 2 de Manolito'),
  (1,2,'Chiste humor amarillo 3 de Manolito'),
  (1,3,'Chiste chistes verdes 1 de Manolito'),
  (1,3,'Chiste chistes verdes 2 de Manolito'),
  (1,3,'Chiste chistes verdes 3 de Manolito'),
  (2,1,'Chiste humor negro 1 de Pepe'),
  (2,1,'Chiste humor negro 2 de Pepe'),
  (2,1,'Chiste humor negro 3 de Pepe'),
  (2,2,'Chiste humor amarillo 1 de Pepe'),
  (2,2,'Chiste humor amarillo 2 de Pepe'),
  (2,2,'Chiste humor amarillo 3 de Pepe'),
  (2,3,'Chiste chistes verdes 1 de Pepe'),
  (2,3,'Chiste chistes verdes 2 de Pepe'),
  (2,3,'Chiste chistes verdes 3 de Pepe'),
  (3,1,'Chiste humor negro 1 de Isabel'),
  (3,1,'Chiste humor negro 2 de Isabel'),
  (3,1,'Chiste humor negro 3 de Isabel'),
  (3,2,'Chiste humor amarillo 1 de Isabel'),
  (3,2,'Chiste humor amarillo 2 de Isabel'),
  (3,2,'Chiste humor amarillo 3 de Isabel'),
  (3,3,'Chiste chistes verdes 1 de Isabel'),
  (3,3,'Chiste chistes verdes 2 de Isabel'),
  (3,3,'Chiste chistes verdes 3 de Isabel'),
  (4,1,'Chiste humor negro 1 de Pedro'),
  (4,1,'Chiste humor negro 2 de Pedro'),
  (4,1,'Chiste humor negro 3 de Pedro'),
  (4,2,'Chiste humor amarillo 1 de Pedro'),
  (4,2,'Chiste humor amarillo 2 de Pedro'),
  (4,2,'Chiste humor amarillo 3 de Pedro'),
  (4,3,'Chiste chistes verdes 1 de Pedro'),
  (4,3,'Chiste chistes verdes 2 de Pedro'),
  (4,3,'Chiste chistes verdes 3 de Pedro');

SELECT j.id, t.name AS topic, j.content
FROM jokes j
JOIN users u ON j.user_id = u.id
JOIN topics t ON j.topic_id = t.id
WHERE u.name = 'Manolito';

SELECT j.id, u.name AS author, j.content
FROM jokes j
JOIN users u ON j.user_id = u.id
JOIN topics t ON j.topic_id = t.id
WHERE t.name = 'humor negro';

SELECT j.id, j.content
FROM jokes j
JOIN users u ON j.user_id = u.id
JOIN topics t ON j.topic_id = t.id
WHERE u.name = 'Manolito'
  AND t.name = 'humor negro';
