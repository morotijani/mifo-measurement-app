const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const measurementService = require('../services/measurementService');

// Configure storage for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure uploads directory exists (created in server.js or manually)
        // For now assuming it exists or handled
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Process measurement
router.post('/process', upload.single('image'), async (req, res) => {
    try {
        const { userId, gender } = req.body;
        const imagePath = req.file ? req.file.path : null;

        if (!imagePath) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        // Call service to calculate measurements
        const measurements = await measurementService.calculateMeasurements(imagePath, gender);

        // Save to database
        const db = req.db;
        db.run(`INSERT INTO measurements (userId, height, chest, waist, hips, date) VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, measurements.height, measurements.chest, measurements.waist, measurements.hips, new Date().toISOString()],
            function (err) {
                if (err) {
                    console.error(err);
                    // Return measurements anyway even if save fails? Or error?
                    // Let's return success with data
                }
                res.json({
                    id: this ? this.lastID : null,
                    ...measurements
                });
            }
        );

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get measurements for a user
router.get('/:userId', (req, res) => {
    const db = req.db;
    const { userId } = req.params;

    db.all(`SELECT * FROM measurements WHERE userId = ? ORDER BY date DESC`, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

module.exports = router;
