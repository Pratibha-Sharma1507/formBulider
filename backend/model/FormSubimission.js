const mongoose = require('mongoose');

const FormSubmissionSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, required: true },
    data: { type: Map, of: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('FormSubmission', FormSubmissionSchema);
