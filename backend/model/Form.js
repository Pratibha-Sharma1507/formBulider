const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  inputs: [
    {
      type: { type: String, enum: ['text', 'email', 'password', 'number', 'date'], required: true },
      title: { type: String, required: true },
      placeholder: { type: String, required: true },
    }
  ]
});

module.exports = mongoose.model('Form', formSchema);
