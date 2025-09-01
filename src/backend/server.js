require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
 
const app = express();
const port = process.env.PORT || 3044;
 
app.use(cors());
app.use(express.json({ limit: '5mb' }));

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
    console.log('✅ Connected to MySQL:', process.env.DB_NAME);
    conn.release();
  } catch (err) {
    console.error('❌ MySQL Failed:', err.message);
    process.exit(1);
  }
})();

// GET - ดึงข้อมูลสินค้าทั้งหมด
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('❌ Products Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET - ดึงข้อมูลสินค้าตาม ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('❌ Product Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST - เพิ่มสินค้าใหม่ (ลบ id ออกจาก INSERT เพราะเป็น AUTO_INCREMENT)
app.post('/api/products', async (req, res) => {
  try {
    const {
      name, stock, category, location, image, status
    } = req.body;
    
    console.log('Received data:', req.body);
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const [rs] = await pool.query(
      `INSERT INTO products (name, stock, category, location, status, image) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, stock || 0, category || null, location || null, status || 'Active', image || null]
    );
    
    console.log(`📦 Product created: ${name} (ID: ${rs.insertId})`);
    return res.status(201).json({ success: true, productId: rs.insertId });
  } catch (e) {
    console.error('Create Product Error:', e);
    if (e.sqlState === '22001' && e.sqlMessage.includes('Data too long')) {
      return res.status(413).json({ 
        error: 'Image too large',
        message: 'The selected image file is too large. Please choose a smaller one.' 
      });
    }
    
    return res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT - แก้ไขข้อมูลสินค้า
app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      name, stock, category, location, image, status
    } = req.body;

    // ตรวจสอบว่าสินค้ามีอยู่หรือไม่
    const [existing] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const [rs] = await pool.query(
      `UPDATE products 
       SET name = ?, stock = ?, category = ?, location = ?, image = ?, status = ?
       WHERE id = ?`,
      [
        name, 
        stock !== undefined ? stock : existing[0].stock,
        category !== undefined ? category : existing[0].category,
        location !== undefined ? location : existing[0].location,
        image !== undefined ? image : existing[0].image,
        status !== undefined ? status : existing[0].status,
        productId
      ]
    );

    console.log(`✏️ Product updated: ${name} (ID: ${productId})`);
    return res.status(200).json({ 
      success: true, 
      productId: productId,
      affectedRows: rs.affectedRows 
    });
  } catch (e) {
    console.error('Update Product Error:', e);
    return res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE - ลบสินค้า
app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // ตรวจสอบว่าสินค้ามีอยู่หรือไม่
    const [existing] = await pool.query('SELECT name FROM products WHERE id = ?', [productId]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const [rs] = await pool.query('DELETE FROM products WHERE id = ?', [productId]);

    console.log(`🗑️ Product deleted: ${existing[0].name} (ID: ${productId})`);
    return res.status(200).json({ 
      success: true, 
      productId: productId,
      deletedProduct: existing[0].name,
      affectedRows: rs.affectedRows 
    });
  } catch (e) {
    console.error('Delete Product Error:', e);
    return res.status(500).json({ error: 'Failed to delete product' });
  }
});
 
// Run Server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 API running on port ${port}`);
});