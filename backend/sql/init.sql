-- backend/sql/init.sql

-- Create the database
CREATE DATABASE IF NOT EXISTS college_portal;
USE college_portal;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student', 'teacher') NOT NULL,
    student_id INT
);

-- Create the students table (for student-specific info)
CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    division VARCHAR(50) NOT NULL,
    batch VARCHAR(50) NOT NULL
);

-- Create the attendance records table
CREATE TABLE IF NOT EXISTS attendance_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject VARCHAR(255) NOT NULL,
    activity_type ENUM('lectures', 'labs') NOT NULL,
    month ENUM('Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec') NOT NULL,
    attended_count INT DEFAULT 0,
    total_count INT DEFAULT 0,
    FOREIGN KEY (student_id) REFERENCES users(student_id)
);

-- Create the grades table
CREATE TABLE IF NOT EXISTS grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject VARCHAR(255) NOT NULL,
    section ENUM('ise', 'mse', 'ese', 'lab_ise', 'lab_ese') NOT NULL,
    mark INT DEFAULT 0,
    FOREIGN KEY (student_id) REFERENCES users(student_id)
);

-- Create the weightages table (to store exam weightages by subject)
CREATE TABLE IF NOT EXISTS weightages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    section ENUM('ise', 'mse', 'ese', 'lab_ise', 'lab_ese') NOT NULL,
    weight_percentage INT NOT NULL
);

-- Create the timetable table
CREATE TABLE IF NOT EXISTS timetables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    division VARCHAR(50) NOT NULL,
    batch VARCHAR(50) NOT NULL,
    day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday') NOT NULL,
    time VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    activity VARCHAR(255) NOT NULL
);
