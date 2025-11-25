const express = require('express');
const router = express.Router();

// Get all styles
router.get('/', (req, res) => {
    const db = req.db;
    db.all(`SELECT * FROM styles`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Add a style
router.post('/', (req, res) => {
    const { name, imageUrl, description } = req.body;
    const db = req.db;

    db.run(`INSERT INTO styles (name, imageUrl, description) VALUES (?, ?, ?)`, [name, imageUrl, description], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID, name, imageUrl, description });
    });
});

module.exports = router;
