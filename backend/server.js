require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const Joi = require('joi'); // לאבטחת וולידציה בנתונים (התקן עם npm install joi)

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// סכימת וולידציה למשלוח נתוני משחקים
const gameSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().precision(2).min(0).required(),
  rating: Joi.number().min(0).max(5).required(),
  image_url: Joi.string().uri().required()
});

// לולאת middleware ל-async error handling
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// כללי הטיפול בשגיאות API
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// API: קבלת כל המשחקים
app.get('/api/games', asyncHandler(async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM games LIMIT 50');
  res.json(rows);
}));

// API: קבלת משחק לפי ID
app.get('/api/games/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { rows } = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Game not found' });
  res.json(rows[0]);
}));

// API: הוספת משחק חדש
app.post('/api/games', asyncHandler(async (req, res) => {
  const { error, value } = gameSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, price, rating, image_url } = value;
  const { rows } = await pool.query(
    'INSERT INTO games (name, price, rating, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, price, rating, image_url]
  );
  res.status(201).json(rows[0]);
}));

// API: עדכון משחק
app.put('/api/games/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { error, value } = gameSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, price, rating, image_url } = value;
  const { rows } = await pool.query(
    'UPDATE games SET name=$1, price=$2, rating=$3, image_url=$4 WHERE id=$5 RETURNING *',
    [name, price, rating, image_url, id]
  );

  if (rows.length === 0) return res.status(404).json({ error: 'Game not found' });
  res.json(rows[0]);
}));

// API: מחיקת משחק
app.delete('/api/games/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { rows } = await pool.query('DELETE FROM games WHERE id=$1 RETURNING *', [id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Game not found' });
  res.json({ message: 'Game deleted', game: rows[0] });
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
