const express = require('express');
const router = express.Router();
const formController = require('../controller/formContoller1');

// Handle form submission
router.post('/form/:id/submit', formController.submitForm);

module.exports = router;
