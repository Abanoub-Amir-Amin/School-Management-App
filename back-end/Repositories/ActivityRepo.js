const { connectToDB } = require("../Services/connectToDB");
const { closeDB } = require("../Services/connectToDB");

class ActivityRepo {
	async getAllActivities() {
		try {
			const result = await client.query("SELECT * FROM activity");

			return result.rows;
		} catch (err) {
			console.error("Error fetching activities:", err);
			throw err;
		}
	}

	async getActivityById(id) {
		try {
			const result = await client.query(
				"SELECT * FROM activity WHERE activity_id = $1",
				[id]
			);

			return result.rows[0];
		} catch (err) {
			console.error("Error fetching activity by ID:", err);
			throw err;
		}
	}

	async addActivity(activity) {
		const {
			group_id,
			activity_name,
			description,
			scheduled_time,
			duration_minutes,
			location,
			created_at = new Date(),
		} = activity;
		try {
			const result = await client.query(
				"INSERT INTO activity (group_id, activity_name, description, scheduled_time, duration_minutes, location, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
				[
					group_id,
					activity_name,
					description,
					scheduled_time,
					duration_minutes,
					location,
					created_at,
				]
			);

			return result.rows[0];
		} catch (err) {
			console.error("Error adding activity:", err);
			throw err;
		}
	}

	async updateActivity(id, activity) {
		const {
			group_id,
			activity_name,
			description,
			scheduled_time,
			duration_minutes,
			location,
		} = activity;
		try {
			const result = await client.query(
				"UPDATE activity SET group_id = $1, activity_name = $2, description = $3, scheduled_time = $4, duration_minutes = $5, location = $6 WHERE activity_id = $7 RETURNING *",
				[
					group_id,
					activity_name,
					description,
					scheduled_time,
					duration_minutes,
					location,
					id,
				]
			);

			return result.rows[0];
		} catch (err) {
			console.error("Error updating activity:", err);
			throw err;
		}
	}
	async deleteActivity(id) {
		try {
			const result = await client.query(
				"DELETE FROM activity WHERE activity_id = $1 RETURNING *",
				[id]
			);

			return result.rows[0];
		} catch (err) {
			console.error("Error deleting activity:", err);
			throw err;
		}
	}
}

module.exports = ActivityRepo;
