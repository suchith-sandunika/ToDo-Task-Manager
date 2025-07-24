import mysql from 'mysql2';
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});

const setDbConnection = () => {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error connecting to the database:', error);
            return;
        }
        console.log('Connected to the database successfully!');
        connection.release();
    });
}

export { pool, setDbConnection };