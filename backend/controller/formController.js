const Form = require('../model/Form');

exports.getAllForms = async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving forms' });
    }
};
exports.createForm = async (req, res) => {
    try {
        // Validate the incoming data
        const { title, inputs } = req.body;
        if (!title || !Array.isArray(inputs)) {
            return res.status(400).json({ message: 'Invalid data format' });
        }

        // Create a new form instance
        const newForm = new Form({
            title,
            inputs
        });

        // Save the form to the database
        await newForm.save();

        // Send a success response
        res.status(201).json(newForm);
    } catch (error) {
        console.error('Error creating form:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error creating form' });
    }
};

exports.getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving form' });
    }
};

exports.updateForm = async (req, res) => {
    try {
        const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(updatedForm);
    } catch (error) {
        res.status(500).json({ message: 'Error updating form' });
    }
};

exports.deleteForm = async (req, res) => {
    try {
        const deletedForm = await Form.findByIdAndDelete(req.params.id);
        if (!deletedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting form' });
    }
};
