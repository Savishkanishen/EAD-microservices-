import React, { useEffect, useState } from 'react';
import {
  getAllStudentFees,
  getStudentFeesByStudentId,
  getStudentFeesByStatus,
  getStudentFeesByGradeAndStatus,
  getStudentFeesByAssignedDate,
  markStudentFeeAsPaid,
  deleteStudentFee
} from '../api/studentFeeApi';
import { Button, Table, Form, Row, Col, Alert } from 'react-bootstrap';

const StudentFeeList = () => {
  const [studentFees, setStudentFees] = useState([]);
  const [searchType, setSearchType] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [statusValue, setStatusValue] = useState('ALL');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadStudentFees();
  }, []);

  const loadStudentFees = async () => {
    try {
      const response = await getAllStudentFees();
      setStudentFees(response.data);
    } catch (error) {
      console.error('Error loading student fees:', error);
      setStudentFees([]);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchType === 'All') {
        await loadStudentFees();
      } else if (searchType === 'Student ID') {
        if (!searchValue.trim()) {
          alert('Please enter a Student ID.');
          return;
        }
        const res = await getStudentFeesByStudentId(searchValue.trim());
        setStudentFees(res.data);
      } else if (searchType === 'Status') {
        if (statusValue === 'ALL') {
          alert('Please select a status other than ALL.');
          return;
        }
        const res = await getStudentFeesByStatus(statusValue);
        setStudentFees(res.data);
      } else if (searchType === 'Grade') {
        if (!gradeValue.trim()) {
          alert('Please enter a grade.');
          return;
        }
      } else if (searchType === 'Grade & Status') {
        if (!gradeValue.trim()) {
          alert('Please enter a grade.');
          return;
        }
        if (statusValue === 'ALL') {
          alert('Please select a status other than ALL.');
          return;
        }
        const res = await getStudentFeesByGradeAndStatus(gradeValue.trim(), statusValue);
        setStudentFees(res.data);
      } else if (searchType === 'Assigned Date') {
        if (!searchValue.trim()) {
          alert('Please enter an assigned date.');
          return;
        }
        const res = await getStudentFeesByAssignedDate(searchValue.trim());
        setStudentFees(res.data);
      }
    } catch (error) {
      console.error('Error searching:', error);
      alert('No results found or invalid input!');
      setStudentFees([]);
    }
  };

  const handleReset = () => {
    setSearchValue('');
    setGradeValue('');
    setStatusValue('ALL');
    setMessage('');
    loadStudentFees();
  };

  const handleMarkPaid = async (id) => {
    try {
      await markStudentFeeAsPaid(id);
      setMessage('Marked as PAID successfully!');
      loadStudentFees();
    } catch (error) {
      console.error('Error marking as paid:', error);
      alert('Failed to mark fee as paid.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student fee?')) {
      try {
        await deleteStudentFee(id);
        setMessage('Student fee deleted successfully!');
        loadStudentFees();
      } catch (error) {
        console.error('Error deleting student fee:', error);
        alert('Failed to delete student fee.');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Student Fee List</h2>
      {message && <Alert variant="success" onClose={() => setMessage('')} dismissible>{message}</Alert>}

      {/* Search Section */}
      <Form className="mb-4">
        <Row className="align-items-center">
          <Col md="3">
            <Form.Select
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value);
                // reset inputs when search type changes
                setSearchValue('');
                setGradeValue('');
                setStatusValue('ALL');
                setMessage('');
              }}
            >
              <option value="All">All</option>
              <option value="Student ID">By Student ID</option>
              <option value="Status">By Status</option>
              <option value="Grade & Status">By Grade & Status</option>
              <option value="Assigned Date">By Assigned Date</option>
            </Form.Select>
          </Col>

          {/* Conditional inputs */}
          <Col md="5">
            {(searchType === 'Student ID' || searchType === 'Assigned Date') && (
              <Form.Control
                type={searchType === 'Assigned Date' ? 'date' : 'text'}
                placeholder={`Enter ${searchType}`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            )}

            {searchType === 'Status' && (
              <Form.Select
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="paid">Paid</option>
                <option value="due">Due</option>
              </Form.Select>
            )}

            {searchType === 'Grade & Status' && (
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Enter Grade"
                    value={gradeValue}
                    onChange={(e) => setGradeValue(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Select
                    value={statusValue}
                    onChange={(e) => setStatusValue(e.target.value)}
                  >
                    <option value="ALL">All</option>
                    <option value="paid">Paid</option>
                    <option value="due">Due</option>
                  </Form.Select>
                </Col>
              </Row>
            )}
          </Col>

          <Col md="2">
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
          <Col md="2">
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Student Fees Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Fee Name</th>
            <th>Amount (Rs)</th>
            <th>Status</th>
            <th>Assigned Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentFees.length > 0 ? (
            studentFees.map((fee) => (
              <tr key={fee.studentFeeId}>
                <td>{fee.studentFeeId}</td>
                <td>{fee.studentId}</td>
                <td>{fee.feeName}</td>
                <td>{fee.feeAmount}</td>
                <td>{fee.paymentStatus}</td>
                <td>{fee.assignedDate}</td>
                <td>
                  {fee.paymentStatus !== 'PAID' && (
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleMarkPaid(fee.studentFeeId)}
                    >
                      Mark Paid
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(fee.studentFeeId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No student fees found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentFeeList;
