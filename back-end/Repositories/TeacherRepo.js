const { connectToDB } = require('../Services/connectToDB');
const { closeDB } = require('../Services/connectToDB');

class TeacherRepo {
    
    async getAllTeachers() {
        try {
            
            const result = await client.query('SELECT * FROM teacher');
            
            return result.rows;
        } catch (err) {
            console.error('Error fetching teachers:', err);
            throw err;
        }
    }

    async getTeacherById(id) {
        try {
            
            const result = await client.query('SELECT * FROM teacher WHERE teacher_id = $1', [id]);
            
            return result.rows[0];
        } catch (err) {
            console.error('Error fetching teacher by ID:', err);
            throw err;
        }
    }

    async addTeacher(teacher){
        const {firstName, lastName, subject_id, email, phone, created_at = new Date()} = teacher;
        try {
            
            const result = await client.query(
                'INSERT INTO teacher (first_name, last_name, subject_id, email, phone, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [firstName, lastName, subject_id, email, phone, created_at]
            );
            
            return result.rows[0];
        } catch (err) {
            console.error('Error adding teacher:', err);
            throw err;
        }
    }

    async updateTeacher(id, teacher) {
        const {first_name, last_name, subject_id, email, phone} = teacher;
        try {
            
            const result = await client.query(
                'UPDATE teacher SET first_name = $1, last_name = $2, subject_id = $3, email = $4, phone = $5 WHERE teacher_id = $6 RETURNING *',
                [first_name, last_name, subject_id, email, phone, id]
            );
            
            return result.rows[0];
        } catch (err) {
            console.error('Error updating teacher:', err);
            throw err;
        }
    }

    async deleteTeacher(id) {
        try {
            
            const result = await client.query('DELETE FROM teacher WHERE teacher_id = $1 RETURNING *', [id]);
            
            return result.rows[0];
        } catch (err) {
            console.error('Error deleting teacher:', err);
            throw err;
        }
    }

    
}

module.exports = TeacherRepo; 