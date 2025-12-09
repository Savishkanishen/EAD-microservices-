import React, { useState } from 'react';
import { getStudentFeesByStudentId, markStudentFeeAsPaid } from '../api/studentFeeApi';
import { Button, Table, Form, Alert, Row, Col } from 'react-bootstrap';

const StudentFeePayment = () => {
  const [studentId, setStudentId] = useState('');
  const [studentFees, setStudentFees] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    if (!studentId.trim()) {
      alert('Please enter a Student ID');
      return;
    }
    try {
      const response = await getStudentFeesByStudentId(studentId);
      setStudentFees(response.data);
      setSelectedIds([]);
      setMessage('');
    } catch (error) {
      console.error('Error fetching student fees:', error);
      alert('No fees found or invalid Student ID!');
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleMarkSelectedPaid = async () => {
    if (selectedIds.length === 0) {
      alert('Please select at least one fee to mark as PAID.');
      return;
    }
    try {
      for (const id of selectedIds) {
        await markStudentFeeAsPaid(id);
      }
      setMessage('Selected fees marked as PAID successfully!');
      // Reload fees for the same student
      const response = await getStudentFeesByStudentId(studentId);
      setStudentFees(response.data);
      setSelectedIds([]);
    } catch (error) {
      console.error('Error marking fees as PAID:', error);
      alert('Failed to mark fees as PAID.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Pay Student Fees</h2>

      {message && <Alert variant="success">{message}</Alert>}

      <Form className="mb-4">
        <Row className="align-items-center">
          <Col md="8">
            <Form.Control
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </Col>
          <Col md="4">
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {studentFees.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Select</th>
                <th>Student Fee ID</th>
                <th>Fee Name</th>
                <th>Amount (Rs)</th>
                <th>Status</th>
                <th>Assigned Date</th>
              </tr>
            </thead>
            <tbody>
              {studentFees.map((fee) => (
                <tr key={fee.studentFeeId}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      disabled={fee.paymentStatus === 'PAID'}
                      checked={selectedIds.includes(fee.studentFeeId)}
                      onChange={() => handleCheckboxChange(fee.studentFeeId)}
                    />
                  </td>
                  <td>{fee.studentFeeId}</td>
                  <td>{fee.feeName}</td>
                  <td>{fee.feeAmount}</td>
                  <td>{fee.paymentStatus}</td>
                  <td>{fee.assignedDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button
            variant="success"
            onClick={handleMarkSelectedPaid}
            disabled={selectedIds.length === 0}
          >
            Mark Selected as PAID
          </Button>
        </>
      )}
    </div>
  );
};

export default StudentFeePayment;
