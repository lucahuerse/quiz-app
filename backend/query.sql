CREATE TABLE questions (
    id INTEGER PRIMARY KEY,
    question_text TEXT NOT NULL,
    category TEXT
);

CREATE TABLE answers (
    id INTEGER PRIMARY KEY,
    answer_text TEXT NOT NULL,
    is_correct INTEGER NOT NULL CHECK (is_correct IN (0, 1)),
    question_id INTEGER,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

INSERT INTO questions (question_text, category)
VALUES ('What is the purpose of the main function in C?', 'Computer Science');

INSERT INTO questions (question_text, category)
VALUES ('Explain the concept of pointers in C.', 'Computer Science');

INSERT INTO questions (question_text, category)
VALUES ('What is the role of an operating system in a computer system?', 'Computer Science');

INSERT INTO questions (question_text, category)
VALUES ('Describe the difference between HTTP and HTTPS.', 'Computer Science');

INSERT INTO questions (question_text, category)
VALUES ('What is the purpose of a database index?', 'Computer Science');


INSERT INTO answers (answer_text, is_correct, question_id)
VALUES ('To indicate the starting point of the program execution.', 1, 1),
       ('To define the variables used in the program.', 0, 1),
       ('To include external libraries.', 0, 1),
       ('To handle errors in the program.', 0, 1);

INSERT INTO answers (answer_text, is_correct, question_id)
VALUES ('Pointers are variables that store memory addresses.', 1, 2),
       ('Pointers are used to multiply two numbers.', 0, 2),
       ('Pointers are a type of loop in C.', 0, 2),
       ('Pointers are used for creating graphics in C.', 0, 2);

INSERT INTO answers (answer_text, is_correct, question_id)
VALUES ('Manages hardware resources and provides services to applications.', 1, 3),
       ('Manages user interfaces and input devices.', 0, 3),
       ('Manages software development tools.', 0, 3),
       ('Manages data storage devices.', 0, 3);

INSERT INTO answers (answer_text, is_correct, question_id)
VALUES ('HTTP is unsecured, while HTTPS is secured with encryption.', 1, 4),
       ('HTTP and HTTPS are the same.', 0, 4),
       ('HTTP is faster than HTTPS.', 0, 4),
       ('HTTPS is used for file transfer.', 0, 4);

INSERT INTO answers (answer_text, is_correct, question_id)
VALUES ('Improves the speed of data retrieval operations.', 1, 5),
       ('Adds more storage space to the database.', 0, 5),
       ('Ensures data consistency in the database.', 0, 5),
       ('Provides backup and recovery options for the database.', 0, 5);


SELECT
    q.id AS question_id,
    q.question_text AS question,
    q.category AS category,
    a.id AS answer_id,
    a.answer_text AS answer,
    a.is_correct
FROM
    questions q
JOIN
    answers a ON q.id = a.question_id;