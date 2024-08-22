const mysql = require("mysql2");

// create a database pool
const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	port: process.env.MYSQL_PORT,
	waitForConnections: true,
	connectionLimit: 20,
	queueLimit: 0,
});

module.exports = pool.promise();
