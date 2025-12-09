import React, { useState } from 'react';
import { getStudentsByGrade } from '../api/userApi';
import { Form, Button, Alert, ListGroup } from 'react-bootstrap';

const StudentsByGradePage = () => {
  const [grade, setGrade] = useState('');
  const [studentIds, setStudentIds] = useState([]);
  const [message, setMessage] = useState('');

  const handleFetch = async () => {
    setMessage('');
    setStudentIds([]);

    if (!grade.trim()) {
      setMessage('Please enter a grade.');
      return;
    }

    try {
      const res = await getStudentsByGrade(grade.trim());
      if (res.data.length === 0) {
        setMessage('No students found in this grade.');
      } else {
        setStudentIds(res.data);
      }
    } catch (err) {
      console.error(err);
      setMessage('Error fetching students.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Find Students by Grade</h2>

      {message && <Alert variant="info">{message}</Alert>}

      <Form className="mb-4">
        <Form.Group>
          <Form.Label>Grade</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" className="mt-2" onClick={handleFetch}>
          Find Students
        </Button>
      </Form>

      {studentIds.length > 0 && (
        <>
          <h5>Student IDs in Grade {grade}:</h5>
          <ListGroup>
            {studentIds.map((id) => (
              <ListGroup.Item key={id}>{id}</ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default StudentsByGradePage;
