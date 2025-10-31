const { connectToDB } = require("../Services/connectToDB");
const { closeDB } = require("../Services/connectToDB");

class SubjectRepo {
	async getAllSubjects() {
		try {
			
			const res = await client.query("SELECT * FROM subject");
			
			return res.rows;
		} catch (err) {
			console.error("Error fetching subjects:", err);
			throw err;
		}
	}
	async getSubjectById(subjectId) {
		
		const res = await client.query(
			"SELECT * FROM subject WHERE subject_id = $1",
			[subjectId]
		);
        
		return res.rows[0];
	}
	async addSubject(subject) {
		const { subject_name, description, created_at = new Date() } = subject;
		
		const res = await client.query(
			"INSERT INTO subject (subject_name, description, created_at) VALUES ($1, $2, $3) RETURNING *",
			[subject_name, description, created_at]
		);
		
		return res.rows[0];
	}
	async updateSubject(subjectId, subject) {
		const { subject_name, description } = subject;
		
		const res = await client.query(
			"UPDATE subject SET subject_name = $1, description = $2 WHERE subject_id = $3 RETURNING *",
			[subject_name, description, subjectId]
		);
        
		return res.rows[0];
	}
	async deleteSubject(subjectId) {
		
		const res = await client.query(
			"DELETE FROM subject WHERE subject_id = $1 RETURNING *",
			[subjectId]
		);
        
		return res.rows[0];
	}
}

module.exports = SubjectRepo;
