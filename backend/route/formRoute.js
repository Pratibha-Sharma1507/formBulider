const express = require('express');
const router = express.Router();
const formController = require('../controller/formController');

// Get all forms
router.get('/forms', formController.getAllForms);

// Create a new form
router.post('/form/create', formController.createForm);

// Get a specific form by ID
router.get('/form/:id', formController.getFormById);

// Update a specific form by ID
router.put('/form/:id/edit', formController.updateForm);

// Delete a specific form by ID
router.delete('/form/:id', formController.deleteForm);

module.exports = router;
