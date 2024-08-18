import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css'; 

const HomePage = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forms');
        setForms(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/form/${id}`);
      setForms(forms.filter((form) => form._id !== id)); // Update state to remove deleted form
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">Error: {error.message}</p>;

  return (
    <div className="container">
      <h1>Forms</h1>
      <Link to="/form/create" className="link-button">Create New Form</Link>
      <ul className="form-list">
        {forms.map((form) => (
          <li key={form._id} className="form-list-item">
            <Link to={`/form/${form._id}`}>{form.title}</Link>
            <div>
              <Link to={`/form/${form._id}/edit`} className="link-button">Edit</Link>
              <button onClick={() => handleDelete(form._id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
