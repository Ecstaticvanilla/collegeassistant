// backend/db.js

const mysql = require('mysql2/promise');

// Create a connection pool to the database
const pool = mysql.createPool({
    host: 'localhost',      // Your database host
    user: 'root',           // Your database username
    password: 'your_password', // Your database password
    database: 'college_portal', // The name of your database
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
