const { Client } = require("pg");

async function connectToDB() {
	this.client = new Client({
		user: "postgres",
		host: "localhost",
		database: "SchoolDB",
		password: "admin",
		port: 5432,
	});

	try {
		await this.client.connect();
		console.log("Database connected successfully");
	} catch (err) {
		console.error("Database connection error:", err);
		throw err;
	}

	return this.client;
}

async function closeDB() {
	await this.client.end();
    console.log("Database connection closed");
}

module.exports = { connectToDB, closeDB };
