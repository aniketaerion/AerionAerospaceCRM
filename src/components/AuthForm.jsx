    // src/components/AuthForm.jsx
    import React, { useState } from 'react';

    const AuthForm = ({ onSubmit, type, children }) => {
      const [formData, setFormData] = useState({});

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

      return (
        <form onSubmit={handleSubmit}>
          {children(handleChange, formData)}
          <button type="submit">{type}</button>
        </form>
      );
    };

    export default AuthForm;