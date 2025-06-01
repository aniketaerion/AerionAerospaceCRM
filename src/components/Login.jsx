    // src/components/Login.jsx
    import React from 'react';
    import AuthForm from './AuthForm';

    const Login = ({ onLogin }) => {
      const handleLogin = (formData) => {
        onLogin(formData);
      };

      return (
        <AuthForm onSubmit={handleLogin} type="Login">
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
            </>
          )}
        </AuthForm>
      );
    };

    export default Login;