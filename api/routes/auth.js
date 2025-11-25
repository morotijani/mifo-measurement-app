const express = require('express');
const router = express.Router();

// Register
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const db = req.db;

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID, username });
    });
});

// Login (Mock)
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const db = req.db;

    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful', user: row });
    });
});

module.exports = router;
