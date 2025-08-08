// server.js
//node src/backend/server.js
//วิธีรัน
const express = require('express');
const fetch = require('node-fetch'); 
const cors = require('cors');

const app = express();
const PORT = 3044;

// เปิดใช้งาน CORS
app.use(cors());

// สร้าง endpoint ที่ proxy ข้อมูลจาก URL ปลายทาง
app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch('http://119.59.102.61/std6630202805/product.json');
    const data = await response.json();
    res.json(data); // ส่ง JSON กลับให้ client
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลได้' });
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
