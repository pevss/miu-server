const mysql = require("mysql2");

const databaseConnection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "miu",
});

module.exports = databaseConnection;
