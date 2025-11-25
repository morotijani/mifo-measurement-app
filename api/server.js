const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Setup
const db = new sqlite3.Database('./mma.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS styles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      imageUrl TEXT,
      description TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS measurements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      height REAL,
      chest REAL,
      waist REAL,
      hips REAL,
      date TEXT,
      FOREIGN KEY(userId) REFERENCES users(id)
    )`);
  }
});

// Make db available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/measurements', require('./routes/measurements'));
app.use('/api/styles', require('./routes/styles'));

app.get('/', (req, res) => {
  res.send('Body Measurement API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
