# School Management System

A full-stack school management application built with **Next.js** (frontend) and **Express.js** (backend), using **PostgreSQL** as the database.

## Features

- Student management
- Teacher management
- Group/Class management
- Subject tracking
- Student-Group enrollment
- Activity scheduling
- Comprehensive reporting system

## Tech Stack

- **Frontend:** Next.js 16+ (React, App Router)
- **Backend:** Express.js (Node.js)
- **Database:** PostgreSQL
- **Styling:** CSS Modules

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v22 or higher)
- [PostgreSQL](https://www.postgresql.org/download/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Database Setup

### 1. Install PostgreSQL

If you haven't installed PostgreSQL yet:

**Windows:**
```bash
# Download and install from: https://www.postgresql.org/download/windows/
```

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

Open your terminal and access PostgreSQL:

```bash
# Login as postgres user
psql -U postgres

# Or if you have a different user
psql -U your_username
```

Create a new database:

```sql
CREATE DATABASE school_management;
```

Exit psql:
```sql
\q
```

### 3. Run Database Schema

Navigate to the project root directory and run the schema file:

```bash
# Using psql command line
psql -U postgres -d school_management -f database/schema.sql

# Or if you prefer, copy and paste the contents of schema.sql into psql
psql -U postgres -d school_management
# Then paste the schema.sql contents
```

### 4. Verify Database Setup

Check if tables were created successfully:

```bash
psql -U postgres -d school_management
```

```sql
\dt  -- List all tables
-- You should see: subject, teacher, group, student, student_group, activity

\d student  -- Describe student table
```

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/school-management-system.git
cd school-management-system
```

### 2. Install Dependencies

**Backend (Express):**
```bash
cd backend
npm install
```

**Frontend (Next.js):**
```bash
cd ../frontend
npm install
```

### 3. Configure Environment Variables

**Backend** - Create `backend/.env`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=school_management
DB_USER=postgres
DB_PASSWORD=your_password

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Frontend** - Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Database Connection

Make sure your backend is configured to connect to PostgreSQL. Your connection file should look like this:

```javascript
// backend/config/database.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;
```

## Running the Project

### 1. Start the Backend Server

```bash
cd backend
npm start

# Or for development with nodemon
npm run dev
```

The backend should now be running on `http://localhost:3000`

### 2. Start the Frontend Server

Open a new terminal window:

```bash
cd frontend
npm run dev
```

The frontend should now be running on `http://localhost:3001` (or next available port)

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:3001
```

## Database Schema

### Tables

- **subject** - Stores subjects taught in the school
- **teacher** - Stores teacher information (each teacher teaches one subject)
- **group** - Stores group/class information
- **student** - Stores student information
- **student_group** - Junction table for many-to-many relationship between students and groups
- **activity** - Stores activities performed by groups at specific times

### Relationships

```
subject (1) ─── (N) teacher
teacher (1) ─── (N) group
student (N) ─── (N) group (via student_group junction table)
group (1) ─── (N) activity
```

## Sample Data

The database schema includes sample data:

- 5 Subjects (Mathematics, English Literature, Physics, History, Computer Science)
- 5 Teachers (one per subject)
- 5 Groups/Classes
- 5 Students
- 10 Student-Group enrollments
- 5 Sample activities

## API Endpoints

Base URL: `http://localhost:3000`

### Students
- `POST /add-student` - Create new student
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "date_of_birth": "2010-5-19",
    "email": "john@test.com",
    "phone": "555-502"
  }
  ```
- `GET /all-students` - Get all students
- `GET /student/:id` - Get student by ID
- `PUT /update-student/:id` - Update student
- `DELETE /delete-student/:id` - Delete student

### Teachers
- `POST /add-teacher` - Create new teacher
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "subject_id": 4,
    "email": "john@test.com",
    "phone": "555-502"
  }
  ```
- `GET /all-teachers` - Get all teachers
- `GET /teacher/:id` - Get teacher by ID
- `PUT /update-teacher/:id` - Update teacher
- `DELETE /delete-teacher/:id` - Delete teacher

### Subjects
- `POST /add-subject` - Create new subject
  ```json
  {
    "subject_name": "Data structures",
    "description": "Programming and computer fundamentals"
  }
  ```
- `GET /all-subjects` - Get all subjects
- `GET /subject/:id` - Get subject by ID
- `PUT /update-subject/:id` - Update subject
- `DELETE /delete-subject/:id` - Delete subject

### Groups
- `POST /add-group` - Create new group
  ```json
  {
    "group_name": "IS G2",
    "teacher_id": 3,
    "schedule": "Mon/Wed/Fri 11:00-12:30",
    "capacity": 20
  }
  ```
- `GET /all-groups` - Get all groups
- `GET /group/:id` - Get group by ID
- `PUT /update-group/:id` - Update group
- `DELETE /delete-group/:id` - Delete group

### Activities
- `POST /add-activity` - Create new activity
  ```json
  {
    "group_id": 5,
    "activity_name": "Network Workshop",
    "description": "Introduction to Network fundamentals",
    "scheduled_time": "2025-11-25T08:00:00.000Z",
    "duration_minutes": 90,
    "location": "Computer Lab 1"
  }
  ```
- `GET /all-activities` - Get all activities
- `GET /activity/:id` - Get activity by ID
- `PUT /update-activity/:id` - Update activity
- `DELETE /delete-activity/:id` - Delete activity

### Student Groups (Enrollment)
- `POST /add-student-group` - Enroll student in group
  ```json
  {
    "student_id": 7,
    "group_id": 4,
    "enrollment_date": "2025-10-23"
  }
  ```
- `GET /all-student-groups` - Get all student-group enrollments
- `DELETE /delete-student-group/:studentId/:groupId` - Remove student from group

### Reports
- `GET /reports/student-groups/:teacherId` - Get student groups assigned to a particular teacher
- `GET /reports/teachers-assigned/:studentId` - Get teachers assigned to a specific student
- `GET /reports/teacher-students?sortBy=teacher` - Get teacher-student report sorted by teacher
- `GET /reports/teacher-students?sortBy=student` - Get teacher-student report sorted by student

## Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list  # macOS

# Test connection
psql -U postgres -d school_management -c "SELECT 1;"
```

### Port Already in Use

```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000  # Windows
```

### Reset Database

To completely reset the database:

```bash
psql -U postgres
DROP DATABASE school_management;
CREATE DATABASE school_management;
\q

psql -U postgres -d school_management -f database/schema.sql
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Happy Coding!**
