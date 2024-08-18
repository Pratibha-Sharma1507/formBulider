import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FormView.css'; 

const FormView = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({}); // State to manage input values

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/form/${id}`);
        setForm(response.data);
        // Initialize formData with the form inputs
        const initialFormData = response.data.inputs.reduce((acc, input) => {
          acc[input.title] = '';
          return acc;
        }, {});
        setFormData(initialFormData);
      } catch (error) {
        setError('Error fetching form');
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/form/${id}/submit`, formData);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!form || !form.inputs) return <p>No form data available</p>;

  return (
    <div>
      <h1>{form.title}</h1>
      <form onSubmit={handleSubmit}>
        {form.inputs.map((input, index) => (
          <div key={index}>
            <label>{input.title}</label>
            <input
              type={input.type}
              placeholder={input.placeholder}
              name={input.title} // Use title as name
              value={formData[input.title] || ''} // Set value from formData
              onChange={handleInputChange}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormView;
