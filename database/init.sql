CREATE TABLE students (

id SERIAL PRIMARY KEY,

username VARCHAR(100) UNIQUE NOT NULL,

password VARCHAR(100) NOT NULL

);

CREATE TABLE courses (

id SERIAL PRIMARY KEY,

course_name VARCHAR(100)

);

CREATE TABLE enrollments (

id SERIAL PRIMARY KEY,

student_id INT REFERENCES students(id),

course_id INT REFERENCES courses(id)

);

INSERT INTO courses(course_name)

VALUES

('Java'),

('Python'),

('Docker'),

('AWS'),

('Kubernetes'),

('DevOps'),

('React'),

('Node.js');