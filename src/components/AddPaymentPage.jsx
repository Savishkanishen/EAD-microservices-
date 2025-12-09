import React, { useState, useEffect } from 'react';
import { getDueStudentFeesByStudentId } from '../api/studentFeeApi';
import { addPayment } from '../api/paymentsApi';
import { Form, Button, Table, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddPaymentPage = ({ onPaymentAdded }) => {
  const [studentId, setStudentId] = useState('');
  const [studentFees, setStudentFees] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [extraNote, setExtraNote] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const totalAmount = selectedFees
    .map(id => {
      const fee = studentFees.find(f => f.studentFeeId === id);
      return fee ? fee.feeAmount : 0;
    })
    .reduce((sum, val) => sum + val, 0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setPaymentDate(today);
  }, []);

  const handleFetchStudentFees = async () => {
    setMessage('');
    setError('');
    setStudentFees([]);
    setSelectedFees([]);

    if (!studentId.trim()) {
      setError('Please enter a Student ID.');
      return;
    }

    try {
      const res = await getDueStudentFeesByStudentId(studentId.trim());
      if (res.data.length === 0) {
        setError('No DUE fees found for this student.');
      } else {
        setError('');
      }
      setStudentFees(res.data);
    } catch (error) {
      setError('Error fetching due fees.');
      console.error(error);
    }
  };

  const handleCheckboxChange = (feeId) => {
    setSelectedFees(prev =>
      prev.includes(feeId)
        ? prev.filter(id => id !== feeId)
        : [...prev, feeId]
    );
  };

  const handleSubmitPayments = async () => {
    setMessage('');
    setError('');

    if (selectedFees.length === 0) {
      setError('Please select at least one fee to pay.');
      return;
    }

    if (!paymentDate || !paymentMethod) {
      setError('Please fill in all payment details.');
      return;
    }

    try {
      for (let feeId of selectedFees) {
        const fee = studentFees.find(f => f.studentFeeId === feeId);
        if (!fee) continue;

        await addPayment({
          studentFeeId: feeId,
          paidAmount: fee.feeAmount,
          paymentDate,
          paymentMethod,
          extraNote
        });
      }

      setMessage('Payments added successfully!');
      setSelectedFees([]);
      setStudentFees([]);
      setStudentId('');
      setExtraNote('');
      setPaymentMethod('Cash');
      const today = new Date().toISOString().split('T')[0];
      setPaymentDate(today);

      if (onPaymentAdded) {
        onPaymentAdded();
      }

      setTimeout(() => navigate('/payments'), 1500);
    } catch (err) {
      console.error(err);
      setError('Error adding payments.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Payments</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form className="mb-4">
        <Row className="align-items-end">
          <Col md={4}>
            <Form.Group controlId="studentId">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter Student ID"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button variant="primary" onClick={handleFetchStudentFees}>
              Load DUE Fees
            </Button>
          </Col>
        </Row>
      </Form>

      {studentFees.length > 0 && (
        <>
          <h5>Due Student Fees</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Select</th>
                <th>StudentFee ID</th>
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
                      checked={selectedFees.includes(fee.studentFeeId)}
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

          <h5>Payment Details</h5>
          <Form className="mb-4">
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="paidAmount">
                  <Form.Label>Amount (Rs)</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedFees.length > 0 ? totalAmount : ''}
                    placeholder="Auto-calculated"
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="paymentDate">
                  <Form.Label>Payment Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="paymentMethod">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                  >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="extraNote">
                  <Form.Label>Extra Note</Form.Label>
                  <Form.Control
                    type="text"
                    value={extraNote}
                    onChange={(e) => setExtraNote(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="success"
              onClick={handleSubmitPayments}
              disabled={selectedFees.length === 0}
            >
              Submit Payment(s)
            </Button>
          </Form>
        </>
      )}
    </div>
  );
};

export default AddPaymentPage;
