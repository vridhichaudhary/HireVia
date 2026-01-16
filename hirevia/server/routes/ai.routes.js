const express = require('express');
const router = express.Router();
const multer = require('multer');
const aiController = require('../controllers/ai.controller');
const passport = require('passport');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// AI Analyze Route
router.post('/analyze-resume', passport.authenticate('jwt', { session: false }), upload.single('resume'), aiController.analyzeResume);

// AI Match Route
router.post('/match-jd', passport.authenticate('jwt', { session: false }), upload.single('resume'), aiController.matchJD);

// AI Cover Letter Route
router.post('/generate-cover-letter', passport.authenticate('jwt', { session: false }), upload.single('resume'), aiController.generateCoverLetter);

module.exports = router;
