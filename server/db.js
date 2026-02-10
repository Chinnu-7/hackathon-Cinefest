const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;

async function initializeDb() {
    try {
        // Connect without database first to ensure it exists
        const connection = await mysql.createConnection(dbConfig);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'cinemind'}\``);
        await connection.end();

        // Now create the pool with the database
        pool = mysql.createPool({
            ...dbConfig,
            database: process.env.DB_NAME || 'cinemind'
        });

        const conn = await pool.getConnection();
        console.log('Successfully connected to MySQL database: ' + (process.env.DB_NAME || 'cinemind'));

        // Create Users table
        await conn.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'Director',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create Script Analysis table
        await conn.query(`
            CREATE TABLE IF NOT EXISTS script_analysis (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                file_name VARCHAR(255),
                tone VARCHAR(255),
                risk_score INT,
                analysis_data JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        conn.release();
    } catch (err) {
        console.error('MySQL Initialization Error:', err.message);
        console.log('Tip: Check if MySQL service is running and credentials in .env are correct.');
    }
}

// Export a proxy for the pool since it's initialized asynchronously
const poolProxy = {
    query: (...args) => pool.query(...args),
    execute: (...args) => pool.execute(...args),
    getConnection: (...args) => pool.getConnection(...args)
};

module.exports = { pool: poolProxy, initializeDb };
