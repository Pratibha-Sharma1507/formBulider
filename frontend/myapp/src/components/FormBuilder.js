import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';

const FormCreate = ({ history }) => {
  const [formTitle, setFormTitle] = useState('');
  const [inputs, setInputs] = useState([]);

  const handleTitleChange = (e) => {
    setFormTitle(e.target.value);
  };

  const handleInputChange = (index, e) => {
    const newInputs = [...inputs];
    newInputs[index].value = e.target.value;
    setInputs(newInputs);
  };

  const handleAddInput = (type, title, placeholder) => {
    if (inputs.length >= 20) {
      alert('You can only add up to 20 inputs.');
      return;
    }
    setInputs([...inputs, { type, title, placeholder, value: '' }]);
  };

  const handleRemoveInput = (index) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      const formData = {
        title: formTitle,
        inputs,
      };
      await axios.post('http://localhost:5000/api/form/create', formData);
      alert('Form saved successfully!');
      history.push('/'); // Redirect to home page
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save the form.');
    }
  };

  return (
    <div>
      <h1>Create Form</h1>
      <div>
        <label>Form Title:</label>
        <input
          type="text"
          value={formTitle}
          onChange={handleTitleChange}
          placeholder="Enter form title"
        />
      </div>
      <div>
        <h2>Add Input Fields</h2>
        <button onClick={() => handleAddInput('text', 'Name', 'Enter your name')}>Add Text Input</button>
        <button onClick={() => handleAddInput('email', 'Email', 'Enter your email')}>Add Email Input</button>
        <button onClick={() => handleAddInput('password', 'Password', 'Enter your password')}>Add Password Input</button>
        <button onClick={() => handleAddInput('number', 'Number', 'Enter a number')}>Add Number Input</button>
        <button onClick={() => handleAddInput('date', 'Date', 'Select a date')}>Add Date Input</button>
      </div>
      <div>
        <h2>Form Inputs</h2>
        {inputs.length === 0 && <p>No inputs added</p>}
        {inputs.map((input, index) => (
          <div key={index}>
            <InputField
              type={input.type}
              title={input.title}
              placeholder={input.placeholder}
              value={input.value}
              onChange={(e) => handleInputChange(index, e)}
            />
            <button onClick={() => handleRemoveInput(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save Form</button>
    </div>
  );
};

export default FormCreate;
