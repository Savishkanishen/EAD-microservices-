import React, { useEffect, useState } from 'react';
import { getAllUsers, getUserByName, deleteUser, updateUser } from '../api/userApi';
import { Table, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [message, setMessage] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (!searchName.trim()) {
      loadUsers();
      return;
    }
    try {
      const res = await getUserByName(searchName.trim());
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(id);
      setMessage('User deleted successfully!');
      loadUsers();
    } catch (err) {
      console.error(err);
      setMessage('Error deleting user.');
    }
  };

  const startEditing = (user) => {
    setEditingUser(user.id);
    setEditForm({
      ...user,
      password: user.password || '',
      role: user.role.toLowerCase()
    });
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await updateUser(editForm);
      setMessage('User updated successfully!');
      setEditingUser(null);
      loadUsers();
    } catch (err) {
      console.error(err);
      setMessage('Error updating user.');
    }
  };

  return (
    <div className="mt-4">
      <h4>User List</h4>
      {message && <Alert variant="info">{message}</Alert>}

      <Form className="mb-3">
        <Row className="align-items-center">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
          <Col md={2}>
            <Button variant="secondary" onClick={loadUsers}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Grade</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editingUser === user.id ? (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <Form.Control
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <Form.Control
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <Form.Select
                    name="role"
                    value={editForm.role}
                    onChange={handleEditChange}
                  >
                    <option value="student">student</option>
                    <option value="admin">admin</option>
                  </Form.Select>
                </td>
                <td>
                  {editForm.role?.toLowerCase() === 'student' && (
                    <Form.Control
                      type="text"
                      name="grade"
                      value={editForm.grade || ''}
                      onChange={handleEditChange}
                    />
                  )}
                </td>
                <td>
                  <Form.Control
                    type="text"
                    name="password"
                    value={editForm.password}
                    onChange={handleEditChange}
                    placeholder="Enter password"
                  />
                </td>
                <td>
                  <Button size="sm" variant="success" onClick={handleUpdate}>
                    Save
                  </Button>{' '}
                  <Button size="sm" variant="secondary" onClick={cancelEditing}>
                    Cancel
                  </Button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.role?.toLowerCase() === 'student' ? user.grade : '-'}</td>
                <td>{user.password ? '••••••••' : '-'}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => startEditing(user)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
