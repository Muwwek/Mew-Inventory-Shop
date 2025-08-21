require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3044;

// อนุญาต CORS จากทุกที่ (สำหรับการพัฒนา)
app.use(cors({
  origin: '*'
}));

app.use(express.json({ limit: '5mb' }));

// MySQL Connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: "+07:00"
});

(async function testMySQL() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to MySQL:', process.env.DB_NAME);
        conn.release();
    } catch (err) {
        console.error('MySQL Failed:', err.message);
        process.exit(1);
    }
})();

// ✅ Route หลักสำหรับตรวจสอบ API
app.get('/api', (req, res) => {
    res.send('API is running');
});

// Get products
// Get products
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products'); 
    res.json(rows);
  } catch (e) {
    console.error('Products Error:', e); // แสดง error ทั้งหมด
    res.status(500).json({ error: 'Failed to fetch products', detail: e.message });
  }
});


// เริ่มต้น server ที่ทุก network interface
app.listen(port, '0.0.0.0', () => {
    console.log(`API running on http://0.0.0.0:${port}`);
    console.log(`สามารถเข้าถึงได้จาก: http://localhost:${port} หรือ http://[YOUR_IP]:${port}`);
});