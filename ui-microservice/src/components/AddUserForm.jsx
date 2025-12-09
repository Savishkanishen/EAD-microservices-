import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { addUser } from '../api/userApi';

export default function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!name || !password || !email) {
      setMessage('Please fill in all required fields.');
      return;
    }
    if (role === 'student' && !grade) {
      setMessage('Please select a grade for student.');
      return;
    }

    const user = {
      name,
      password,
      role,
      email,
      grade: role === 'student' ? grade : null
    };

    try {
      await addUser(user);
      setMessage('User added successfully!');
      // reset
      setName('');
      setPassword('');
      setRole('student');
      setGrade('');
      setEmail('');
      if (onUserAdded) onUserAdded();
    } catch (err) {
      console.error(err);
      setMessage('Error adding user.');
    }
  };

  return (
    <div className="mt-4">
      <h4>Add New User</h4>
      {message && (
        <Alert variant={message.includes('success') ? 'success' : 'danger'}>
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="userName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="userPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="userEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="userRole" className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={e => setRole(e.target.value)}
            required
          >
            <option value="student">student</option>
            <option value="admin">admin</option>
          </Form.Select>
        </Form.Group>

        {role === 'student' && (
          <Form.Group controlId="userGrade" className="mb-3">
            <Form.Label>Grade</Form.Label>
            <Form.Select
              value={grade}
              onChange={e => setGrade(e.target.value)}
              required
            >
              <option value="">Select Grade</option>
              {[...Array(11)].map((_, i) => {
                const num = String(i + 1).padStart(2, '0');
                return (
                  <option key={num} value={`grade ${num}`}>
                    {`Grade ${i + 1}`}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          Add User
        </Button>
      </Form>
    </div>
  );
}
