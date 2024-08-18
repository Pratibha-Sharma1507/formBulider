const FormSubmission = require('../model/FormSubimission'); 

exports.submitForm = async (req, res) => {
    try {
        const formId = req.params.id;
        const formData = req.body;

        if (!formId || !formData) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        // Create a new FormSubmission instance
        const newSubmission = new FormSubmission({
            formId,
            ...formData, 
        });

        // Save the submission to the database
        await newSubmission.save();
        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ message: 'Error submitting form' });
    }
};
