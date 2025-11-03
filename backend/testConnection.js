require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Connected to database successfully!");
    client.release();
    process.exit(0);
  } catch (err) {
    console.error('Connection error:', err.stack);
    process.exit(1);
  }
}

console.log("Starting test...");
testConnection();
