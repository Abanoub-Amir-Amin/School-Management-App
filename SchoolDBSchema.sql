-- School Management System Database
-- PostgreSQL Script

-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS activity CASCADE;
DROP TABLE IF EXISTS student_group CASCADE;
DROP TABLE IF EXISTS "group" CASCADE;
DROP TABLE IF EXISTS teacher CASCADE;
DROP TABLE IF EXISTS subject CASCADE;
DROP TABLE IF EXISTS student CASCADE;

-- Create SUBJECT table
CREATE TABLE subject (
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create TEACHER table
CREATE TABLE teacher (
    teacher_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    subject_id INTEGER NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_teacher_subject FOREIGN KEY (subject_id) 
        REFERENCES subject(subject_id) ON DELETE RESTRICT
);

-- Create GROUP table (using quotes because GROUP is a reserved keyword)
CREATE TABLE "group" (
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL,
    teacher_id INTEGER NOT NULL,
    schedule VARCHAR(200),
    capacity INTEGER DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_group_teacher FOREIGN KEY (teacher_id) 
        REFERENCES teacher(teacher_id) ON DELETE RESTRICT
);

-- Create STUDENT table
CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create STUDENT_GROUP junction table (many-to-many relationship)
CREATE TABLE student_group (
    student_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, group_id),
    CONSTRAINT fk_student_group_student FOREIGN KEY (student_id) 
        REFERENCES student(student_id) ON DELETE CASCADE,
    CONSTRAINT fk_student_group_group FOREIGN KEY (group_id) 
        REFERENCES "group"(group_id) ON DELETE CASCADE
);

-- Create ACTIVITY table
CREATE TABLE activity (
    activity_id SERIAL PRIMARY KEY,
    group_id INTEGER NOT NULL,
    activity_name VARCHAR(100) NOT NULL,
    description TEXT,
    scheduled_time TIMESTAMP NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_activity_group FOREIGN KEY (group_id) 
        REFERENCES "group"(group_id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_teacher_subject ON teacher(subject_id);
CREATE INDEX idx_group_teacher ON "group"(teacher_id);
CREATE INDEX idx_student_group_student ON student_group(student_id);
CREATE INDEX idx_student_group_group ON student_group(group_id);
CREATE INDEX idx_activity_group ON activity(group_id);
CREATE INDEX idx_activity_scheduled_time ON activity(scheduled_time);

-- Add comments to tables for documentation
COMMENT ON TABLE subject IS 'Stores subjects taught in the school';
COMMENT ON TABLE teacher IS 'Stores teacher information - each teacher teaches one subject';
COMMENT ON TABLE "group" IS 'Stores group/class information';
COMMENT ON TABLE student IS 'Stores student information';
COMMENT ON TABLE student_group IS 'Junction table for many-to-many relationship between students and groups';
COMMENT ON TABLE activity IS 'Stores activities performed by groups at specific times';

-- Insert some sample data (optional - you can remove this section if not needed)

-- Sample subjects
INSERT INTO subject (subject_name, description) VALUES
('Mathematics', 'Math courses including algebra, geometry, and calculus'),
('English Literature', 'English language and literature studies'),
('Physics', 'Physical sciences and laboratory work'),
('History', 'World and regional history courses'),
('Computer Science', 'Programming and computer fundamentals');

-- Sample teachers
INSERT INTO teacher (first_name, last_name, subject_id, email, phone) VALUES
('John', 'Smith', 1, 'john.smith@school.edu', '555-0101'),
('Sarah', 'Johnson', 2, 'sarah.johnson@school.edu', '555-0102'),
('Michael', 'Brown', 3, 'michael.brown@school.edu', '555-0103'),
('Emily', 'Davis', 4, 'emily.davis@school.edu', '555-0104'),
('David', 'Wilson', 5, 'david.wilson@school.edu', '555-0105');

-- Sample groups
INSERT INTO "group" (group_name, teacher_id, schedule, capacity) VALUES
('Math A1', 1, 'Mon/Wed/Fri 9:00-10:30', 25),
('English B2', 2, 'Tue/Thu 10:00-11:30', 30),
('Physics C1', 3, 'Mon/Wed 14:00-15:30', 20),
('History D1', 4, 'Tue/Thu 13:00-14:30', 28),
('CS E1', 5, 'Mon/Wed/Fri 11:00-12:30', 22);

-- Sample students
INSERT INTO student (first_name, last_name, date_of_birth, email, phone) VALUES
('Alice', 'Anderson', '2005-03-15', 'alice.anderson@student.edu', '555-1001'),
('Bob', 'Baker', '2006-07-22', 'bob.baker@student.edu', '555-1002'),
('Carol', 'Carter', '2005-11-08', 'carol.carter@student.edu', '555-1003'),
('Daniel', 'Davis', '2006-01-30', 'daniel.davis@student.edu', '555-1004'),
('Eva', 'Evans', '2005-09-12', 'eva.evans@student.edu', '555-1005');

-- Sample student-group assignments (students in multiple groups)
INSERT INTO student_group (student_id, group_id, enrollment_date) VALUES
(1, 1, '2024-09-01'),
(1, 2, '2024-09-01'),
(2, 1, '2024-09-01'),
(2, 3, '2024-09-01'),
(3, 2, '2024-09-01'),
(3, 4, '2024-09-01'),
(4, 3, '2024-09-01'),
(4, 5, '2024-09-01'),
(5, 1, '2024-09-01'),
(5, 5, '2024-09-01');

-- Sample activities
INSERT INTO activity (group_id, activity_name, description, scheduled_time, duration_minutes, location) VALUES
(1, 'Algebra Quiz', 'Quiz on quadratic equations', '2024-10-25 09:00:00', 45, 'Room 101'),
(2, 'Shakespeare Reading', 'Discussion of Hamlet Act 3', '2024-10-24 10:00:00', 90, 'Room 205'),
(3, 'Lab: Motion', 'Physics lab on motion and velocity', '2024-10-23 14:00:00', 90, 'Lab 3'),
(4, 'WWI Presentation', 'Student presentations on WWI', '2024-10-24 13:00:00', 90, 'Room 310'),
(5, 'Python Workshop', 'Introduction to Python programming', '2024-10-25 11:00:00', 90, 'Computer Lab 1');

-- Display success message
SELECT 'Database schema created successfully!' AS status;