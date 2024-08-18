import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormBuilder from '../components/FormBuilder';

const FormEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      const response = await fetch(`http://localhost:5000/api/form/${id}/edit`);
      const data = await response.json();
      setTitle(data.title);
      setInputs(data.sections[0].inputs || []);
    };

    fetchForm();
  }, [id]);

  const handleSave = async () => {
    await fetch(`http://localhost:5000/api/form/${id}/edit`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, sections: [{ inputs }] })
    });
  };

  return (
    <div>
      <h1>Edit Form</h1>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Form Title" 
      />
      <FormBuilder inputs={inputs} setInputs={setInputs} />
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default FormEdit;
