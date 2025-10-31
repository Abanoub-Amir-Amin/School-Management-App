const { connectToDB } = require('../Services/connectToDB');
const { closeDB } = require('../Services/connectToDB');

class StudentRepo {
    
    async getAllStudents() {
        try {
            const result = await client.query('SELECT * FROM student');
            return result.rows;
        } catch (err) {
            console.error('Error fetching students:', err);
            throw err;
        }
    }

    async getStudentById(id) {
        try {
            
            const result = await client.query('SELECT * FROM student WHERE student_id = $1', [id]);
            
            return result.rows[0];
        } catch (err) {
            console.error('Error fetching student by ID:', err);
            throw err;
        }
    }

    async addStudent(student){
        const {firstName, lastName, date_of_birth, email, phone, created_at = new Date()} = student;
        try {
            
            const result = await client.query(
                'INSERT INTO student (first_name, last_name, date_of_birth, email, phone, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [firstName, lastName, date_of_birth, email, phone, created_at]
            );
            
            return result.rows[0];
        } catch (err) {
            console.error('Error adding student:', err);
            throw err;
        }
    }

    async updateStudent(id, student) {
        const {first_name, last_name, date_of_birth, email, phone} = student;
        try {
            
            const result = await client.query(
                'UPDATE student SET first_name = $1, last_name = $2, date_of_birth = $3, email = $4, phone = $5 WHERE student_id = $6 RETURNING *',
                [first_name, last_name, date_of_birth, email, phone, id]
            );
            
            return result.rows[0];
        } catch (err) {
            console.error('Error updating student:', err);
            throw err;
        }
    }

    async deleteStudent(id) {
        try {
            
            const result = await client.query('DELETE FROM student WHERE student_id = $1 RETURNING *', [id]);
            
            return result.rows[0];
        } catch (err) {
            console.error('Error deleting student:', err);
            throw err;
        }
    }

    
}

module.exports = StudentRepo; 