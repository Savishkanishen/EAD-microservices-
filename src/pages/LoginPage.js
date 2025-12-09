import React, { useState } from 'react';
import { validateLogin } from '../api/userApi';
import { Form, Button, Alert } from 'react-bootstrap';

const LoginPage = ({ onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await validateLogin(name, password);
    if (typeof response.data === 'string') {
      // It's an error message
      setError(response.data);
    } else {
      // It's the user object
      setError('');
      onLoginSuccess(response.data); // pass user info to parent or context
    }
  } catch (err) {
    setError('Login failed. Please try again.');
  }
};


  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3>Login</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
