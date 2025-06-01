    // src/components/Signup.jsx
    import React from 'react';
    import AuthForm from './AuthForm';

    const Signup = ({ onSignup }) => {
      const handleSignup = (formData) => {
        onSignup(formData);
      };

      return (
        <AuthForm onSubmit={handleSignup} type="Signup">
          {(handleChange, formData) => (
            <>
              <label>
                Username:
                <input type="text" name="username" onChange={handleChange} />
              </label>
              <label>
                Password:
                <input type="password" name="password" onChange={handleChange} />
              </label>
              <label>
                Confirm Password:
                <input type="password" name="confirmPassword" onChange={handleChange} />
              </label>
            </>
          )}
        </AuthForm>
      );
    };

    export default Signup;