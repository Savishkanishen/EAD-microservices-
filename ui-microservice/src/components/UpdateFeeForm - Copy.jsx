import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...user, password: user.password || '' });

  useEffect(() => {
    setFormData({ ...user, password: user.password || '' });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="mt-3 p-3 border">
      <h4>Edit User</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Role</Form.Label>
          <Form.Select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="student">student</option>
            <option value="admin">admin</option>
          </Form.Select>
        </Form.Group>
        {formData.role === 'student' && (
          <Form.Group className="mb-2">
            <Form.Label>Grade</Form.Label>
            <Form.Control
              type="text"
              name="grade"
              value={formData.grade || ''}
              onChange={handleChange}
            />
          </Form.Group>
        )}
        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"  // or "password" if you want masking during edit
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button variant="success" type="submit" className="me-2">Save</Button>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </Form>
    </div>
  );
};

export default EditUserForm;
