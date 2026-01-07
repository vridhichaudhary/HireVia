const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const passport = require('passport');

// All application routes are protected
router.use(passport.authenticate('jwt', { session: false }));

// @route   POST api/applications
router.post('/', applicationController.applyToJob);

// @route   GET api/applications
router.get('/', applicationController.getUserApplications);

// @route   PUT api/applications/:id
router.put('/:id', applicationController.updateApplicationStatus);

// @route   DELETE api/applications/:id
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
