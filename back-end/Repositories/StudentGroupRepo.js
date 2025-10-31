const { connectToDB } = require("../Services/connectToDB");
const { closeDB } = require("../Services/connectToDB");

class StudentGroupRepo {
	async addStudentGroup(studentGroup) {
		const {
			student_id,
			group_id,
			enrollment_date,
			created_at = new Date(),
		} = studentGroup;
		try {
			
			const result = await client.query(
				'INSERT INTO "student_group" (student_id, group_id, enrollment_date, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
				[student_id, group_id, enrollment_date, created_at]
			);
			
			return result.rows[0];
		} catch (err) {
			console.error("Error adding student group:", err);
			throw err;
		}
	}

    async getAllStudentGroups() {
        try {
            
            const result = await client.query('SELECT * FROM "student_group"');
            
            return result.rows;
        } catch (err) {
            console.error('Error fetching student groups:', err);
            throw err;
        }
    }

	async deleteStudentGroup(student_id, group_id) {
		try {
			
			const result = await client.query(
				'DELETE FROM "student_group" WHERE student_id = $1 AND group_id = $2 RETURNING *',
				[student_id, group_id]
			);
			 
			return result.rows[0];
		} catch (err) {
			console.error("Error deleting student group:", err);
			throw err;
		}
	}
}

module.exports = StudentGroupRepo;
