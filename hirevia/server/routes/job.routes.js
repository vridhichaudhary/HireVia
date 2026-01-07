const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const passport = require('passport');

// @route   GET api/jobs
router.get('/', jobController.getJobs);

// @route   GET api/jobs/:id
router.get('/:id', jobController.getJobById);

// @route   POST api/jobs
// Protected route for recruiters/users to post jobs
router.post('/', passport.authenticate('jwt', { session: false }), jobController.createJob);

// @route   POST api/jobs/sync
// Sync jobs from external sources (Admin/System only)
router.post('/sync', jobController.syncJobs);

module.exports = router;
