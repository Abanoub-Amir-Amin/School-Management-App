const { connectToDB } = require("../Services/connectToDB");
const { closeDB } = require("../Services/connectToDB");

class GroupRepo {
	async getAllGroups() {
		try {
			const result = await client.query('SELECT * FROM "group"');
			return result.rows;
		} catch (err) {
			console.error("Error fetching groups:", err);
			throw err;
		}
	}

	async getGroupById(id) {
		try {
			
			const result = await client.query(
				'SELECT * FROM "group" WHERE group_id = $1',
				[id]
			);
			
			return result.rows[0];
		} catch (err) {
			console.error("Error fetching group by ID:", err);
			throw err;
		}
	}

	async addGroup(group) {
		const {
			group_name,
			teacher_id,
			schedule,
			capacity,
			created_at = new Date(),
		} = group;
		try {
			
			const result = await client.query(
				'INSERT INTO "group" (group_name, teacher_id, schedule, capacity, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
				[group_name, teacher_id, schedule, capacity, created_at]
			);
			
			return result.rows[0];
		} catch (err) {
			console.error("Error adding group:", err);
			throw err;
		}
	}

	async updateGroup(id, group) {
		const { group_name, teacher_id, schedule, capacity } = group;
		try {
			
			const result = await client.query(
				'UPDATE "group" SET group_name = $1, teacher_id = $2, schedule = $3, capacity = $4 WHERE group_id = $5 RETURNING *',
				[group_name, teacher_id, schedule, capacity, id]
			);
			
			return result.rows[0];
		} catch (err) {
			console.error("Error updating group:", err);
			throw err;
		}
	}

	async deleteGroup(id) {
		try {
			
			const result = await client.query(
				'DELETE FROM "group" WHERE group_id = $1 RETURNING *',
				[id]
			);
			
			return result.rows[0];
		} catch (err) {
			console.error("Error deleting group:", err);
			throw err;
		}
	}
}

module.exports = GroupRepo;
